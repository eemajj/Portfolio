# 🎯 คู่มือโปรเจค Portfolio Website สำหรับ Gemini

## 📋 ข้อมูลโครงการ
- **ชื่อโปรเจค**: Interactive Portfolio Website
- **เจ้าของ**: อิศรา อิศรางกูร ณ อยุธยา
- **Tech Stack**: JavaScript (ไม่ใช้ TypeScript), React, TailwindCSS, i18next
- **สถานะ**: กำลังพัฒนา - เพิ่มเติมผลงานและปรับปรุง

## 🎨 โครงสร้างเว็บไซต์
```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Experience.js
│   │   ├── Education.js
│   │   ├── Skills.js
│   │   ├── Projects.js ⭐ หลัก
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── i18n/
│   └── App.js
```

## 🎯 หลักการสำคัญในการทำงาน

### ✅ สิ่งที่ต้องทำ:
1. **ฟังให้ละเอียด** - อ่านความต้องการให้ครบถ้วน
2. **ถามให้ชัดเจน** - ถ้าไม่แน่ใจ ถามก่อนทำ
3. **ยืนยันความเข้าใจ** - สรุปสิ่งที่จะทำให้ฟัง
4. **ทำตามที่ขอ** - ไม่เพิ่มเติม ไม่ลดทอน
5. **รายงานผล** - บอกสิ่งที่ทำเสร็จแล้ว

### ❌ สิ่งที่ห้ามทำ:
- เพิ่มข้อมูลที่ไม่ได้ขอ
- แก้ไขข้อมูលที่ถูกต้องแล้ว
- ใช้ข้อมูล mockup หรือสร้างเอง
- เปลี่ยนโครงสร้างโดยไม่ได้รับอนุญาต

## 📊 ข้อมูลส่วนบุคคล (ตรงตาม me.md)
- **ชื่อ**: อิศรา อิศรางกูร ณ อยุธยา
- **ตำแหน่ง**: นักประชาสัมพันธ์ (PR) | Digital Communications
- **อีเมล**: j.itsarangkura@gmail.com
- **โทรศัพท์**: 091-058-6229
- **การศึกษา**: คณะนิเทศศาสตร์ สาขาภาพยนตร์ดิจิทัล มหาวิทยาลัยหอการค้าไทย

## 🏢 ประสบการณ์การทำงาน (4 ตำแหน่ง)
1. **เจ้าหน้าที่ระบบงานคอมพิวเตอร์** (2567-ปัจจุบัน)
2. **เจ้าหน้าที่ช่วยปฏิบัติงานนักพัฒนาสังคม** (2565-2567)
3. **เจ้าหน้าที่ช่วยปฏิบัติงานนักพัฒนาสังคม** (2565)
4. **นักพัฒนาสังคม** (2564-2565)

## 🎓 ใบรับรอง (5 ใบ)
1. **GDCC Certification** (2023-2024)
2. **Team Talent กองส่งเสริมสถาบันครอบครัว** (2566)
3. **นวัตกรด้านสังคมรุ่นใหม่** (2566) ← ไม่มีวิดีโอ
4. **PDPA และ ROPA** (2568)
5. **Thammasat University English Test** (Score 470)

## 🎨 Projects Component - รายละเอียดผลงาน (6 ผลงาน)

### Project 1: Donmuang Tollway Contest 2017
```javascript
{
  id: 1,
  title: 'Donmuang Tollway Contest 2017 "Father\'s say Better Way"',
  category: 'Contest & Competition',
  year: '2017',
  status: 'completed',
  hasVideo: false
}
```

### Project 2: National Elderly Day Video 2018
```javascript
{
  id: 2,
  title: 'คลิปวิดิโอ วันผู้สูงอายุแห่งชาติ ประจำปี 2561',
  category: 'Video Production', 
  year: '2561 (2018)',
  status: 'completed',
  impact: 'เข้ารอบ 10 ผลงานสุดท้าย',
  hasVideo: false
}
```

### Project 3: Child Guardian Short Film
```javascript
{
  id: 3,
  title: 'ประกวดภาพยนตร์สั้น "คุณก็เป็นผู้พิทักษ์เด็กได้"',
  category: 'Film Production',
  year: 'Not specified',
  status: 'completed',
  hasVideo: false
}
```

### Project 4: Domestic Violence Manual
```javascript
{
  id: 4,
  title: 'คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว',
  category: 'Manual Design & Development',
  year: '2565-2567',
  status: 'completed',
  hasVideo: false
}
```

### Project 5: Family DEE ⭐ มีวิดีโอ Facebook
```javascript
{
  id: 5,
  title: 'Family DEE',
  category: 'Social Innovation',
  year: '2566 (2023)',
  status: 'completed',
  features: [
    'พัฒนาแอปพลิเคชันด้านครอบครัวเพื่อเข้าถึงประชาชน',
    'เผยแพร่ภารกิจหน้าที่ของหน่วยงานให้ประชาชนได้ทราบ', 
    'นวัตกรรมเพื่อสังคมรุ่นใหม่'
  ],
  impact: 'ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ ประจำปี 2566',
  videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/',
  hasVideo: true ← มีปุ่ม "ดูวิดีโอ" สีน้ำเงิน
}
```

### Project 6: รักอย่างไร ไร้ความรุนแรง ⭐ มีวิดีโอ Facebook  
```javascript
{
  id: 6,
  title: 'รักอย่างไร ไร้ความรุนแรง',
  category: 'Social Campaign & Video Production',
  year: '2566 (2023)',
  status: 'completed',
  features: [
    'สัมภาษณ์ผู้บริหารระดับสูง 3 ท่าน',
    'รณรงค์เรื่องความรักที่ปราศจากความรุนแรง',
    'เผยแพร่ในวันวาเลนไทน์'
  ],
  impact: 'สร้างความตระหนักเรื่องความรักที่ปราศจากความรุนแรงในสังคม',
  videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1612145692543342/',
  hasVideo: true ← มีปุ่ม "ดูวิดีโอ" สีน้ำเงิน
}
```

## 🎯 สิ่งสำคัญที่ต้องจำ

### 📍 โครงสร้าง Projects Component:
```javascript
// Action Buttons Logic
{project.hasVideo && project.videoUrl ? (
  <a href={project.videoUrl} target="_blank" className="bg-blue-600">
    <svg>Facebook Icon</svg>
    <span>ดูวิดีโอ</span>
  </a>
) : (
  <button className="bg-primary-600">
    <ExternalLink />
    <span>View More</span>
  </button>
)}
```

### 🔄 การแยก Content:
- **ใบรับรอง "นวัตกรด้านสังคม"** → Education Component (ไม่มีวิดีโอ)
- **ผลงาน "Family DEE"** → Projects Component (มีวิดีโอ)

### 🎨 Theme & Styling:
- **สี**: TailwindCSS with Pink/Primary palette
- **ภาษา**: i18next (Thai/English)
- **Responsive**: Mobile-first design
- **Animation**: Framer Motion

## 🚨 ข้อควรระวัง

### เมื่อเพิ่มผลงานใหม่:
1. **ตรวจสอบ id** - เพิ่มเป็นลำดับถัดไป
2. **ตั้งค่า hasVideo** - true ถ้ามี Facebook video, false ถ้าไม่มี
3. **videoUrl** - ใส่ลิงก์ Facebook ที่ถูกต้อง
4. **แปลภาษา** - ครบทั้งไทยและอังกฤษ
5. **features array** - ใส่ 3 คุณสมบัติหลัก

### Facebook Video Format:
```
https://www.facebook.com/sorkor026596776/videos/[VIDEO_ID]/
```

### การแก้ไข Projects.js:
- ใช้ Edit tool สำหรับการแก้ไขเล็กน้อย
- ใช้ MultiEdit หรือ Write tool สำหรับการเปลี่ยนแปลงใหญ่
- **ห้าม** ทำให้ syntax error
- **ตรวจสอบ** closing brackets และ commas

## 📝 ตัวอย่างการเพิ่มผลงานใหม่
```javascript
{
  id: 7, // เพิ่มจาก id สุดท้าย
  title: i18n.language === 'th' ? 'ชื่อไทย' : 'English Name',
  description: i18n.language === 'th' ? 'คำอธิบายไทย' : 'English Description',
  category: 'หมวดหมู่',
  year: 'ปี',
  technologies: ['เทคโนโลยี1', 'เทคโนโลยี2'],
  features: i18n.language === 'th' ? [
    'คุณสมบัติ 1',
    'คุณสมบัติ 2', 
    'คุณสมบัติ 3'
  ] : [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  status: 'completed',
  impact: i18n.language === 'th' ? 'ผลกระทบไทย' : 'English Impact',
  videoUrl: 'https://www.facebook.com/sorkor026596776/videos/[VIDEO_ID]/', // ถ้ามี
  hasVideo: true/false // ขึ้นอยู่กับว่ามีวิดีโอหรือไม่
}
```

## 🔄 การทำงานกับ Gemini

### เมื่อผู้ใช้ขอเพิ่มผลงาน:
1. อ่านไฟล์นี้ก่อน
2. ถามรายละเอียดที่ขาดหาย
3. ยืนยันความเข้าใจ
4. ดำเนินการแก้ไข
5. รายงานผลที่ทำเสร็จ

### เมื่อเจอปัญหา:
1. ตรวจสอบ syntax JavaScript
2. ตรวจสอบ id ที่ซ้ำกัน
3. ตรวจสอบการแปลภาษา
4. ตรวจสอบ closing brackets

**สุดท้าย: ทำงานอย่างละเอียด แม่นยำ และตรวจสอบก่อนส่งมอบเสมอ!** ✨

---
*ไฟล์นี้สร้างขึ้นเพื่อให้ Gemini เข้าใจโครงการและสามารถทำงานต่อได้อย่างถูกต้อง*
*Last Updated: วันที่ระบบสร้างไฟล์นี้*