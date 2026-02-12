import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Restrict CORS to known domains
const ALLOWED_ORIGINS = [
  "https://seami-music-craft.lovable.app",
  "https://id-preview--6139bc42-0808-415d-bd4e-ad67fd9018f3.lovable.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

// Simple in-memory rate limiter (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Input sanitization
function sanitize(str: string | undefined | null, maxLen = 500): string {
  if (!str) return "";
  return str.trim().slice(0, maxLen).replace(/<[^>]*>/g, "");
}

const VALID_SERVICES = [
  "Sheet giai điệu / chép lại", "Điền hợp âm", "Sheet piano / Tab guitar",
  "Phổ giản lược", "Tổng phổ nhạc nhẹ", "Phổ hợp xướng SATB",
  "Track 1–2 line", "Track full band", "Raw multitrack", "Tách vocal", "Video guide melody",
];

const VALID_PURPOSES = ["Dạy học", "Tập band", "Biểu diễn", "Demo"];

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const CLICKUP_API_KEY = Deno.env.get("CLICKUP_API_KEY");
    if (!CLICKUP_API_KEY) throw new Error("CLICKUP_API_KEY is not configured");

    const CLICKUP_LIST_ID = Deno.env.get("CLICKUP_LIST_ID");
    if (!CLICKUP_LIST_ID) throw new Error("CLICKUP_LIST_ID is not configured");

    const body = await req.json();
    const { name, phone, customerType, services, purposes, deadline, note, estimatedTotal, hasNegotiableItems, _hp, _ts } = body;

    // Honeypot check — if filled, it's a bot
    if (_hp) {
      // Silently succeed to not alert bots
      return new Response(
        JSON.stringify({ success: true, taskId: "ok" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Timestamp validation — reject if form submitted too quickly (<3s) or too old (>30min)
    if (_ts) {
      const elapsed = Date.now() - Number(_ts);
      if (elapsed < 3000 || elapsed > 30 * 60 * 1000) {
        return new Response(
          JSON.stringify({ success: true, taskId: "ok" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Sanitize & validate inputs
    const cleanName = sanitize(name, 100);
    const cleanPhone = sanitize(phone, 15);

    if (!cleanName || !cleanPhone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone format (Vietnamese phone)
    if (!/^[0-9\s\-+()]{8,15}$/.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(services) || services.length === 0 || services.length > VALID_SERVICES.length) {
      return new Response(
        JSON.stringify({ error: "Invalid services" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Only allow known services
    const validServices = services.filter((s: string) => VALID_SERVICES.includes(s));
    if (validServices.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid services selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validPurposes = Array.isArray(purposes)
      ? purposes.filter((p: string) => VALID_PURPOSES.includes(p))
      : [];

    const validCustomerType = customerType === "seami" || customerType === "guest" ? customerType : "guest";
    const customerLabel = validCustomerType === "seami" ? "GV/HV SEAMI" : "Khách vãng lai";

    const cleanDeadline = sanitize(deadline, 100);
    const cleanNote = sanitize(note, 1000);

    const formattedTotal = estimatedTotal && typeof estimatedTotal === "number" && estimatedTotal > 0
      ? new Intl.NumberFormat("vi-VN").format(estimatedTotal) + "đ"
      : "Chưa có";

    const description = [
      `**Họ tên:** ${cleanName}`,
      `**SĐT:** ${cleanPhone}`,
      `**Nhóm KH:** ${customerLabel}`,
      `**Dịch vụ:** ${validServices.join(", ")}`,
      `**Báo giá tạm tính:** ${formattedTotal}${hasNegotiableItems ? " (có hạng mục thương lượng)" : ""}`,
      validPurposes.length ? `**Mục đích:** ${validPurposes.join(", ")}` : null,
      cleanDeadline ? `**Deadline:** ${cleanDeadline}` : null,
      cleanNote ? `**Ghi chú:** ${cleanNote}` : null,
    ].filter(Boolean).join("\n");

    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `[Lead] ${cleanName} – ${customerLabel}`,
          description,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ClickUp API error:", JSON.stringify(data));
      throw new Error(`ClickUp API failed [${response.status}]`);
    }

    return new Response(
      JSON.stringify({ success: true, taskId: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
