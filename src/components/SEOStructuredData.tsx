import { Helmet } from "react-helmet-async";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://seami-music-craft.lovable.app/#business",
      "name": "SEAMI Music Production Support",
      "description": "Dịch vụ chép sheet, soạn phổ và sản xuất track chuyên nghiệp cho dạy học, tập band và biểu diễn. Thuộc hệ thống SEAMI - SEA Music Institute.",
      "url": "https://seami-music-craft.lovable.app",
      "areaServed": {
        "@type": "Country",
        "name": "Vietnam"
      },
      "knowsLanguage": "vi",
      "priceRange": "100.000đ – 2.500.000đ+",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dịch vụ Sheet & Track",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Sheet & Phổ",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Sheet giai điệu / chép lại" },
                "priceCurrency": "VND",
                "price": "100000",
                "priceSpecification": { "@type": "UnitPriceSpecification", "price": "100000", "priceCurrency": "VND", "unitText": "bài" }
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Sheet piano / Tab guitar" },
                "priceCurrency": "VND",
                "price": "300000"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Phổ giản lược" },
                "priceCurrency": "VND",
                "price": "400000"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Tổng phổ nhạc nhẹ (4 nhạc cụ)" },
                "priceCurrency": "VND",
                "price": "2000000"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Phổ hợp xướng SATB (4 voice)" },
                "priceCurrency": "VND",
                "price": "1500000"
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Track & Multitrack",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Track 1–2 line" },
                "priceCurrency": "VND",
                "price": "500000"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Track full band (4 nhạc cụ)" },
                "priceCurrency": "VND",
                "price": "2000000"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Raw multitrack (4 nhạc cụ)" },
                "priceCurrency": "VND",
                "price": "2000000"
              }
            ]
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://seami-music-craft.lovable.app/#website",
      "url": "https://seami-music-craft.lovable.app",
      "name": "SEAMI Music Production Support",
      "description": "Hỗ trợ Sheet & Track theo Chuẩn Nghề",
      "inLanguage": "vi"
    },
    {
      "@type": "WebPage",
      "@id": "https://seami-music-craft.lovable.app/#webpage",
      "url": "https://seami-music-craft.lovable.app",
      "name": "SEAMI | Hỗ trợ Sheet & Track theo Chuẩn Nghề",
      "isPartOf": { "@id": "https://seami-music-craft.lovable.app/#website" },
      "about": { "@id": "https://seami-music-craft.lovable.app/#business" },
      "description": "Dịch vụ chép sheet, soạn phổ và sản xuất track chuyên nghiệp cho dạy học, tập band và biểu diễn.",
      "inLanguage": "vi"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://seami-music-craft.lovable.app/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "SEAMI cung cấp những dịch vụ gì?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEAMI cung cấp 3 nhóm dịch vụ: (1) Sheet & Phổ — chép sheet giai điệu, sheet piano/tab guitar, phổ giản lược, tổng phổ nhạc nhẹ, phổ hợp xướng SATB; (2) Track & Multitrack — track 1–2 line, track full band, raw multitrack; (3) Hỗ trợ nhanh — tách vocal, video guide melody."
          }
        },
        {
          "@type": "Question",
          "name": "Giá dịch vụ sheet nhạc của SEAMI là bao nhiêu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Giá sheet giai điệu từ 100.000đ (GV/HV SEAMI) hoặc 150.000đ (khách vãng lai). Sheet piano/tab guitar từ 300.000đ–400.000đ. Phổ giản lược từ 400.000đ–600.000đ. Tổng phổ nhạc nhẹ từ 2.000.000đ. Phổ hợp xướng SATB từ 1.500.000đ–2.000.000đ. Giá tính theo bài, chưa bao gồm yêu cầu đặc biệt."
          }
        },
        {
          "@type": "Question",
          "name": "Thời gian hoàn thành đơn hàng là bao lâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Deadline cam kết rõ ràng: sheet giai điệu 48h, sheet piano/phổ giản lược 72h, tổng phổ và track full band theo thỏa thuận. Tách vocal và video guide melody hoàn thành trong 24h."
          }
        },
        {
          "@type": "Question",
          "name": "Ai nên dùng dịch vụ của SEAMI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dịch vụ phù hợp cho: (1) Giáo viên/học viên/cựu HV SEAMI — được giá ưu đãi nội bộ; (2) Band/người chơi nghiêm túc — cần phổ rõ ràng, track chất lượng để tập luyện và biểu diễn; (3) Người làm nhạc bán chuyên/chuyên — cần tài liệu chuẩn nghề để dạy, demo, hoặc sản xuất."
          }
        },
        {
          "@type": "Question",
          "name": "SEAMI có chính sách giảm giá không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có. SEAMI giảm 10–20% vào mùa thấp điểm (tự động, không cần mã giảm giá) và giảm 10% cho đơn từ 3 bài trở lên gửi cùng lúc."
          }
        },
        {
          "@type": "Question",
          "name": "Dịch vụ này dùng để làm gì?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEAMI hỗ trợ 3 nhu cầu chính: (1) Dạy học — sheet & track đủ rõ ràng, chính xác để đứng lớp; (2) Tập band — phổ & track giúp band vào là tập, mỗi thành viên biết phần mình; (3) Biểu diễn/Demo — tài liệu đủ chuẩn để diễn live hoặc ghi demo chuyên nghiệp."
          }
        },
        {
          "@type": "Question",
          "name": "Làm sao để gửi yêu cầu đặt dịch vụ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bạn điền form trên website với họ tên, số điện thoại, chọn dịch vụ cần, mục đích sử dụng và deadline mong muốn. SEAMI sẽ liên hệ tư vấn và báo giá chi tiết."
          }
        }
      ]
    }
  ]
};

const SEOStructuredData = () => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOStructuredData;
