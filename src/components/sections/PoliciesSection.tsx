import { Percent, Package, Clock } from "lucide-react";

const policies = [
  {
    icon: Percent,
    title: "Giảm 10–20% mùa thấp điểm",
    description: "Ưu đãi tự động trong các tháng thấp điểm — không cần mã giảm giá.",
  },
  {
    icon: Package,
    title: "Giảm 10% cho đơn từ 3 bài",
    description: "Gửi nhiều bài cùng lúc để nhận chiết khấu ngay.",
  },
  {
    icon: Clock,
    title: "Deadline cam kết rõ ràng",
    description: "24h / 48h / 72h / thỏa thuận — tùy độ phức tạp của dịch vụ.",
  },
];

const PoliciesSection = () => {
  return (
    <section className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Ưu đãi & Chính sách
        </h2>
        <p className="text-muted-foreground text-center mb-16 font-body">
          Minh bạch về giá, rõ ràng về thời gian
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {policies.map((item) => (
            <div key={item.title} className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold">{item.title}</h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoliciesSection;
