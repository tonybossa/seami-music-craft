import usecaseTeaching from "@/assets/usecase-teaching.jpg";
import usecaseBand from "@/assets/usecase-band.jpg";
import usecasePerform from "@/assets/usecase-perform.jpg";

const useCases = [
  {
    image: usecaseTeaching,
    title: "Dạy học",
    description: "Sheet & track đủ rõ ràng, chính xác để đứng lớp — không cần chỉnh sửa thêm.",
  },
  {
    image: usecaseBand,
    title: "Tập band",
    description: "Phổ & track giúp band vào là tập — mỗi thành viên biết phần mình ngay.",
  },
  {
    image: usecasePerform,
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
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
