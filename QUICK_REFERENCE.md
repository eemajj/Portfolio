# ⚡ Quick Reference สำหรับ Gemini

## 🔥 สิ่งที่ต้องจำ

### 📍 ผู้ใช้: อิศรา อิศรางกูร ณ อยุธยา
- Email: j.itsarangkura@gmail.com
- Phone: 091-058-6229
- **ชื่อต้องสะกดถูก!** อิศรา อิศรางกูร ณ อยุธยา

### 🎨 Projects ปัจจุบัน (6 ผลงาน)
1. **Donmuang Tollway** (2017) - ไม่มีวิดีโอ
2. **Elderly Day Video** (2018) - ไม่มีวิดีโอ
3. **Child Guardian** - ไม่มีวิดีโอ  
4. **Violence Manual** (2565-67) - ไม่มีวิดีโอ
5. **Family DEE** (2566) - 🎥 มีวิดีโอ Facebook
6. **รักอย่างไร ไร้ความรุนแรง** (2566) - 🎥 มีวิดีโอ Facebook

### 🎥 Facebook Videos (2 วิดีโอ)
```javascript
// Family DEE
videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/'

// รักอย่างไร ไร้ความรุนแรง  
videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1612145692543342/'
```

## 🛠️ การแก้ไขไฟล์

### เพิ่มผลงานใหม่ใน Projects.js
```javascript
// ไฟล์: /src/components/Projects.js
// ตำแหน่ง: หลัง id: 6

{
  id: 7, // เพิ่มลำดับ
  title: i18n.language === 'th' ? 'ชื่อไทย' : 'English Name',
  description: 'คำอธิบาย...',
  category: 'หมวดหมู่',
  year: 'ปี',
  technologies: [],
  features: [],
  status: 'completed',
  impact: 'ผลกระทบ',
  videoUrl: 'URL', // ถ้ามี
  hasVideo: true/false
}
```

### ปุ่มวิดีโอ Facebook (อัตโนมัติ)
```javascript
// ถ้า hasVideo: true และมี videoUrl = ปุ่ม "ดูวิดีโอ" สีน้ำเงิน
// ถ้า hasVideo: false = ปุ่ม "View More" สี primary
```

## ❗ ข้อห้าม
- ❌ แก้ไขชื่อ-นามสกุล
- ❌ แก้ไขข้อมูลที่ถูกต้องแล้ว  
- ❌ ใช้ข้อมูล mock-up
- ❌ ทำ syntax error

## ✅ ข้อควรทำ
- ✅ อ่าน PROJECT_GUIDE_FOR_GEMINI.md ก่อน
- ✅ ถามถ้าไม่แน่ใจ
- ✅ ยืนยันก่อนทำ
- ✅ ตรวจสอบ syntax
- ✅ รายงานผล

## 🚀 คำสั่งรันระบบ
```bash
cd /Users/maryjaneluangkailerst/Desktop/Portfolio/portfolio  
npm start
# เปิด http://localhost:3000
```

**หมายเหตุ: อ่านไฟล์ PROJECT_GUIDE_FOR_GEMINI.md เพื่อความละเอียดเพิ่มเติม**