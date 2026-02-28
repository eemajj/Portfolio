'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ProjectDataContext = createContext();

export const useProjectData = () => {
  const context = useContext(ProjectDataContext);
  if (!context) {
    throw new Error('useProjectData must be used within a ProjectDataProvider');
  }
  return context;
};

export const ProjectDataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default project data ที่ซิงค์กับ Projects.js (ครบ 20 ผลงาน)
  const getDefaultProjects = () => [
    {
      id: 1,
      title: 'Donmuang Tollway Contest 2017 "Father\'s say Better Way"',
      description: 'การประกวดโครงการ Donmuang Tollway Contest 2017 ในหัวข้อ "Father\'s say Better Way"',
      category: 'Contest & Competition',
      year: '2017',
      status: 'completed',
      videoUrl: 'https://youtu.be/9UOp_EY1Q4w',
      impact: 'ส่งผลงานเข้าประกวดสำเร็จ พัฒนาทักษะการทำวิดีโอและการนำเสนอ',
      hasVideo: true,
      createdAt: new Date('2017-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'คลิปวิดิโอ วันผู้สูงอายุแห่งชาติ ประจำปี 2561',
      description: 'ผลิตคลิปวิดิโอเพื่อสืบสานวันผู้สูงอายุแห่งชาติ ประจำปี 2561 - เข้ารอบ 10 ผลงานสุดท้าย',
      category: 'Video Production',
      year: '2561 (2018)',
      status: 'completed',
      videoUrl: 'https://youtu.be/6obe8PQfu3U',
      impact: 'เข้ารอบ 10 ผลงานสุดท้าย ช่วยสร้างความตระหนักเรื่องการดูแลผู้สูงอายุ',
      hasVideo: true,
      createdAt: new Date('2018-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'ประกวดภาพยนตร์สั้น "คุณก็เป็นผู้พิทักษ์เด็กได้"',
      description: 'ประกวดภาพยนตร์สั้นเพื่อการคุ้มครองเด็กโดยมูลนิธิศูนย์พิทักษ์เด็ก',
      category: 'Film Production',
      year: '2020',
      status: 'completed',
      videoUrl: 'https://www.youtube.com/watch?v=y2x09imI2S4',
      impact: 'ผลิตภาพยนตร์สั้นเสร็จสมบูรณ์ สนับสนุนการรณรงค์คุ้มครองเด็ก',
      hasVideo: true,
      createdAt: new Date('2020-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      title: 'คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว',
      description: 'ออกแบบและจัดทำคู่มือการปฏิบัติงานสำหรับเจ้าหน้าที่ในการคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว',
      category: 'Manual Design',
      year: '2565-2567',
      status: 'completed',
      videoUrl: 'https://youtu.be/hikVR2zlErc',
      manualUrl: 'https://www.canva.com/design/DAGKhvuY3qk/WCUWKR6_CTETZ-sBhBcOCw/edit?utm_content=DAGKhvuY3qk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      impact: 'คู่มือสำเร็จรูปใช้งานได้จริง ช่วยให้เจ้าหน้าที่มีแนวทางการทำงานที่ชัดเจน',
      hasMultipleLinks: true,
      createdAt: new Date('2022-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      title: 'Family DEE',
      description: 'โครงการนวัตกรรมเพื่อสังคมรุ่นใหม่ Family DEE พัฒนาระบบดิจิทัลเพื่อสนับสนุนครอบครัวและการพัฒนาสังคม ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ ประจำปี 2566',
      category: 'Social Innovation',
      year: '2566 (2023)',
      status: 'completed',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/',
      prototypeUrl: 'https://www.figma.com/proto/WEYHbHtYUNmnhRp9NSQONV/Family-DEE?node-id=0-1&t=MfVtxupxdTl1A612-1',
      impact: 'ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ ประจำปี 2566',
      type: 'multiple',
      createdAt: new Date('2023-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 6,
      title: 'รักอย่างไร ไร้ความรุนแรง',
      description: 'โครงการรณรงค์เพื่อสร้างความตระหนักเรื่องความรักที่ปราศจากความรุนแรง เนื่องในวันวาเลนไทน์ ปี 2566 ผ่านการสัมภาษณ์ผู้บริหารระดับสูง 3 ท่าน',
      category: 'Social Campaign',
      year: '2566 (2023)',
      status: 'completed',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/2558191164345971/',
      impact: 'แคมเปญวันวาเลนไทน์ สร้างความตระหนักเรื่องความรักที่ดีต่อกัน',
      hasVideo: true,
      createdAt: new Date('2023-02-14').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 7,
      title: 'กรมกิจการสตรีและสถาบันครอบครัว ประชุมหารือการนำแดชบอร์ดมาใช้ในการเพิ่มประสิทธิภาพองค์กร',
      description: 'เมื่อวันพุธที่ 26 กุมภาพันธ์ 2568 นางสาวแรมรุ้ง วรวัธ อธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานการประชุมหารือการนำแดชบอร์ดมาใช้ในการเพิ่มประสิทธิภาพองค์กรด้วยข้อมูล',
      category: 'Organizational Activity',
      year: '2025',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/dwfdashboardmeeting/486534512_961596016163594_3034625560110148954_n.jpg',
        '/images/dwfdashboardmeeting/486611042_961593456163850_7201093441034216817_n.jpg',
        '/images/dwfdashboardmeeting/486615567_961594606163735_2818629268890692522_n.jpg'
      ],
      impact: 'ประชุมสำเร็จ เป็นการพัฒนาระบบการทำงานที่ทันสมัย',
      createdAt: new Date('2025-02-26').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 8,
      title: 'กระทรวงการพัฒนาสังคมฯ โดยกรมกิจการสตรีฯ เพิ่มทักษะและพัฒนาศักยภาพเครือข่ายด้านครอบครัว',
      description: 'เมื่อวันที่ 21 มิถุนายน 2565 นางรุ่งทิวา สุดแดน รองอธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานเปิดประชุมเชิงปฏิบัติการเพื่อพัฒนาศักยภาพทีมวิทยากรด้านครอบครัวระดับจังหวัด',
      category: 'Training & Development',
      year: '2022',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/dwfnodeef/484934258_9297541330334720_8065886597238879653_n.jpg',
        '/images/dwfnodeef/484999819_9297541200334733_5422551071177174353_n.jpg'
      ],
      impact: 'พัฒนาทีมวิทยากรระดับจังหวัด เสริมศักยภาพด้านครอบครัว',
      createdAt: new Date('2022-06-21').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 9,
      title: 'กรมกิจการสตรีและสถาบันครอบครัว ประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO) ครั้งที่ 3/2567',
      description: 'เมื่อวันที่ 4 ธันวาคม 2567 นางสุดา สุหลง รองอธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานการประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO) ครั้งที่ 3/2567 เพื่อขับเคลื่อนการดำเนินงานด้านเทคโนโลยีดิจิทัลของกรม',
      category: 'Digital Technology Meeting',
      year: '2024',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/DCIO3_67/482988963_953845130272016_5667888969399600593_n.jpg',
        '/images/DCIO3_67/484053362_953845236938672_5864024295462920978_n.jpg'
      ],
      impact: 'ประชุมสำเร็จ ขับเคลื่อนการดำเนินงานด้านเทคโนโลยี',
      createdAt: new Date('2024-12-04').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 10,
      title: 'ประชุมพิจารณาคัดเลือกผลงาน KM Awards 2565',
      description: 'เมื่อวันที่ 20 ตุลาคม 2565 นางรุ่งทิวา สุดแดน รองอธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานในการประชุมพิจารณาคัดเลือกผลงาน KM Awards เพื่อตัดสินรางวัลสุดยอดการจัดการความรู้เพื่อการพัฒนางาน ประจำปี 2565',
      category: 'Knowledge Management',
      year: '2022',
      status: 'completed',
      videoUrl: 'https://youtu.be/gTugGrdx_-8?si=iF5G06iQ4HhO8a2c',
      hasVideo: true,
      hasGallery: true,
      imageUrls: [
        '/images/KM2022/486227610_9345949132160606_472504435968209862_n.jpg',
        '/images/KM2022/486319561_9345949012160618_5465287812274074946_n.jpg'
      ],
      impact: 'ประชุมสำเร็จ คัดเลือกผลงาน KM Awards ได้ตามเป้าหมาย',
      createdAt: new Date('2022-10-20').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 11,
      title: 'ประกวดรางวัลต้นแบบนวัตกรรมการทำงาน กรมกิจการสตรีและสถาบันครอบครัว 2566',
      description: 'เมื่อวันที่ 23 สิงหาคม 2566 นางจินตนา จันทร์บำรุง อธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานเปิดการประกวดรางวัลต้นแบบนวัตกรรมการทำงาน ประจำปี 2566 (Creative Innovators) เพื่อสร้างนวัตกรด้านสังคมรุ่นใหม่',
      category: 'Innovation Contest',
      year: '2023',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/DWFInnovation23/480782578_940587048264491_2013427237995406395_n.jpg',
        '/images/DWFInnovation23/480800418_940586778264518_33468162825338794_n.jpg'
      ],
      impact: 'จัดประกวดนวัตกรรมสำเร็จ ค้นหานวัตกรรุ่นใหม่ในองค์กร',
      createdAt: new Date('2023-08-23').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 12,
      title: 'ประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล (Data Catalog)',
      description: 'เมื่อวันที่ 28 สิงหาคม 2566 นางสาวราภรณ์ พงศ์พนิตานนท์ ผู้เชี่ยวชาญเฉพาะด้านครอบครัว เป็นประธานเปิดประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล (Data Catalog) กรมกิจการสตรีและสถาบันครอบครัว',
      category: 'Data Management',
      year: '2023',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/DataCatalog66/480871449_940599548263241_7841532354308943744_n.jpg',
        '/images/DataCatalog66/480996384_940599694929893_5019624841527991381_n.jpg'
      ],
      impact: 'บัญชีข้อมูลสำเร็จ เป็นฐานในการจัดการข้อมูลของกรม',
      createdAt: new Date('2023-08-28').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 13,
      title: 'พัฒนาทักษะนวัตกรเพื่อต่อยอดนวัตกรรมด้านสังคม',
      description: 'เมื่อวันที่ 4 มีนาคม 2567 นายธนสุนทร สว่างสาลี อธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานการประชุมเชิงปฏิบัติการพัฒนาทักษะนวัตกรเพื่อต่อยอดนวัตกรรมด้านสังคมของกรม',
      category: 'Innovator Skills Workshop',
      year: '2024',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
        '/images/Innovation67/482223810_948500637473132_3179917503545264439_n.jpg'
      ],
      impact: 'พัฒนาทักษะนวัตกร เสริมศักยภาพบุคลากรในองค์กร',
      createdAt: new Date('2024-03-04').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 14,
      title: 'อบรมพัฒนาศักยภาพ สร้างคนรุ่นใหม่ให้เป็นนวัตกรด้านสังคม',
      description: 'เมื่อวันที่ 5-7 กรกฎาคม 2566 นางจินตนา จันทร์บำรุง อธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานปิดการประชุมเชิงปฏิบัติการขับเคลื่อนนวัตกรด้านสังคมรุ่นใหม่ตามโครงการ Creating Innovators',
      category: 'Social Innovation Training',
      year: '2023',
      status: 'completed',
      hasGallery: true,
      imageUrls: [
        '/images/InnovationTraining/357541761_18374266831042017_7852216339151780531_n.jpeg',
        '/images/InnovationTraining/357747300_18374266840042017_6038994410587202327_n.jpeg'
      ],
      impact: 'อบรมสำเร็จ พัฒนาบุคลากรที่มีทักษะด้านนวัตกรรม',
      createdAt: new Date('2023-07-05').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 15,
      title: 'False Awakening',
      description: 'ผลงานสร้างสรรค์ระดับมหาวิทยาลัย เรื่องราวของการตื่นขึ้นมาที่ไม่ใช่ความจริง การสำรวจจิตใต้สำนึกผ่านสื่อศิลปะ',
      category: 'University Project',
      year: '2019',
      status: 'completed',
      videoUrl: 'https://youtu.be/FC4H7cu63Tc',
      hasVideo: true,
      hasGallery: true,
      imageUrls: [
        '/images/FalseAwakening/131243678_2637519289872224_2151493129302845335_n.jpg',
        '/images/FalseAwakening/131539649_2637519596538860_6199422370877159104_n.jpg'
      ],
      impact: 'ผลงานศิลปะสำเร็จ ได้รับความสนใจจากอาจารย์',
      createdAt: new Date('2019-05-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 16,
      title: 'Recap งานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว',
      description: 'สรุปกิจกรรมและไฮไลท์จากงานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว การจัดกิจกรรมเพื่อสร้างความสัมพันธ์ในครอบครัวและการดูแลผู้สูงอายุ',
      category: 'Social Impact Project',
      year: '2021',
      status: 'completed',
      videoUrl: 'https://youtu.be/v--_EH1Ho-Y?si=4Cdp3-VufhOPeySH',
      hasVideo: true,
      impact: 'คลิปสรุปกิจกรรมสำเร็จ บันทึกค่านิยมของงาน',
      createdAt: new Date('2021-10-01').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 17,
      title: 'World Food Day 2021 ร่วมกับมูลนิธิ SOS Thailand',
      description: 'กิจกรรมวันอาหารโลก ประจำปี 2021 ร่วมมือกับมูลนิธิ SOS Thailand ในการสร้างความตระหนักเรื่องความมั่นคงทางอาหารและการจัดหาอาหารให้เด็กและครอบครัวที่ขาดแคลน',
      category: 'Community Outreach Activity',
      year: '2021',
      status: 'completed',
      videoUrl: 'https://youtu.be/udOIlzMg_fU?si=x3nZnejgfzbzGK2e',
      hasVideo: true,
      impact: 'กิจกรรมวันอาหารโลกสำเร็จ ร่วมมือกับมูลนิธิ',
      createdAt: new Date('2021-10-16').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 18,
      title: 'พม.ภูเก็ตลงพื้นที่แจกอาหารแห้งและของใช้จำเป็น',
      description: 'กิจกรรมลงพื้นที่จังหวัดภูเก็ต เพื่อแจกจ่ายอาหารแห้งและของใช้จำเป็นให้กับครอบครัวที่ได้รับผลกระทบจากสถานการณ์ต่างๆ การสร้างเครือข่ายชุมชนและการช่วยเหลือสังคม',
      category: 'Community Outreach Activity',
      year: '2021',
      status: 'completed',
      videoUrl: 'https://youtu.be/iO2Kv1p7UPI',
      hasVideo: true,
      impact: 'ลงพื้นที่ช่วยเหลือสำเร็จ สร้างเครือข่ายชุมชน',
      createdAt: new Date('2021-08-15').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 19,
      title: 'CSR ร่วมกับ HarmonyWorld.fr ณ บ้านเด็กตะวันฉาย',
      description: 'โครงการความรับผิดชอบต่อสังคม (CSR) ร่วมกับ HarmonyWorld.fr ณ บ้านเด็กตะวันฉาย กิจกรรมการให้ความรู้ การดูแลเด็กและเยาวชน และการพัฒนาทักษะชีวิตสำหรับเด็กในสถานสงเคราะห์',
      category: 'CSR Project',
      year: '2021',
      status: 'completed',
      videoUrl: 'https://youtu.be/Vye6sB9WMXc',
      hasVideo: true,
      impact: 'โครงการ CSR สำเร็จ พัฒนาทักษะชีวิตเด็ก',
      createdAt: new Date('2021-11-20').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 20,
      title: 'Infographic Cyber Security',
      description: 'การออกแบบและจัดทำ Infographic เพื่อสร้างความตระหนักรู้ด้านความปลอดภัยทางไซเบอร์',
      category: 'Infographic Design',
      year: '2024',
      status: 'completed',
      hasGallery: true,
      imageUrls: ['/images/InfographicCyber/cybersecinfo.jpg'],
      impact: 'Infographic เสร็จสมบูรณ์ สร้างความตระหนักด้าน Cyber Security',
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Load data from localStorage or set defaults
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const saved = localStorage.getItem('portfolio_projects');
        const defaultProjects = getDefaultProjects();
        
        if (saved) {
          const savedProjects = JSON.parse(saved);
          if (savedProjects.length > 0) {
            setProjects(savedProjects);
          } else {
            // ถ้าไม่มีข้อมูลใน localStorage ให้ใช้ข้อมูลเริ่มต้น
            setProjects(defaultProjects);
            localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
          }
        } else {
          // ถ้าไม่มี localStorage ให้ใช้ข้อมูลเริ่มต้น
          setProjects(defaultProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading projects:', error);
        // ถ้าเกิดข้อผิดพลาดให้ใช้ข้อมูลเริ่มต้น
        const defaultProjects = getDefaultProjects();
        setProjects(defaultProjects);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save to localStorage whenever projects change - ป้องกัน quota error และ infinite loop
  useEffect(() => {
    if (projects.length > 0 && !isLoading) {
      try {
        // ลด size ข้อมูลก่อนเก็บ - ลบ imageUrls ที่เป็น blob/object URLs
        const compressedProjects = projects.map(project => {
          const compressed = { ...project };
          
          // ถ้า imageUrls มี blob URLs ให้แทนที่ด้วย placeholder
          if (compressed.imageUrls && Array.isArray(compressed.imageUrls)) {
            compressed.imageUrls = compressed.imageUrls.map(url => {
              if (url.startsWith('blob:')) {
                return '/images/placeholder.jpg'; // ใช้ placeholder แทน
              }
              return url;
            });
          }
          
          return compressed;
        });
        
        localStorage.setItem('portfolio_projects', JSON.stringify(compressedProjects));
        
        // ลบ broadcast event ที่ทำให้เกิด infinite loop
        // window.dispatchEvent(new CustomEvent('projectsUpdated', { 
        //   detail: { projects } 
        // }));
      } catch (error) {
        if (error.name === 'QuotaExceededError') {
          alert('⚠️ พื้นที่เก็บข้อมูลเต็ม!\n\nกรุณา:\n1. ลดขนาดรูปภาพ\n2. หรือใช้รูปที่มีขนาดเล็กกว่า\n3. หรือลบผลงานเก่าออก');
          
          // ลบข้อมูลเก่าและใช้เฉพาะข้อมูลพื้นฐาน
          const basicProjects = projects.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category,
            year: project.year,
            status: project.status,
            videoUrl: project.videoUrl || '',
            manualUrl: project.manualUrl || '',
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
          }));
          
          try {
            localStorage.setItem('portfolio_projects', JSON.stringify(basicProjects));
          } catch (basicError) {
            // eslint-disable-next-line no-console
            console.error('Even basic data too large:', basicError);
          }
        } else {
          // eslint-disable-next-line no-console
          console.error('Error saving to localStorage:', error);
        }
      }
    }
  }, [projects, isLoading]);

  // ลบ listener ที่ทำให้เกิด infinite loop
  // useEffect(() => {
  //   const handleProjectsUpdate = (event) => {
  //     if (event.detail && event.detail.projects) {
  //       setProjects(event.detail.projects);
  //     }
  //   };

  //   window.addEventListener('projectsUpdated', handleProjectsUpdate);
  //   return () => {
  //     window.removeEventListener('projectsUpdated', handleProjectsUpdate);
  //   };
  // }, []);

  // CRUD Operations
  const addProject = useCallback((projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, projectData) => {
    const updatedProject = {
      ...projectData,
      id,
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
    return updatedProject;
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id);
  }, [projects]);

  const clearAllProjects = useCallback(() => {
    setProjects([]);
    localStorage.removeItem('portfolio_projects');
  }, []);

  const resetToDefault = useCallback(() => {
    const defaultProjects = getDefaultProjects();
    setProjects(defaultProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
  }, []);

  // Image upload helper function - ใช้ File URL แทน Base64 เพื่อประหยัด localStorage
  const uploadProjectImage = useCallback((file) => {
    return new Promise((resolve) => {
      // สร้าง Object URL สำหรับไฟล์ (ไม่ใช้ localStorage)
      const objectUrl = URL.createObjectURL(file);
      
      // สร้าง unique filename
      const uniqueName = `uploaded_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const imageUrl = `/images/uploads/${uniqueName}`;
      
      // สำหรับ development ใช้ Object URL
      if (process.env.NODE_ENV === 'development') {
        resolve(objectUrl);
      } else {
        // สำหรับ production ใช้ path ปกติ
        resolve(imageUrl);
      }
    });
  }, []);

  const value = useMemo(() => ({
    projects,
    isLoading,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    clearAllProjects,
    resetToDefault,
    uploadProjectImage,
    setProjects // สำหรับการโหลดข้อมูลทั้งหมดพร้อมกัน
  }), [projects, isLoading, addProject, updateProject, deleteProject, getProject, clearAllProjects, resetToDefault, uploadProjectImage, setProjects]);

  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  );
};

export default ProjectDataContext;
