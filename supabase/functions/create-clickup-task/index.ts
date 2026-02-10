import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const CLICKUP_API_KEY = Deno.env.get("CLICKUP_API_KEY");
    if (!CLICKUP_API_KEY) {
      throw new Error("CLICKUP_API_KEY is not configured");
    }

    const CLICKUP_LIST_ID = Deno.env.get("CLICKUP_LIST_ID");
    if (!CLICKUP_LIST_ID) {
      throw new Error("CLICKUP_LIST_ID is not configured");
    }

    const body = await req.json();
    const { name, phone, customerType, services, purposes, deadline, note } = body;

    if (!name || !phone || !services || services.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const customerLabel = customerType === "seami" ? "GV/HV SEAMI" : "Khách vãng lai";
    
    const description = [
      `**Họ tên:** ${name}`,
      `**SĐT:** ${phone}`,
      `**Nhóm KH:** ${customerLabel}`,
      `**Dịch vụ:** ${services.join(", ")}`,
      purposes?.length ? `**Mục đích:** ${purposes.join(", ")}` : null,
      deadline ? `**Deadline:** ${deadline}` : null,
      note ? `**Ghi chú:** ${note}` : null,
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
          name: `[Lead] ${name} – ${customerLabel}`,
          description,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ClickUp API error:", JSON.stringify(data));
      throw new Error(`ClickUp API failed [${response.status}]: ${JSON.stringify(data)}`);
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
