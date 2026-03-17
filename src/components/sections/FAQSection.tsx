import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "SEAMI cung cấp những dịch vụ gì?",
    answer:
      "SEAMI cung cấp 3 nhóm dịch vụ: (1) Sheet & Phổ — chép sheet giai điệu, sheet piano/tab guitar, phổ giản lược, tổng phổ nhạc nhẹ, phổ hợp xướng SATB; (2) Track & Multitrack — track 1–2 line, track full band, raw multitrack; (3) Hỗ trợ nhanh — tách vocal, video guide melody.",
  },
  {
    question: "Giá dịch vụ sheet nhạc của SEAMI là bao nhiêu?",
    answer:
      "Giá sheet giai điệu từ 100.000đ (GV/HV SEAMI) hoặc 150.000đ (khách vãng lai). Sheet piano/tab guitar từ 300.000đ–400.000đ. Phổ giản lược từ 400.000đ–600.000đ. Tổng phổ nhạc nhẹ từ 2.000.000đ. Phổ hợp xướng SATB từ 1.500.000đ–2.000.000đ.",
  },
  {
    question: "Thời gian hoàn thành đơn hàng là bao lâu?",
    answer:
      "Deadline cam kết rõ ràng: sheet giai điệu 48h, sheet piano/phổ giản lược 72h, tổng phổ và track full band theo thỏa thuận. Tách vocal và video guide melody hoàn thành trong 24h.",
  },
  {
    question: "Ai nên dùng dịch vụ của SEAMI?",
    answer:
      "Dịch vụ phù hợp cho giáo viên/học viên SEAMI (giá ưu đãi), band/người chơi nghiêm túc cần phổ và track chất lượng, và người làm nhạc bán chuyên/chuyên cần tài liệu chuẩn nghề.",
  },
  {
    question: "SEAMI có chính sách giảm giá không?",
    answer:
      "Có. Giảm 10–20% vào mùa thấp điểm (tự động, không cần mã) và giảm 10% cho đơn từ 3 bài trở lên gửi cùng lúc.",
  },
  {
    question: "Làm sao để gửi yêu cầu đặt dịch vụ?",
    answer:
      "Điền form trên website với họ tên, số điện thoại, chọn dịch vụ cần, mục đích sử dụng và deadline mong muốn. SEAMI sẽ liên hệ tư vấn và báo giá chi tiết.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" aria-label="Câu hỏi thường gặp" className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Câu hỏi thường gặp
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-body">
          Những thắc mắc phổ biến về dịch vụ SEAMI
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-border rounded-xl px-6 bg-card"
            >
              <AccordionTrigger className="text-left font-body font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
