

## Tối ưu SEO & AEO cho SEAMI Landing Page

### Hiện trạng
- `index.html`: meta tags vẫn còn mặc định ("Lovable App"), thiếu structured data, thiếu canonical, thiếu hreflang
- Không có `sitemap.xml`
- `robots.txt` chưa trỏ sitemap
- Không có JSON-LD structured data (quan trọng cho AEO — giúp AI search engines hiểu nội dung)
- Các section thiếu semantic HTML tags (`article`, `nav`, `header`, `footer` semantic)
- Thiếu FAQ schema cho phần pricing/policies (giúp hiển thị rich snippets & AI trả lời)

### Kế hoạch thực hiện

**1. Cập nhật `index.html` — Meta tags đầy đủ**
- Title: "SEAMI | Hỗ trợ Sheet & Track theo Chuẩn Nghề"
- Description: mô tả dịch vụ bằng tiếng Việt, ~155 ký tự
- `lang="vi"` thay vì `"en"`
- Canonical URL trỏ về `https://seami-music-craft.lovable.app`
- Open Graph & Twitter cards cập nhật đúng brand
- Thêm `<link rel="sitemap">` 

**2. Tạo `public/sitemap.xml`**
- Liệt kê URL chính (`/`) với `lastmod`, `priority`

**3. Cập nhật `public/robots.txt`**
- Thêm dòng `Sitemap: https://seami-music-craft.lovable.app/sitemap.xml`
- Thêm AI crawlers: `GPTBot`, `Google-Extended`, `ChatGPT-User`, `Bytespider`, `PerplexityBot`

**4. Thêm JSON-LD Structured Data (trọng tâm AEO)**
Tạo component `SEOStructuredData.tsx` inject vào `<head>` qua `react-helmet-async`:
- **LocalBusiness** schema: tên, mô tả, dịch vụ, khu vực phục vụ
- **Service** schema: liệt kê từng dịch vụ với giá (dùng `Offer`)
- **FAQPage** schema: chuyển phần "Ai nên dùng?" và policies thành FAQ format — giúp AI engines trích xuất câu trả lời trực tiếp
- **BreadcrumbList** schema

**5. Cải thiện semantic HTML trong các section**
- `HeroSection`: wrap trong `<header>`
- `FooterSection`: đã dùng `<footer>` ✓
- Thêm `aria-label` cho các section chính
- Đảm bảo heading hierarchy đúng (h1 → h2 → h3)
- Thêm `alt` text mô tả chi tiết hơn cho images

**6. Thêm FAQ Section mới**
- Section FAQ riêng với các câu hỏi thường gặp (giá, quy trình, deadline)
- Dùng `<details>`/`<summary>` hoặc Accordion có semantic đúng
- Đồng bộ với FAQPage JSON-LD schema

### Cài đặt thêm
- Package: `react-helmet-async` để quản lý `<head>` tags từ React

### Chi tiết kỹ thuật
- JSON-LD được inject qua `<script type="application/ld+json">` trong `<Helmet>`
- FAQPage schema giúp Google hiển thị rich snippets và AI search (Gemini, ChatGPT, Perplexity) trích xuất câu trả lời
- Service + Offer schema giúp hiển thị giá trong search results
- Tất cả structured data validate được qua Google Rich Results Test

