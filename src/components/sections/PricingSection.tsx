import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sheetServices = [
  { name: "Sheet giai điệu / chép lại", seami: "Từ 100.000đ – 48h", guest: "150.000đ – 48h" },
  { name: "+ Điền hợp âm", seami: "+50.000đ", guest: "+50.000đ" },
  { name: "Sheet piano / Tab guitar", seami: "Từ 300.000đ – 72h", guest: "Từ 400.000đ – 72h" },
  { name: "Phổ giản lược", seami: "Từ 400.000đ – 72h", guest: "Từ 600.000đ – 72h" },
  { name: "Tổng phổ nhạc nhẹ (4 nhạc cụ)", seami: "Từ 2.000.000đ – thương lượng", guest: "Từ 2.500.000đ – thương lượng" },
  { name: "Phổ hợp xướng SATB (4 voice)", seami: "Từ 1.500.000đ – 72h", guest: "Từ 2.000.000đ – 72h" },
];

const trackServices = [
  { name: "Track 1–2 line", seami: "Từ 500.000đ – 72h", guest: "Từ 800.000đ – 72h" },
  { name: "Track full band (4 nhạc cụ)", seami: "Từ 2.000.000đ – thương lượng", guest: "Từ 2.500.000đ – thương lượng" },
  { name: "Raw multitrack (4 nhạc cụ)", seami: "Từ 2.000.000đ – thương lượng", guest: "Từ 2.500.000đ – thương lượng" },
];

const quickServices = [
  { name: "Tách vocal", seami: "50.000đ – 24h", guest: "Không phục vụ" },
  { name: "Video guide melody", seami: "80.000đ – 24h", guest: "100.000đ – 24h" },
];

const PriceTable = ({ data }: { data: { name: string; seami: string; guest: string }[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-border">
          <th className="py-3 pr-4 text-muted-foreground font-body font-medium text-sm">Dịch vụ</th>
          <th className="py-3 px-4 text-primary font-body font-medium text-sm">GV/HV SEAMI</th>
          <th className="py-3 pl-4 text-muted-foreground font-body font-medium text-sm">Khách vãng lai</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name} className="border-b border-border/50">
            <td className="py-4 pr-4 font-body text-sm">{row.name}</td>
            <td className="py-4 px-4 font-body text-sm text-primary font-medium">{row.seami}</td>
            <td className="py-4 pl-4 font-body text-sm text-muted-foreground">{row.guest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PricingSection = () => {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Dịch vụ & Bảng Giá
        </h2>
        <p className="text-muted-foreground text-center mb-16 font-body">
          Giá niêm yết — tính theo bài, chưa bao gồm yêu cầu đặc biệt
        </p>

        <Accordion type="multiple" defaultValue={["sheet", "track", "quick"]} className="space-y-4">
          <AccordionItem value="sheet" className="border border-border rounded-xl px-6 bg-card">
            <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
              Sheet & Phổ
            </AccordionTrigger>
            <AccordionContent>
              <PriceTable data={sheetServices} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="track" className="border border-border rounded-xl px-6 bg-card">
            <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
              Track & Multitrack
            </AccordionTrigger>
            <AccordionContent>
              <PriceTable data={trackServices} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quick" className="border border-border rounded-xl px-6 bg-card">
            <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
              Hỗ trợ nhanh
            </AccordionTrigger>
            <AccordionContent>
              <PriceTable data={quickServices} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default PricingSection;
