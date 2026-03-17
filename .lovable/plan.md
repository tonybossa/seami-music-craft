

## FAQ động từ Google Sheets

Hướng tiếp cận rất hay — dùng Google Sheets làm "CMS nghèo" cho FAQ. Team chỉ cần edit spreadsheet, bấm sync hoặc tự động cập nhật lên web.

### Cost & Benefit

**Lợi ích:**
- Zero learning curve — ai cũng biết dùng Google Sheets
- Nhiều người cùng edit, có version history sẵn
- Không cần xây admin panel
- Không cần database

**Hạn chế:**
- Phụ thuộc Google Sheets API (rate limit 60 req/min, nhưng dư sức cho landing page)
- Cần public sheet hoặc dùng API key
- Không có rich text formatting (bold, link) trừ khi dùng Markdown trong cell

### Kiến trúc

```text
Google Sheet (team edit)
       │
       ▼
Edge Function (fetch & cache)
       │
       ▼
React FAQ Section (hiển thị)
```

### Cách triển khai

**1. Google Sheet format**
- Cột A: Câu hỏi
- Cột B: Câu trả lời  
- Cột C: Thứ tự (số)
- Cột D: Ẩn/Hiện (TRUE/FALSE)
- Sheet phải để chế độ "Anyone with link can view"

**2. Edge Function `fetch-faqs`**
- Fetch data từ Google Sheets API (public sheet, không cần OAuth)
- URL format: `https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}`
- Parse response, filter các row có Cột D = TRUE, sort theo Cột C
- Trả về JSON array `[{ question, answer, order }]`

**3. Cập nhật `FAQSection.tsx`**
- Gọi Edge Function khi mount, hiển thị data động thay vì hardcode
- Giữ fallback static FAQs trong trường hợp fetch fail
- Loading skeleton khi đang fetch

**4. Cập nhật `SEOStructuredData.tsx`**
- FAQPage schema cũng fetch từ cùng data source để đồng bộ

### Cần từ anh
- Tạo Google Sheet với format trên
- Cung cấp Sheet ID (phần trong URL giữa `/d/` và `/edit`)
- Cần 1 Google API Key (free, tạo tại Google Cloud Console) — hoặc dùng public CSV export không cần key

### Lựa chọn đơn giản hơn (không cần API Key)
Dùng URL export CSV của Google Sheets (sheet phải public):
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv
```
Không cần API key, edge function parse CSV trực tiếp. Đơn giản hơn nhưng ít control hơn.

