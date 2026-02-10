import { Check } from "lucide-react";

const points = [
  "Đúng ngữ cảnh sử dụng — dạy học, tập band, hay biểu diễn",
  "Vai trò từng nhạc cụ rõ ràng, không chung chung",
  "File giao dùng được ngay — không cần chỉnh sửa thêm",
  "Quy trình chuyên nghiệp, deadline cam kết",
];

const WhyUsSection = () => {
  return (
    <section className="px-6 py-24 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
          Chuẩn mực SEAMI
        </h2>

        <div className="space-y-5 mb-16">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="font-body text-lg font-light">{point}</p>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-primary pl-8 py-4">
          <p className="text-2xl md:text-3xl font-display italic text-foreground/90 leading-relaxed">
            "SEAMI không bán sheet hay track.
            <br />
            SEAMI bán <span className="text-primary font-bold not-italic">chuẩn làm nhạc.</span>"
          </p>
        </blockquote>
      </div>
    </section>
  );
};

export default WhyUsSection;
