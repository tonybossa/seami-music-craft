

# Tính tổng giá & xác nhận trước khi gửi form

## Mô tả
Khi khách chọn dịch vụ trong form, hệ thống sẽ tự động tính và hiển thị **tổng giá tạm tính** dựa trên nhóm khách hàng (SEAMI / Vãng lai). Khách phải **xác nhận giá** trước khi form được gửi đi.

## Cách hoạt động

1. **Chọn dịch vụ** -- mỗi khi tick/bỏ tick, tổng giá cập nhật ngay
2. **Chuyển nhóm khách hàng** -- giá tự tính lại theo bảng giá tương ứng
3. **Hiển thị bảng tổng kết** -- liệt kê từng dịch vụ đã chọn + giá + tổng cộng
4. **Nút xác nhận** -- khách tick "Tôi đã xác nhận báo giá tạm tính" rồi mới bấm gửi được
5. Dịch vụ có giá "thương lượng" hoặc "Không phục vụ" sẽ hiển thị rõ ràng, không cộng vào tổng số

## Bảng giá tối thiểu (dùng trong code)

| Dịch vụ | SEAMI | Khách vãng lai |
|---|---|---|
| Sheet giai điệu / chép lại | 100,000 | 150,000 |
| Dien hop am | 50,000 | 50,000 |
| Sheet piano / Tab guitar | 300,000 | 400,000 |
| Pho gian luoc | 400,000 | 600,000 |
| Tong pho nhac nhe | 2,000,000 (thuong luong) | 2,500,000 (thuong luong) |
| Pho hop xuong SATB | 1,500,000 | 2,000,000 |
| Track 1-2 line | 500,000 | 800,000 |
| Track full band | 2,000,000 (thuong luong) | 2,500,000 (thuong luong) |
| Raw multitrack | 2,000,000 (thuong luong) | 2,500,000 (thuong luong) |
| Tach vocal | 50,000 | null (khong phuc vu) |
| Video guide melody | 80,000 | 100,000 |

## Chi tiet ky thuat

### Thay doi trong `FormSection.tsx`

1. **Them pricing map** -- object map tu ten dich vu sang `{ seami: number | null, guest: number | null, negotiable: boolean }`

2. **Them ham `calculateTotal`** -- duyet qua `form.services`, tra gia theo `form.customerType`, cong tong. Tach rieng danh sach "thuong luong" va "khong phuc vu".

3. **Them khu vuc hien thi gia** -- xuat hien khi `form.services.length > 0`:
   - Danh sach tung dich vu da chon + gia tuong ung
   - Ghi chu "Thuong luong" cho cac dich vu khong co gia co dinh
   - Ghi chu "Khong phuc vu" neu khach vang lai chon "Tach vocal"
   - Dong tong cong in dam, font lon
   - Ghi chu "*Gia toi thieu, co the thay doi tuy do kho bai"

4. **Them state `confirmed`** -- boolean, reset ve `false` moi khi `services` hoac `customerType` thay doi

5. **Them checkbox xac nhan** -- "Toi da xem va dong y voi bao gia tam tinh nay"

6. **Disable nut gui** -- khi `confirmed === false` hoac chua chon dich vu

7. **Gui kem tong gia trong form data** -- body gui len edge function se co them `estimatedTotal` va `hasNegotiableItems` de hien thi tren ClickUp task

### Thay doi trong edge function `create-clickup-task/index.ts`

- Nhan them `estimatedTotal` va `hasNegotiableItems` tu body
- Hien thi trong description cua ClickUp task: "Bao gia tam tinh: X dong" va ghi chu neu co hang muc thuong luong

