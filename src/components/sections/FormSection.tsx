import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

const FormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    // TODO: integrate ClickUp edge function
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Đã gửi yêu cầu thành công!", description: "SEAMI sẽ liên hệ bạn sớm nhất." });
    setForm({ name: "", phone: "", customerType: "seami", services: [], purposes: [], deadline: "", note: "" });
    setIsSubmitting(false);
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
                  onClick={() => setForm({ ...form, customerType: opt.value })}
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
                    onCheckedChange={() =>
                      setForm({ ...form, services: toggleItem(form.services, s) })
                    }
                  />
                  <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>

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
            disabled={isSubmitting}
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
