import { Badge } from "@/components/ui/badge";

const audiences = [
  {
    title: "GV / HV / Cựu HV SEAMI",
    description: "Được hưởng giá ưu đãi nội bộ cho tất cả dịch vụ.",
    badge: "Ưu đãi nội bộ",
  },
  {
    title: "Band / Người chơi nghiêm túc",
    description: "Cần phổ rõ ràng, track chất lượng để tập luyện và biểu diễn.",
    badge: null,
  },
  {
    title: "Người làm nhạc bán chuyên / chuyên",
    description: "Cần tài liệu chuẩn nghề để dạy, demo, hoặc sản xuất.",
    badge: null,
  },
];

const AudienceSection = () => {
  return (
    <section className="px-6 py-24 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Ai nên dùng dịch vụ này?
        </h2>
        <p className="text-muted-foreground text-center mb-16 font-body">
          Dịch vụ phù hợp với những ai nghiêm túc trong âm nhạc
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-xl p-8 text-center relative"
            >
              {item.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-body text-xs px-3 py-1">
                  {item.badge}
                </Badge>
              )}
              <h3 className="text-xl font-display font-bold mb-3 mt-2">{item.title}</h3>
              <p className="text-muted-foreground font-body font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
