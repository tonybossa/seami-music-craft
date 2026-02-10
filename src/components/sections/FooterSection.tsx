const FooterSection = () => {
  return (
    <footer className="px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-2xl md:text-3xl font-display italic text-foreground/80 leading-relaxed">
          "Không phải ai cũng cần.
          <br />
          Chỉ dành cho người làm nhạc <span className="text-primary font-bold not-italic">nghiêm túc.</span>"
        </p>
        <div className="pt-8 border-t border-border mt-12">
          <p className="text-muted-foreground font-body text-sm">
            © {new Date().getFullYear()} SEAMI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
