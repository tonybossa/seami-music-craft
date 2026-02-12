import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  "Sheet giai điệu / chép lại",
  "Điền hợp âm",
  "Sheet piano / Tab guitar",
  "Phổ giản lược",
  "Tổng phổ nhạc nhẹ",
  "Phổ hợp xướng SATB",
  "Track 1–2 line",
  "Track full band",
  "Raw multitrack",
  "Tách vocal",
  "Video guide melody",
];

const purposeOptions = ["Dạy học", "Tập band", "Biểu diễn", "Demo"];

type PriceInfo = {
  seami: number | null;
  guest: number | null;
  negotiable: boolean;
};

const pricingMap: Record<string, PriceInfo> = {
  "Sheet giai điệu / chép lại": { seami: 100000, guest: 150000, negotiable: false },
  "Điền hợp âm": { seami: 50000, guest: 50000, negotiable: false },
  "Sheet piano / Tab guitar": { seami: 300000, guest: 400000, negotiable: false },
  "Phổ giản lược": { seami: 400000, guest: 600000, negotiable: false },
  "Tổng phổ nhạc nhẹ": { seami: 2000000, guest: 2500000, negotiable: true },
  "Phổ hợp xướng SATB": { seami: 1500000, guest: 2000000, negotiable: false },
  "Track 1–2 line": { seami: 500000, guest: 800000, negotiable: false },
  "Track full band": { seami: 2000000, guest: 2500000, negotiable: true },
  "Raw multitrack": { seami: 2000000, guest: 2500000, negotiable: true },
  "Tách vocal": { seami: 50000, guest: null, negotiable: false },
  "Video guide melody": { seami: 80000, guest: 100000, negotiable: false },
};

const formatVND = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + "đ";

const FormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [formLoadedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    customerType: "seami",
    services: [] as string[],
    purposes: [] as string[],
    deadline: "",
    note: "",
  });

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const updateServices = (services: string[]) => {
    setForm({ ...form, services });
    setConfirmed(false);
  };

  const updateCustomerType = (customerType: string) => {
    setForm({ ...form, customerType });
    setConfirmed(false);
  };

  const priceBreakdown = useMemo(() => {
    const type = form.customerType as "seami" | "guest";
    const items: { name: string; price: number | null; negotiable: boolean; notServed: boolean }[] = [];
    let total = 0;
    let hasNegotiable = false;
    let hasNotServed = false;

    for (const s of form.services) {
      const info = pricingMap[s];
      if (!info) continue;
      const price = info[type];
      const notServed = price === null;
      if (notServed) hasNotServed = true;
      if (info.negotiable) hasNegotiable = true;
      if (price !== null && !info.negotiable) total += price;
      items.push({ name: s, price, negotiable: info.negotiable, notServed });
    }

    return { items, total, hasNegotiable, hasNotServed };
  }, [form.services, form.customerType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Vui lòng điền họ tên và số điện thoại", variant: "destructive" });
      return;
    }
    if (form.services.length === 0) {
      toast({ title: "Vui lòng chọn ít nhất một dịch vụ", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-clickup-task", {
        body: {
          ...form,
          estimatedTotal: priceBreakdown.total,
          hasNegotiableItems: priceBreakdown.hasNegotiable,
          _hp: honeypot,
          _ts: formLoadedAt,
        },
      });
      if (error) throw error;
      toast({ title: "Đã gửi yêu cầu thành công!", description: "SEAMI sẽ liên hệ bạn sớm nhất." });
      setForm({ name: "", phone: "", customerType: "seami", services: [], purposes: [], deadline: "", note: "" });
      setConfirmed(false);
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: "Gửi yêu cầu thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="px-6 py-24 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Gửi yêu cầu
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-body">
          Điền thông tin bên dưới — SEAMI sẽ tư vấn và báo giá chi tiết
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot - hidden from real users */}
          <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {/* Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body text-sm">Họ tên *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="bg-card border-border font-body"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm">Số điện thoại *</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0901 234 567"
                className="bg-card border-border font-body"
                maxLength={15}
              />
            </div>
          </div>

          {/* Customer type */}
          <div className="space-y-3">
            <Label className="font-body text-sm">Nhóm khách hàng</Label>
            <div className="flex gap-4">
              {[
                { value: "seami", label: "GV / HV SEAMI" },
                { value: "guest", label: "Khách vãng lai" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateCustomerType(opt.value)}
                  className={`px-5 py-2.5 rounded-lg border font-body text-sm transition-colors ${
                    form.customerType === opt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services multi-select */}
          <div className="space-y-3">
            <Label className="font-body text-sm">Dịch vụ cần *</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {serviceOptions.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={form.services.includes(s)}
                    onCheckedChange={() => updateServices(toggleItem(form.services, s))}
                  />
                  <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          {form.services.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="font-display font-semibold text-base">Báo giá tạm tính</h3>
              <div className="space-y-2">
                {priceBreakdown.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center font-body text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">
                      {item.notServed ? (
                        <span className="text-destructive">Không phục vụ</span>
                      ) : item.negotiable ? (
                        <span className="text-muted-foreground italic">từ {formatVND(item.price!)} ↑ thương lượng</span>
                      ) : (
                        <span>từ {formatVND(item.price!)}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="font-body font-semibold">Tổng tạm tính</span>
                <span className="font-display text-xl font-bold text-primary">
                  {priceBreakdown.total > 0 ? formatVND(priceBreakdown.total) : "—"}
                  {priceBreakdown.hasNegotiable && " +"}
                </span>
              </div>
              {priceBreakdown.hasNotServed && (
                <p className="text-xs text-destructive font-body">
                  ⚠ Một số dịch vụ không phục vụ cho nhóm khách hàng này
                </p>
              )}
              <p className="text-xs text-muted-foreground font-body italic">
                * Giá tối thiểu, có thể thay đổi tùy độ khó bài
              </p>

              {/* Confirmation checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <Checkbox
                  checked={confirmed}
                  onCheckedChange={(v) => setConfirmed(v === true)}
                  className="mt-0.5"
                />
                <span className="font-body text-sm text-foreground">
                  Tôi đã xem và đồng ý với báo giá tạm tính này
                </span>
              </label>
            </div>
          )}

          {/* Purpose */}
          <div className="space-y-3">
            <Label className="font-body text-sm">Mục đích sử dụng</Label>
            <div className="flex flex-wrap gap-3">
              {purposeOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm({ ...form, purposes: toggleItem(form.purposes, p) })}
                  className={`px-4 py-2 rounded-lg border font-body text-sm transition-colors ${
                    form.purposes.includes(p)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label className="font-body text-sm">Deadline mong muốn</Label>
            <Input
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              placeholder="VD: Trong 3 ngày, trước 15/3..."
              className="bg-card border-border font-body"
              maxLength={100}
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label className="font-body text-sm">Ghi chú thêm</Label>
            <Textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Tên bài, tone, yêu cầu đặc biệt..."
              className="bg-card border-border font-body min-h-[100px]"
              maxLength={1000}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || (form.services.length > 0 && !confirmed)}
            className="w-full py-6 text-base font-body font-semibold bg-primary text-primary-foreground hover:opacity-90"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu – Nhận tư vấn từ SEAMI"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;
