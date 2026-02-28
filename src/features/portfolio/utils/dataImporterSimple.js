// Simple Data Importer - 5 โปรเจคแรกเท่านั้น
export const importSimpleData = () => {
  try {
    // ข้อมูล 5 โปรเจคแรก
    const projects = [
      {
        id: 1,
        title: { th: 'Donmuang Tollway Contest 2017', en: 'Donmuang Tollway Contest 2017' },
        description: { th: 'การประกวดโครงการ Donmuang Tollway Contest 2017', en: 'Donmuang Tollway Contest 2017 project' },
        category: 'Contest & Competition',
        year: '2017',
        technologies: ['Creative Production', 'Content Development'],
        features: { th: ['พัฒนาเนื้อหา', 'การนำเสนอ'], en: ['Content Development', 'Presentation'] },
        status: 'completed',
        impact: { th: 'ได้รับการยอมรับ', en: 'Well received' },
        videoUrl: 'https://youtu.be/9UOp_EY1Q4w',
        hasVideo: true,
        createdAt: new Date('2017-01-01').toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: { th: 'คลิปวิดิโอ วันผู้สูงอายุแห่งชาติ ประจำปี 2561', en: 'National Elderly Day Video 2018' },
        description: { th: 'ผลิตคลิปวิดิโอวันผู้สูงอายุ', en: 'Elderly Day video production' },
        category: 'Video Production',
        year: '2018',
        technologies: ['Video Production', 'Post-Production'],
        features: { th: ['ผลิตสื่อวิดีโอ', 'เล่าเรื่อง'], en: ['Video Production', 'Storytelling'] },
        status: 'completed',
        impact: { th: 'เข้ารอบ 10 ผลงานสุดท้าย', en: 'Top 10 finalist' },
        videoUrl: 'https://youtu.be/6obe8PQfu3U',
        hasVideo: true,
        createdAt: new Date('2018-01-01').toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: { th: 'ประกวดภาพยนตร์สั้น "คุณก็เป็นผู้พิทักษ์เด็กได้"', en: 'Short Film Contest' },
        description: { th: 'ประกวดภาพยนตร์สั้นเพื่อการคุ้มครองเด็ก', en: 'Short film contest for child protection' },
        category: 'Film Production',
        year: '2020',
        technologies: ['Short Film Production', 'Social Impact Media'],
        features: { th: ['ภาพยนตร์สั้น', 'เนื้อหาคุ้มครองเด็ก'], en: ['Short film', 'Child protection content'] },
        status: 'completed',
        impact: { th: 'สร้างความตระหนัก', en: 'Created awareness' },
        videoUrl: 'https://www.youtube.com/watch?v=y2x09imI2S4',
        hasVideo: true,
        createdAt: new Date('2020-01-01').toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        title: { th: 'คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว', en: 'Domestic Violence Protection Manual' },
        description: { th: 'ออกแบบคู่มือการปฏิบัติงาน', en: 'Operational manual design' },
        category: 'Manual Design & Development',
        year: '2022-2024',
        technologies: ['Manual Design', 'Content Development'],
        features: { th: ['ออกแบบคู่มือ', 'พัฒนาเนื้อหา'], en: ['Manual design', 'Content development'] },
        status: 'completed',
        impact: { th: 'เป็นคู่มือมาตรฐาน', en: 'Standard manual' },
        videoUrl: 'https://youtu.be/hikVR2zlErc',
        hasMultipleLinks: true,
        createdAt: new Date('2022-01-01').toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        title: { th: 'Family DEE', en: 'Family DEE' },
        description: { th: 'โครงการนวัตกรรมเพื่อสังคมรุ่นใหม่', en: 'New generation social innovation project' },
        category: 'Social Innovation',
        year: '2023',
        technologies: ['Social Innovation', 'Digital Systems'],
        features: { th: ['พัฒนาแอปพลิเคชัน', 'นวัตกรรมสังคม'], en: ['App development', 'Social innovation'] },
        status: 'completed',
        impact: { th: 'ได้รับรางวัลนวัตกร 2566', en: 'Awarded 2023 Social Innovator' },
        videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/',
        hasVideo: true,
        createdAt: new Date('2023-01-01').toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // ข้อมูลส่วนตัวแบบง่าย
    const profileData = {
      personalInfo: {
        fullName: { th: 'อิศรา อิศรางกูร ณ อยุธยา', en: 'Itsara Itsarangkura Na Ayuttaya' },
        position: { th: 'นักวิเคราะห์นโยบายและแผนชำนาญการพิเศษ', en: 'Senior Policy and Planning Analyst' },
        organization: { th: 'กรมกิจการสตรีและสถาบันครอบครัว', en: 'Department of Women Affairs and Family Development' },
        email: 'itsara.portfolio@example.com',
        location: { th: 'กรุงเทพฯ, ไทย', en: 'Bangkok, Thailand' }
      },
      skills: [
        { category: 'Policy Analysis', items: ['Strategic Planning', 'Policy Research', 'Impact Assessment'] },
        { category: 'Digital Innovation', items: ['Social Innovation', 'Technology Implementation', 'Data Analytics'] },
        { category: 'Content Creation', items: ['Video Production', 'Content Development', 'Social Media'] },
        { category: 'Project Management', items: ['Program Coordination', 'Team Leadership', 'Quality Assurance'] }
      ],
      experience: [
        {
          title: { th: 'นักวิเคราะห์นโยบายและแผนชำนาญการพิเศษ', en: 'Senior Policy and Planning Analyst' },
          company: { th: 'กรมกิจการสตรีและสถาบันครอบครัว', en: 'Department of Women Affairs and Family Development' },
          period: '2020 - ปัจจุบัน',
          description: { th: 'พัฒนานโยบายและแผนงานด้านครอบครัว', en: 'Developing family policies and programs' }
        }
      ]
    };

    // บันทึกข้อมูล
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    localStorage.setItem('portfolio_profile_data', JSON.stringify(profileData));
    
    // ไฟล์สื่อตัวอย่าง
    const mediaFiles = [
      { id: Date.now(), name: 'sample-video.mp4', type: 'video', size: 10485760, uploadDate: new Date().toISOString(), url: '/placeholder.mp4' },
      { id: Date.now() + 1, name: 'sample-image.jpg', type: 'image', size: 1048576, uploadDate: new Date().toISOString(), url: '/placeholder.jpg' }
    ];
    localStorage.setItem('portfolio_media_files', JSON.stringify(mediaFiles));

    return { success: true, message: 'นำเข้าข้อมูล 5 โปรเจคเรียบร้อย' };
  } catch (error) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
};