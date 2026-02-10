import { BookOpen, Users, Mic } from "lucide-react";

const useCases = [
  {
    icon: BookOpen,
    title: "Dạy học",
    description: "Sheet & track đủ rõ ràng, chính xác để đứng lớp — không cần chỉnh sửa thêm.",
  },
  {
    icon: Users,
    title: "Tập band",
    description: "Phổ & track giúp band vào là tập — mỗi thành viên biết phần mình ngay.",
  },
  {
    icon: Mic,
    title: "Biểu diễn / Demo",
    description: "Tài liệu đủ chuẩn để diễn live hoặc ghi demo chuyên nghiệp.",
  },
];

const UseCasesSection = () => {
  return (
    <section className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Dịch vụ này dùng để làm gì?
        </h2>
        <p className="text-muted-foreground text-center mb-16 font-body">
          Ba nhu cầu phổ biến nhất mà SEAMI hỗ trợ
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
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

export default UseCasesSection;
