

## Cập nhật CLICKUP_API_KEY

Cập nhật secret `CLICKUP_API_KEY` với giá trị token mới mà anh vừa cung cấp.

Sau khi cập nhật, backend function tạo task ClickUp sẽ tự động sử dụng token mới. Không cần thay đổi code.

### Chi tiết kỹ thuật
- Sử dụng tool `add_secret` để ghi đè giá trị mới cho secret `CLICKUP_API_KEY`
- Giá trị mới: `pk_25522267_ZHSUA8HXJOCET4VLX3MCINJXDP6X33VF`
- Không cần deploy lại backend function -- secret được đọc realtime
