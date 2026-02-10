

# SEAMI Music Production Support – Landing Page

## Tổng quan
Landing page thu lead cho dịch vụ Sheet & Track của SEAMI. Phong cách **tối giản, sang trọng** — nền tối, typography mạnh, whitespace rộng. Form submit sẽ tạo task trên ClickUp.

## Thiết kế
- **Màu sắc**: Nền đen/xám đậm, text trắng, accent gold/warm — truyền tải "chuẩn nghề"
- **Typography**: Headline lớn, bold, spacing rộng rãi
- **Layout**: Single-page scroll, responsive mobile/desktop
- **Hiệu ứng**: Subtle fade-in khi scroll, không lòe loẹt

---

## Cấu trúc trang (8 sections)

### 1. Hero – Above the Fold
- **Headline**: "Hỗ trợ Sheet & Track theo Chuẩn Nghề – Chuẩn SEAMI"
- **Sub-headline**: "Dành cho người làm nhạc cần tài liệu dùng được ngay cho dạy học, tập band và biểu diễn."
- **CTA chính**: Button "Gửi yêu cầu – Nhận tư vấn" → scroll đến form
- **CTA phụ**: "Xem dịch vụ & giá" → scroll đến bảng giá

### 2. Dịch vụ này dùng để làm gì? (Use Cases)
3 cards sang trọng với icon:
- **Dạy học**: Sheet & track đủ rõ để đứng lớp
- **Tập band**: Phổ & track giúp band vào là tập
- **Biểu diễn / Demo**: Tài liệu đủ chuẩn để diễn

### 3. Ai nên dùng dịch vụ này? (Audience Filter)
3 blocks ngang:
- **GV/HV/Cựu HV SEAMI** — có badge "Ưu đãi nội bộ"
- **Band / Người chơi nghiêm túc**
- **Người làm nhạc bán chuyên / chuyên**

### 4. Dịch vụ & Bảng Giá (Core Section)
Hiển thị dạng bảng/accordion, dễ scan, 2 cột giá rõ ràng:

**4.1 — SHEET & PHỔ**
| Dịch vụ | GV/HV SEAMI | Khách vãng lai |
|---|---|---|
| Sheet giai điệu / chép lại | Từ 100.000đ – 48h | 150.000đ – 48h |
| + Điền hợp âm | +50.000đ | +50.000đ |
| Sheet piano / Tab guitar | Từ 300.000đ – 72h | Từ 400.000đ – 72h |
| Phổ giản lược | Từ 400.000đ – 72h | Từ 600.000đ – 72h |
| Tổng phổ nhạc nhẹ (4 nhạc cụ) | Từ 2.000.000đ – thương lượng | Từ 2.500.000đ – thương lượng |
| Phổ hợp xướng SATB (4 voice) | Từ 1.500.000đ – 72h | Từ 2.000.000đ – 72h |

**4.2 — TRACK & MULTITRACK**
| Dịch vụ | GV/HV SEAMI | Khách vãng lai |
|---|---|---|
| Track 1–2 line | Từ 500.000đ – 72h | Từ 800.000đ – 72h |
| Track full band (4 nhạc cụ) | Từ 2.000.000đ – thương lượng | Từ 2.500.000đ – thương lượng |
| Raw multitrack (4 nhạc cụ) | Từ 2.000.000đ – thương lượng | Từ 2.500.000đ – thương lượng |

**4.3 — Hỗ trợ nhanh**
| Dịch vụ | GV/HV SEAMI | Khách vãng lai |
|---|---|---|
| Tách vocal | 50.000đ – 24h | Không phục vụ |
| Video guide melody | 80.000đ – 24h | 100.000đ – 24h |

### 5. Chuẩn mực SEAMI (Why Us)
- Bullet points: Đúng ngữ cảnh sử dụng / Vai trò nhạc cụ rõ ràng / File giao dùng được ngay
- Quote block nổi bật: *"SEAMI không bán sheet hay track. SEAMI bán chuẩn làm nhạc."*

### 6. Ưu đãi & Chính sách
- Giảm 10–20% mùa thấp điểm
- Giảm 10% cho đơn từ 3 bài
- Deadline rõ: 24h / 48h / 72h / thỏa thuận

### 7. Form gửi yêu cầu
Các trường:
- Họ tên (bắt buộc)
- Số điện thoại (bắt buộc)
- Nhóm khách hàng: GV/HV SEAMI | Khách vãng lai
- Dịch vụ cần (multi-select từ danh sách đầy đủ)
- Mục đích: Dạy học / Tập band / Biểu diễn / Demo
- Deadline mong muốn
- Ghi chú thêm
- **CTA**: "Gửi yêu cầu – Nhận tư vấn từ SEAMI"

### 8. Identity Claim (Footer)
*"Không phải ai cũng cần. Chỉ dành cho người làm nhạc nghiêm túc."*

---

## Backend – ClickUp Integration
- Supabase Edge Function nhận form data → gọi ClickUp API tạo task
- Bạn sẽ cần cung cấp: **ClickUp API Key**, **List ID** để tôi cấu hình
- Task trên ClickUp sẽ chứa toàn bộ thông tin lead (tên, SĐT, dịch vụ, mục đích, deadline, ghi chú)

