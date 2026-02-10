import { Music, Users, Mic } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase">
          SEAMI Music Production Support
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
          Hỗ trợ Sheet & Track
          <br />
          <span className="text-primary">theo Chuẩn Nghề</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body font-light leading-relaxed">
          Dành cho người làm nhạc cần tài liệu dùng được ngay cho dạy học, tập band và biểu diễn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => scrollTo("form")}
            className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:opacity-90 transition-opacity text-base"
          >
            Gửi yêu cầu – Nhận tư vấn
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="px-8 py-4 border border-border text-foreground font-body font-medium rounded-lg hover:bg-secondary transition-colors text-base"
          >
            Xem dịch vụ & giá
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
