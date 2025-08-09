import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Award, Image } from 'lucide-react';
import { useState } from 'react';
import GalleryModal from './GalleryModal';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [galleryImages, setGalleryImages] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 1,
      title: i18n.language === 'th' ? 'Donmuang Tollway Contest 2017 "Father\'s say Better Way"' : 'Donmuang Tollway Contest 2017 "Father\'s say Better Way"',
      description: i18n.language === 'th' 
        ? 'การประกวดโครงการ Donmuang Tollway Contest 2017 ในหัวข้อ "Father\'s say Better Way"' 
        : 'Donmuang Tollway Contest 2017 project competition with theme "Father\'s say Better Way"',
      category: 'Contest & Competition',
      year: '2017',
      technologies: ['Creative Production', 'Content Development', 'Competition Management'],
      features: i18n.language === 'th' ? [
        'พัฒนาเนื้อหาเกี่ยวกับบทบาทพ่อ',
        'การนำเสนอแนวคิดสร้างสรรค์',
        'การเข้าแข่งขันระดับชาติ',
        'การผลิตสื่อประกวด'
      ] : [
        'Develop content about father\'s role',
        'Creative concept presentation',
        'National level competition',
        'Contest media production'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'ได้รับการยอมรับในการประกวด' : 'Recognized in the competition',
      videoUrl: 'https://youtu.be/9UOp_EY1Q4w',
      hasVideo: true
    },
    {
      id: 2,
      title: i18n.language === 'th' ? 'คลิปวิดิโอ วันผู้สูงอายุแห่งชาติ ประจำปี 2561' : 'National Elderly Day Video 2018',
      description: i18n.language === 'th' 
        ? 'ผลิตคลิปวิดิโอเพื่อสืบสานวันผู้สูงอายุแห่งชาติ ประจำปี 2561 - เข้ารอบ 10 ผลงานสุดท้าย' 
        : 'Produced video clip for National Elderly Day 2018 - Selected as top 10 final works',
      category: 'Video Production',
      year: '2561 (2018)',
      technologies: ['Video Production', 'Post-Production', 'Storytelling', 'Documentary'],
      features: i18n.language === 'th' ? [
        'ผลิตสื่อวิดีโอสำหรับผู้สูงอายุ',
        'เล่าเรื่องเพื่อสร้างความตระหนัก',
        'การประกวดระดับชาติ',
        'เข้ารอบ 10 ผลงานสุดท้าย'
      ] : [
        'Video media production for elderly',
        'Storytelling to create awareness',
        'National level competition',
        'Selected as top 10 finalists'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เข้ารอบ 10 ผลงานสุดท้าย' : 'Top 10 finalist',
      videoUrl: 'https://youtu.be/6obe8PQfu3U',
      hasVideo: true
    },
    {
      id: 3,
      title: i18n.language === 'th' ? 'ประกวดภาพยนตร์สั้น "คุณก็เป็นผู้พิทักษ์เด็กได้"' : 'Short Film Contest "You Can Be A Child Guardian"',
      description: i18n.language === 'th' 
        ? 'ประกวดภาพยนตร์สั้นเพื่อการคุ้มครองเด็กโดยมูลนิธิศูนย์พิทักษ์เด็ก' 
        : 'Short film contest for child protection by Child Protection Center Foundation',
      category: 'Film Production',
      year: 'Not specified',
      technologies: ['Short Film Production', 'Child Protection Advocacy', 'Social Impact Media'],
      features: i18n.language === 'th' ? [
        'ภาพยนตร์สั้นเพื่อสังคม',
        'เนื้อหาเกี่ยวกับการคุ้มครองเด็ก',
        'ความร่วมมือกับมูลนิธิ',
        'การสร้างความตระหนักทางสังคม'
      ] : [
        'Social impact short film',
        'Child protection content',
        'Foundation collaboration',
        'Social awareness creation'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'สร้างความตระหนักในการคุ้มครองเด็ก' : 'Created awareness for child protection',
      videoUrl: 'https://www.youtube.com/watch?v=y2x09imI2S4',
      hasVideo: true
    },
    {
      id: 4,
      title: i18n.language === 'th' ? 'คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว' : 'Manual for Protecting Victims of Domestic Violence',
      description: i18n.language === 'th' 
        ? 'ออกแบบและจัดทำคู่มือการปฏิบัติงานสำหรับเจ้าหน้าที่ในการคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว' 
        : 'Designed and created operational manual for officers to protect victims of domestic violence',
      category: 'Manual Design & Development',
      year: '2565-2567',
      technologies: ['Manual Design', 'Infographic Design', 'Content Development', 'Policy Documentation'],
      features: i18n.language === 'th' ? [
        'ออกแบบคู่มือการปฏิบัติงาน',
        'พัฒนาเนื้อหาเชิงนโยบาย',
        'การจัดการข้อมูลทางกฎหมาย',
        'สื่อการเรียนรู้สำหรับเจ้าหน้าที่'
      ] : [
        'Operational manual design',
        'Policy content development',
        'Legal information management',
        'Learning materials for officers'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เป็นคู่มือมาตรฐานสำหรับหน่วยงาน' : 'Became standard manual for the organization',
      videoUrl: 'https://youtu.be/hikVR2zlErc',
      manualUrl: 'https://www.canva.com/design/DAGKhvuY3qk/WCUWKR6_CTETZ-sBhBcOCw/edit?utm_content=DAGKhvuY3qk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      hasMultipleLinks: true
    },
    {
      id: 5,
      title: 'Family DEE',
      description: i18n.language === 'th' 
        ? 'โครงการนวัตกรรมเพื่อสังคมรุ่นใหม่ Family DEE พัฒนาระบบดิจิทัลเพื่อสนับสนุนครอบครัวและการพัฒนาสังคม ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ ประจำปี 2566' 
        : 'Family DEE - New Generation Social Innovation project developing digital systems to support families and social development. Awarded New Generation Social Innovator 2023',
      category: 'Social Innovation',
      year: '2566 (2023)',
      technologies: ['Social Innovation', 'Digital Systems', 'Family Support Technology', 'Community Development'],
      features: i18n.language === 'th' ? [
        'พัฒนาแอปพลิเคชันด้านครอบครัวเพื่อเข้าถึงประชาชน',
        'เผยแพร่ภารกิจหน้าที่ของหน่วยงานให้ประชาชนได้ทราบ',
        'นวัตกรรมเพื่อสังคมรุ่นใหม่'
      ] : [
        'Develop family-focused mobile application for public access',
        'Disseminate agency missions and duties to the public',
        'New generation social innovation'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ ประจำปี 2566 จากกรมกิจการสตรีและสถาบันครอบครัว' : 'Awarded New Generation Social Innovator 2023 by Department of Women Affairs and Family Development',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/',
      hasVideo: true
    },
    {
      id: 6,
      title: i18n.language === 'th' ? 'รักอย่างไร ไร้ความรุนแรง' : 'How to Love Without Violence',
      description: i18n.language === 'th' 
        ? 'โครงการรณรงค์เพื่อสร้างความตระหนักเรื่องความรักที่ปราศจากความรุนแรง เนื่องในวันวาเลนไทน์ ปี 2566 ผ่านการสัมภาษณ์ผู้บริหารระดับสูง 3 ท่าน' 
        : 'Campaign project to raise awareness about love without violence on Valentine\'s Day 2023, featuring interviews with 3 high-level executives',
      category: 'Social Campaign & Video Production',
      year: '2566 (2023)',
      technologies: ['Video Interview', 'Social Campaign', 'Content Production', 'Public Relations', 'Digital Media'],
      features: i18n.language === 'th' ? [
        'สัมภาษณ์ผู้บริหารระดับสูง 3 ท่าน',
        'รณรงค์เรื่องความรักที่ปราศจากความรุนแรง',
        'เผยแพร่ในวันวาเลนไทน์'
      ] : [
        'Interviews with 3 high-level executives',
        'Campaign on love without violence',
        'Released on Valentine\'s Day'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'สร้างความตระหนักเรื่องความรักที่ปราศจากความรุนแรงในสังคม' : 'Created awareness about love without violence in society',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/2558191164345971/',
      hasVideo: true
    },
    {
      id: 7,
      title: i18n.language === 'th' ? 'สค. ประชุมหารือการนำ Dash Board มาใช้ในการเพิ่มประสิทธิภาพองค์กร' : 'DWF Meeting on Dashboard Implementation for Organizational Efficiency',
      description: i18n.language === 'th' 
        ? 'วันพุธที่ 26 ก.พ. 2568 นางสาวแรมรุ้ง วรวัธ อธิบดีกรมกิจการสตรีและสถาบันครอบครัว เป็นประธานการประชุมหารือการนำ DashBorad มาใช้ในการเพิ่มประสิทธิภาพองค์กรด้วยข้อมูล เช่น สถิติผู้รับบริการ การแจ้งเหตุความรุนแรง เป็นต้น' 
        : 'On Wednesday, Feb 26, 2025, Ms. Ramrung Worawat, DWF Director-General, chaired a meeting on implementing a dashboard to enhance organizational efficiency with data, covering service user stats, violence reports, and more.',
      category: i18n.language === 'th' ? 'กิจกรรมองค์กร' : 'Organizational Activity',
      year: '2025',
      technologies: ['Data Analytics', 'Dashboard', 'Organizational Development'],
      features: i18n.language === 'th' ? [
        'หารือการนำ Dash Board มาใช้',
        'เพิ่มประสิทธิภาพองค์กรด้วยข้อมูล',
        'วิเคราะห์สถิติสำคัญ (ผู้รับบริการ, ความรุนแรง)'
      ] : [
        'Discussion on Dashboard implementation',
        'Enhancing organizational efficiency with data',
        'Analysis of key statistics (service users, violence)'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เพื่อเพิ่มประสิทธิภาพการทำงานและบริการด้วยข้อมูล' : 'To enhance operational and service efficiency using data',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/dwfdashboardmeeting/486534512_961596016163594_3034625560110148954_n.jpg',
        '/images/dwfdashboardmeeting/486611042_961593456163850_7201093441034216817_n.jpg',
        '/images/dwfdashboardmeeting/486615567_961594606163735_2818629268890692522_n.jpg',
        '/images/dwfdashboardmeeting/486823213_961594789497050_3929535907241955901_n.jpg',
        '/images/dwfdashboardmeeting/486970987_961593066163889_4372237531411497978_n.jpg',
        '/images/dwfdashboardmeeting/487096293_961596072830255_4448136431070638540_n.jpg',
        '/images/dwfdashboardmeeting/487203841_961594816163714_2785878976021283359_n.jpg'
      ]
    },
    {
      id: 8,
      title: i18n.language === 'th' ? 'พม. โดย สค. เพิ่มทักษะและพัฒนาศักยภาพเครือข่ายด้านครอบครัว' : 'DWF Skill Development Workshop for Family Networks',
      description: i18n.language === 'th' 
        ? 'วันที่ 21 มิ.ย. 2565 นางรุ่งทิวา สุดแดน รองอธิบดี สค. เป็นประธานเปิดประชุมเชิงปฏิบัติการเพื่อพัฒนาศักยภาพทีมวิทยากรด้านครอบครัวระดับจังหวัด ในประเด็นการสร้างสัมพันธภาพในครอบครัว' 
        : 'On June 21, 2022, Ms. Rungtiwa Suddaen, DWF Deputy Director-General, chaired a workshop to develop the potential of provincial family facilitator teams on the topic of building family relationships.',
      category: i18n.language === 'th' ? 'การฝึกอบรมและพัฒนา' : 'Training & Development',
      year: '2022',
      technologies: ['Capacity Building', 'Training', 'Family Counseling'],
      features: i18n.language === 'th' ? [
        'พัฒนาศักยภาพทีมวิทยากรด้านครอบครัว',
        'สร้างสัมพันธภาพในครอบครัว (ทุกช่วงวัย)',
        'ถ่ายทอดองค์ความรู้สู่ชุมชน'
      ] : [
        'Develop potential of family facilitator teams',
        'Building family relationships (all ages)',
        'Transferring knowledge to the community'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'สร้างวิทยากรแกนนำระดับจังหวัดและชุมชน' : 'Created lead trainers at provincial and community levels',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/dwfnodeef/484934258_9297541330334720_8065886597238879653_n.jpg',
        '/images/dwfnodeef/484999819_9297541200334733_5422551071177174353_n.jpg',
        '/images/dwfnodeef/485007034_9297541150334738_7509964801765677290_n.jpg',
        '/images/dwfnodeef/485043951_9297541393668047_7415103137248974692_n.jpg',
        '/images/dwfnodeef/485083384_9297541320334721_1121098595655942598_n.jpg',
        '/images/dwfnodeef/485147065_9297541333668053_5154765394494570872_n.jpg',
        '/images/dwfnodeef/485347638_9297541163668070_1996364771399228229_n.jpg'
      ]
    },
    {
      id: 9,
      title: i18n.language === 'th' ? 'สค. ประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO) ครั้งที่ 3/2567' : 'DWF Digital Technology (DCIO) Working Group Meeting 3/2024',
      description: i18n.language === 'th' 
        ? 'วันที่ 4 ธ.ค. 2567 นางสุดา สุหลง รองอธิบดี สค. เป็นประธานการประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO) ครั้งที่ 3/2567 เพื่อขับเคลื่อนการดำเนินงานด้านเทคโนโลยีดิจิทัลของกรม' 
        : 'On Dec 4, 2024, Ms. Suda Sulong, DWF Deputy Director-General, chaired the 3rd DCIO Working Group meeting of 2024 to drive the department\'s digital technology operations.',
      category: i18n.language === 'th' ? 'การประชุมเทคโนโลยีดิจิทัล' : 'Digital Technology Meeting',
      year: '2024',
      technologies: ['Digital Transformation', 'IT Governance', 'DCIO'],
      features: i18n.language === 'th' ? [
        'ประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO)',
        'ขับเคลื่อนการดำเนินงานด้านดิจิทัล',
        'การประชุมร่วมผู้บริหารและคณะกรรมการ'
      ] : [
        'Digital Technology (DCIO) Working Group Meeting',
        'Driving digital operations',
        'Meeting with executives and committee'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เพื่อขับเคลื่อนการดำเนินงานด้านเทคโนโลยีดิจิทัลของกรม' : 'To drive the department\'s digital technology operations',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/DCIO3_67/482988963_953845130272016_5667888969399600593_n.jpg',
        '/images/DCIO3_67/484053362_953845236938672_5864024295462920978_n.jpg',
        '/images/DCIO3_67/484070376_953845013605361_671432291768833101_n.jpg',
        '/images/DCIO3_67/484075136_953844986938697_1860682503553711724_n.jpg',
        '/images/DCIO3_67/484364477_953844916938704_3090314937001110934_n.jpg',
        '/images/DCIO3_67/484417322_953845313605331_7275171304074259560_n.jpg',
        '/images/DCIO3_67/484429119_953844926938703_5595024848655442568_n.jpg',
        '/images/DCIO3_67/484440929_953845083605354_5522092208287998800_n.jpg',
        '/images/DCIO3_67/484452993_953844996938696_7121856769729067552_n.jpg',
        '/images/DCIO3_67/484496198_953845106938685_8579249162524510352_n.jpg',
        '/images/DCIO3_67/484803710_953845063605356_6776720133954498884_n.jpg',
        '/images/DCIO3_67/485004569_953845126938683_2636595370841698392_n.jpg',
        '/images/DCIO3_67/485287338_953845103605352_5800778047053668716_n.jpg'
      ]
    },
    {
      id: 10,
      title: i18n.language === 'th' ? 'ประชุมพิจารณาคัดเลือกผลงาน KM Awards 2565' : 'Meeting for KM Awards 2022 Selection',
      description: i18n.language === 'th' 
        ? 'วันที่ 20 ต.ค. 2565 นางรุ่งทิวา สุดแดน รองอธิบดี สค. เป็นประธานในการประชุมพิจารณาคัดเลือกผลงาน KM Awards เพื่อตัดสินรางวัลสุดยอดการจัดการความรู้เพื่อการพัฒนางาน ประจำปี 2565' 
        : 'On Oct 20, 2022, Ms. Rungtiwa Suddaen, DWF Deputy Director-General, chaired the meeting to select winners for the KM Awards for Work Development 2022.',
      category: i18n.language === 'th' ? 'การจัดการความรู้' : 'Knowledge Management',
      year: '2022',
      technologies: ['Knowledge Management', 'Video Edit', 'Award Committee', 'Organizational Development'],
      features: i18n.language === 'th' ? [
        'ประชุมพิจารณาคัดเลือกผลงาน KM Awards',
        'ตัดสินรางวัลสุดยอดการจัดการความรู้',
        'การมีส่วนร่วมของผู้ทรงคุณวุฒิภายนอก'
      ] : [
        'Meeting to select KM Awards winners',
        'Judging the top knowledge management awards',
        'Participation of external experts'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'คัดเลือกผลงาน KM Awards ประจำปี 2565' : 'Selected the KM Awards winners for 2022',
      hasVideo: true,
      hasGallery: true,
      videoUrl: 'https://youtu.be/gTugGrdx_-8?si=iF5G06iQ4HhO8a2c',
      imageUrls: [
        '/images/KM2022/486227610_9345949132160606_472504435968209862_n.jpg',
        '/images/KM2022/486319561_9345949012160618_5465287812274074946_n.jpg',
        '/images/KM2022/486321048_9345949165493936_5935360759504671054_n.jpg',
        '/images/KM2022/486362681_9345949108827275_4538486133328110565_n.jpg',
        '/images/KM2022/486871575_9345948948827291_2891017909214065781_n.jpg',
        '/images/KM2022/486938406_9345949052160614_5751753621326017245_n.jpg',
        '/images/KM2022/486960641_9345948942160625_1967625252154490108_n.jpg',
        '/images/KM2022/487095109_9345949125493940_7452602514173464303_n.jpg',
        '/images/KM2022/487278214_9345949122160607_5805834124564651601_n.jpg',
        '/images/KM2022/487323660_9345949092160610_5212052264705471595_n.jpg',
        '/images/KM2022/487379541_9345949128827273_7856025574113984520_n.jpg',
        '/images/KM2022/487476388_9345949042160615_2447075580380471026_n.jpg',
        '/images/KM2022/487483844_9345948935493959_7238286750977711538_n.jpg',
        '/images/KM2022/487503624_9345949058827280_6001464328012331809_n.jpg'
      ]
    },
    {
      id: 11,
      title: i18n.language === 'th' ? 'ประกวดรางวัลต้นแบบนวัตกรรมการทำงาน สค. 2566' : 'DWF Work Innovation Model Awards Contest 2023',
      description: i18n.language === 'th' 
        ? 'วันที่ 23 ส.ค. 2566 นางจินตนา จันทร์บำรุง อธิบดี สค. เป็นประธานเปิดการประกวดรางวัลต้นแบบนวัตกรรมการทำงานของ สค. ประจำปี 2566 (Creative Innovators) เพื่อสร้างนวัตกรด้านสังคมรุ่นใหม่' 
        : 'On Aug 23, 2023, Ms. Jintana Chanbamrung, DWF Director-General, opened the DWF Work Innovation Model Awards Contest 2023 (Creative Innovators) to foster new social innovators.',
      category: i18n.language === 'th' ? 'การประกวดนวัตกรรม' : 'Innovation Contest',
      year: '2023',
      technologies: ['Social Innovation', 'Creative Innovators', 'Contest Management'],
      features: i18n.language === 'th' ? [
        'ประกวดรางวัลต้นแบบนวัตกรรมการทำงาน',
        'สร้างนวัตกรด้านสังคมรุ่นใหม่',
        'พัฒนานวัตกรรมเชิงนโยบายและบริการ'
      ] : [
        'Contest for Work Innovation Model Awards',
        'Creating a new generation of social innovators',
        'Developing policy and service innovations'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'คัดเลือกและตัดสินผลงานต้นแบบนวัตกรรม ประจำปี 2566' : 'Selected and judged the model innovation works for 2023',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/DWFInnovation23/480782578_940587048264491_2013427237995406395_n.jpg',
        '/images/DWFInnovation23/480800418_940586778264518_33468162825338794_n.jpg',
        '/images/DWFInnovation23/480807635_940586911597838_5155494911154212560_n.jpg',
        '/images/DWFInnovation23/480814134_940587241597805_4005538070892001121_n.jpg',
        '/images/DWFInnovation23/480949892_940587181597811_1015367063527733649_n.jpg',
        '/images/DWFInnovation23/480984359_940587224931140_5085976636372863685_n.jpg',
        '/images/DWFInnovation23/481016200_940586891597840_2641976453046437482_n.jpg',
        '/images/DWFInnovation23/482022855_940587024931160_8686025873559690870_n (1).jpg',
        '/images/DWFInnovation23/482022855_940587024931160_8686025873559690870_n.jpg'
      ]
    },
    {
      id: 12,
      title: i18n.language === 'th' ? 'ประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล (Data Catalog)' : 'DWF Workshop on Data Catalog Creation',
      description: i18n.language === 'th' 
        ? 'วันที่ 28 ส.ค. 2566 นางสาวราภรณ์ พงศ์พนิตานนท์ ผู้เชี่ยวชาญเฉพาะด้านครอบครัว เป็นประธานเปิดประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล (Data Catalog) กรมกิจการสตรีและสถาบันครอบครัว' 
        : 'On Aug 28, 2023, Ms. Raporn Pongpanitanon, Family Specialist, chaired the opening of the DWF Data Catalog Workshop to build knowledge for personnel to efficiently create the department\'s data catalog system.',
      category: i18n.language === 'th' ? 'การจัดการข้อมูล' : 'Data Management',
      year: '2023',
      technologies: ['Data Catalog', 'Data Governance', 'Workshop'],
      features: i18n.language === 'th' ? [
        'ประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล (Data Catalog)',
        'เสริมสร้างความรู้ความเข้าใจให้บุคลากร',
        'ประยุกต์ใช้ในการจัดทำระบบบัญชีข้อมูล'
      ] : [
        'Workshop on creating a Data Catalog',
        'Enhancing knowledge for personnel',
        'Applying knowledge to create a data catalog system'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เพื่อให้บุคลากรสามารถจัดทำระบบบัญชีข้อมูลได้อย่างมีประสิทธิภาพ' : 'To enable personnel to create an efficient data catalog system',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/DataCatalog66/480871449_940599548263241_7841532354308943744_n.jpg',
        '/images/DataCatalog66/480996384_940599694929893_5019624841527991381_n.jpg',
        '/images/DataCatalog66/481166124_940599308263265_393465051326366534_n.jpg',
        '/images/DataCatalog66/482022123_940599328263263_2945789381790670417_n.jpg',
        '/images/DataCatalog66/482235236_940599704929892_957194470485433770_n.jpg'
      ]
    },
    {
      id: 13,
      title: i18n.language === 'th' ? 'พัฒนาทักษะนวัตกรเพื่อต่อยอดนวัตกรรมด้านสังคม' : 'Workshop on Innovator Skills for Social Innovation',
      description: i18n.language === 'th' 
        ? 'วันที่ 4 มี.ค. 2567 นายธนสุนทร สว่างสาลี อธิบดี สค. เป็นประธานการประชุมเชิงปฏิบัติการพัฒนาทักษะนวัตกรเพื่อต่อยอดนวัตกรรมด้านสังคมของกรมกิจการสตรีและสถาบันครอบครัว' 
        : 'On Mar 4, 2024, Mr. Thanasoon Savangsali, DWF Director-General, chaired a workshop on developing innovator skills to advance the department\'s social innovations.',
      category: i18n.language === 'th' ? 'พัฒนาทักษะนวัตกร' : 'Innovator Skills Workshop',
      year: '2024',
      technologies: ['Social Innovation', 'Skill Development', 'Workshop'],
      features: i18n.language === 'th' ? [
        'พัฒนาทักษะนวัตกรด้านสังคม',
        'ต่อยอดนวัตกรรมเชิงนโยบายและบริการ',
        'ส่งเสริมและพัฒนาศักยภาพบุคลากร'
      ] : [
        'Developing social innovator skills',
        'Advancing policy and service innovations',
        'Promoting and developing personnel potential'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เพื่อส่งเสริมให้บุคลากรเป็นนวัตกรด้านสังคม' : 'To promote personnel to become social innovators',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
        '/images/Innovation67/482223810_948500637473132_3179917503545264439_n.jpg',
        '/images/Innovation67/482229053_948500207473175_7177344178900389949_n.jpg',
        '/images/Innovation67/482233416_948500334139829_4363352406863144085_n.jpg'
      ]
    },
    {
      id: 14,
      title: i18n.language === 'th' ? 'อบรมพัฒนาศักยภาพ สร้างคนรุ่นใหม่ให้เป็นนวัตกรด้านสังคม' : 'Training: Creating a New Generation of Social Innovators',
      description: i18n.language === 'th' 
        ? 'วันที่ 5-7 ก.ค. 2566 นางจินตนา จันทร์บำรุง อธิบดี สค. เป็นประธานปิดการประชุมเชิงปฏิบัติการขับเคลื่อนนวัตกรด้านสังคมรุ่นใหม่ของ สค. ตามโครงการ Creating Innovators' 
        : 'On July 5-7, 2023, Ms. Jintana Chanbamrung, DWF Director-General, chaired the closing of the \'Creating Innovators\' workshop to foster a new generation of social innovators.',
      category: i18n.language === 'th' ? 'การฝึกอบรมนวัตกรรมสังคม' : 'Social Innovation Training',
      year: '2023',
      technologies: ['Social Innovation', 'Creating Innovators', 'Capacity Building'],
      features: i18n.language === 'th' ? [
        'อบรมพัฒนาศักยภาพนวัตกรด้านสังคม',
        'สร้างคนรุ่นใหม่ให้เป็นนวัตกร',
        'ต่อยอดนวัตกรรมเพื่อพัฒนางาน'
      ] : [
        'Training to develop social innovators\' potential',
        'Creating a new generation of innovators',
        'Extending innovation to develop work processes'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'ผู้เข้าร่วม 45 คน ต่อยอดโครงการเป็นนวัตกรรมของ สค.' : '45 participants will extend projects into DWF innovations',
      hasVideo: false,
      hasGallery: true,
      imageUrls: [
        '/images/InnovationTraining/357541761_18374266831042017_7852216339151780531_n.jpeg',
        '/images/InnovationTraining/357747300_18374266840042017_6038994410587202327_n.jpeg',
        '/images/InnovationTraining/358045888_18374266885042017_8489550039655865020_n.jpeg',
        '/images/InnovationTraining/358053450_18374266867042017_2986429128165889025_n.jpeg',
        '/images/InnovationTraining/358104496_18374266876042017_8321872936161796898_n.jpeg',
        '/images/InnovationTraining/480525047_936652211991308_2480745683635461725_n.jpg',
        '/images/InnovationTraining/480570472_936652071991322_8702232512819397566_n.jpg',
        '/images/InnovationTraining/480749667_937265605263302_1949644636963246910_n.jpg',
        '/images/InnovationTraining/480798532_937265855263277_2498271739579143704_n.jpg',
        '/images/InnovationTraining/480799571_937265791929950_8587127005662650622_n.jpg'
      ]
    },
    {
      id: 15,
      title: 'False Awakening',
      description: i18n.language === 'th' 
        ? 'เป็นส่วนหนึ่งของวิชา ศิลปะการกำกับภาพยนตร์ ของมหาวิทยาลัยหอการค้าไทย' 
        : 'Part of the Cinematography course at the University of the Thai Chamber of Commerce',
      category: 'University Project',
      year: '2020',
      technologies: ['cameraman', 'videoeditor'],
      features: i18n.language === 'th' ? [
        'การกำกับภาพยนตร์',
        'การตัดต่อวิดีโอ',
        'การสร้างสรรค์ผลงานภาพยนตร์'
      ] : [
        'Cinematography',
        'Video Editing',
        'Film Production'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เป็นโปรเจคการทำหนังตัวสุดท้ายของการศึกษา' : 'Final film project of the study',
      videoUrl: 'https://youtu.be/FC4H7cu63Tc',
      hasVideo: true,
      hasGallery: true,
      imageUrls: [
        '/images/FalseAwakening/131243678_2637519289872224_2151493129302845335_n.jpg',
        '/images/FalseAwakening/131539649_2637519596538860_6199422370877159104_n.jpg',
        '/images/FalseAwakening/131573259_2637519306538889_2399182084019724174_n.jpg',
        '/images/FalseAwakening/131581409_2637519236538896_2744856193773991783_n.jpg',
        '/images/FalseAwakening/131659018_2637519386538881_9097776920277172254_n.jpg',
        '/images/FalseAwakening/131661254_2637519623205524_8642529000025464668_n.jpg',
        '/images/FalseAwakening/131703004_2637519363205550_4314139049734956469_n.jpg',
        '/images/FalseAwakening/131892513_2637519466538873_4628362908850646791_n.jpg',
        '/images/FalseAwakening/131962091_2637519556538864_8843054073306856770_n.jpg',
        '/images/FalseAwakening/131971652_2639255463031940_1604717339990091224_n.jpg',
        '/images/FalseAwakening/132011885_2637519333205553_7435113349207626130_n.jpg',
        '/images/FalseAwakening/132018401_2637519156538904_4002854742359412772_n.jpg',
        '/images/FalseAwakening/132021649_2637519459872207_5288918127985007077_n.jpg',
        '/images/FalseAwakening/132069489_2640924229531730_8884750092089145795_n.jpg'
      ]
    },
    {
      id: 16,
      title: i18n.language === 'th' ? 'Recap งานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว ประจำปี 2565' : 'Recap of National Elderly Day and Family Day 2022',
      description: i18n.language === 'th' 
        ? 'สรุปภาพรวมกิจกรรมงานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว ประจำปี 2565 ผ่านการผลิตวิดีโอรีแคปที่นำเสนอไฮไลท์และความประทับใจจากงานสำคัญทั้งสองวัน' 
        : 'Comprehensive recap of National Elderly Day and Family Day activities in 2022, featuring video production that showcases highlights and memorable moments from both significant events',
      category: i18n.language === 'th' ? 'การผลิตสื่อวิดีโอ' : 'Video Production',
      year: '2022',
      technologies: ['Video Edit', 'Content Creation', 'Event Documentation', 'Post-Production'],
      features: i18n.language === 'th' ? [
        'ผลิตวิดีโอสรุปกิจกรรมสำคัญ',
        'บันทึกและรวบรวมไฮไลท์จากงาน',
        'การตัดต่อและนำเสนอเนื้อหาที่น่าสนใจ',
        'สร้างความประทับใจแก่ผู้ชม'
      ] : [
        'Produced recap video of major activities',
        'Captured and compiled event highlights',
        'Video editing and compelling content presentation',
        'Created memorable experiences for viewers'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'เผยแพร่ความสำคัญของวันผู้สูงอายุและครอบครัวสู่สาธารณะ' : 'Promoted the importance of Elderly and Family Days to the public',
      hasVideo: true,
      videoUrl: 'https://youtu.be/v--_EH1Ho-Y?si=4Cdp3-VufhOPeySH'
    },
    {
      id: 17,
      title: i18n.language === 'th' ? 'World Food Day 2021 ร่วมกับมูลนิธิ SOS Thailand' : 'World Food Day 2021 in Collaboration with SOS Children\'s Villages Thailand',
      description: i18n.language === 'th' 
        ? 'โครงการร่วมมือกับมูลนิธิ SOS Children\'s Villages Thailand ในวันอาหารโลก 2021 เพื่อสร้างความตระหนักเรื่องความมั่นคงทางอาหารและการดูแลเด็กกำพร้า ผ่านการผลิตเนื้อหาวิดีโอที่สร้างแรงบันดาลใจ' 
        : 'Collaborative project with SOS Children\'s Villages Thailand for World Food Day 2021, raising awareness about food security and orphan care through inspiring video content production',
      category: i18n.language === 'th' ? 'โครงการเพื่อสังคม' : 'Social Impact Project',
      year: '2021',
      technologies: ['Video Edit', 'Social Campaign', 'Content Creation', 'NGO Collaboration'],
      features: i18n.language === 'th' ? [
        'ร่วมมือกับมูลนิธิ SOS Thailand',
        'สร้างความตระหนักเรื่องความมั่นคงทางอาหาร',
        'ผลิตเนื้อหาวิดีโอเพื่อสังคม',
        'รณรงค์เพื่อเด็กกำพร้าและด้อยโอกาส'
      ] : [
        'Collaborated with SOS Children\'s Villages Thailand',
        'Raised awareness about food security',
        'Produced social impact video content',
        'Campaigned for orphans and underprivileged children'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'สร้างความตระหนักและการมีส่วนร่วมในวันอาหารโลกผ่านสื่อดิจิทัล' : 'Created awareness and engagement for World Food Day through digital media',
      hasVideo: true,
      videoUrl: 'https://youtu.be/udOIlzMg_fU?si=x3nZnejgfzbzGK2e'
    },
    {
      id: 18,
      title: i18n.language === 'th' ? 'พม.ภูเก็ตลงพื้นที่แจกอาหารแห้งและของใช้จำเป็นให้ชาวชุมชนไทยใหม่ราไวย์ จ.ภูเก็ต' : 'Ministry of Social Development and Human Security Phuket Field Mission: Food and Essential Supplies Distribution to Thai Mai Community, Rawai, Phuket',
      description: i18n.language === 'th' 
        ? 'กิจกรรมลงพื้นที่ของ พม. ภูเก็ต ในการแจกอาหารแห้งและของใช้จำเป็นให้แก่ชาวชุมชนไทยใหม่ราไวย์ จังหวัดภูเก็ต เพื่อช่วยเหลือประชาชนในช่วงสถานการณ์ยากลำบาก พร้อมการผลิตสื่อประชาสัมพันธ์เผยแพร่กิจกรรม' 
        : 'Ministry of Social Development and Human Security Phuket field mission to distribute dried food and essential supplies to the Thai Mai community in Rawai, Phuket, providing assistance during difficult times with comprehensive media production and public relations coverage',
      category: i18n.language === 'th' ? 'กิจกรรมลงพื้นที่เพื่อสังคม' : 'Community Outreach Activity',
      year: '2021',
      technologies: ['Video Edit', 'ประชาสัมพันธ์', 'Field Documentation', 'Community Service'],
      features: i18n.language === 'th' ? [
        'ลงพื้นที่แจกอาหารแห้งและของใช้จำเป็น',
        'ช่วยเหลือชุมชนไทยใหม่ราไวย์ จ.ภูเก็ต',
        'การผลิตสื่อประชาสัมพันธ์กิจกรรม',
        'เผยแพร่การช่วยเหลือประชาชน'
      ] : [
        'Distributed dried food and essential supplies on-site',
        'Assisted Thai Mai community in Rawai, Phuket',
        'Produced public relations media content',
        'Promoted community assistance initiatives'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'ช่วยเหลือชุมชนในช่วงสถานการณ์ยากลำบาก และเผยแพร่การดำเนินงานของรัฐ' : 'Provided community assistance during difficult times and promoted government initiatives',
      hasVideo: true,
      videoUrl: 'https://youtu.be/iO2Kv1p7UPI'
    },
    {
      id: 19,
      title: i18n.language === 'th' ? 'CSR ร่วมกับ HarmonyWorld.fr ณ บ้านเด็กตะวันฉาย จ.ภูเก็ต' : 'CSR Partnership with HarmonyWorld.fr at Tawan Chai Children\'s Home, Phuket',
      description: i18n.language === 'th' 
        ? 'โครงการ Corporate Social Responsibility ร่วมกับองค์กร HarmonyWorld.fr จากประเทศฝรั่งเศส ในการช่วยเหลือและพัฒนาบ้านเด็กตะวันฉาย จังหวัดภูเก็ต ผ่านการบริจาคและกิจกรรมเพื่อสวัสดิการเด็กกำพร้า พร้อมการผลิตสื่อเผยแพร่กิจกรรม CSR' 
        : 'Corporate Social Responsibility project in partnership with HarmonyWorld.fr from France, supporting and developing Tawan Chai Children\'s Home in Phuket through donations and activities for orphan welfare, with comprehensive media production for CSR promotion',
      category: i18n.language === 'th' ? 'โครงการ CSR' : 'CSR Project',
      year: 'Not specified',
      technologies: ['Video Edit', 'ประชาสัมพันธ์', 'CSR Communication', 'International Collaboration'],
      features: i18n.language === 'th' ? [
        'ร่วมมือกับองค์กรต่างชาติ HarmonyWorld.fr',
        'ช่วยเหลือบ้านเด็กกำพร้าตะวันฉาย จ.ภูเก็ต',
        'จัดกิจกรรม CSR เพื่อสวัสดิการเด็ก',
        'ผลิตสื่อประชาสัมพันธ์โครงการ CSR'
      ] : [
        'Collaborated with international organization HarmonyWorld.fr',
        'Assisted Tawan Chai orphanage in Phuket',
        'Organized CSR activities for children\'s welfare',
        'Produced CSR project promotional media'
      ],
      status: 'completed',
      impact: i18n.language === 'th' ? 'สร้างการร่วมมือระหว่างประเทศเพื่อการกุศล และเผยแพร่กิจกรรม CSR' : 'Established international collaboration for charity and promoted CSR activities',
      hasVideo: true,
      videoUrl: 'https://youtu.be/Vye6sB9WMXc'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      completed: i18n.language === 'th' ? 'เสร็จสิ้น' : 'Completed',
      ongoing: i18n.language === 'th' ? 'กำลังดำเนินการ' : 'Ongoing',
      planning: i18n.language === 'th' ? 'วางแผน' : 'Planning'
    };
    return statusMap[status] || status;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {i18n.language === 'th' 
              ? 'ชุดโครงการที่ได้พัฒนาและดำเนินการในด้าน Digital Communications และ Creative Production'
              : 'A collection of projects developed and executed in Digital Communications and Creative Production'
            }
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.slice(0, showAll ? projects.length : 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 group"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-500 font-medium">{project.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  <Award size={12} className="mr-1" />
                  {getStatusText(project.status)}
                </span>
              </div>

              {/* Project Title & Description */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                {project.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary-100 text-secondary-700"
                    >
                      <Tag size={10} className="mr-1" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {i18n.language === 'th' ? 'คุณสมบัติหลัก:' : 'Key Features:'}
                </h4>
                <ul className="space-y-1">
                  {project.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact/Result */}
              <div className="mb-6 p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-primary-600" />
                  <span className="text-sm font-semibold text-primary-800">
                    {i18n.language === 'th' ? 'ผลลัพธ์:' : 'Impact:'}
                  </span>
                </div>
                <p className="text-sm text-primary-700 mt-1">{project.impact}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {project.hasMultipleLinks ? (
                  <>
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.543 6.498c-.232-.86-.914-1.542-1.774-1.774C18.26 4.5 12 4.5 12 4.5S5.74 4.5 4.231 4.724c-.86.232-1.542.914-1.774 1.774C2.5 7.74 2.5 12 2.5 12s0 4.26.224 5.769c.232.86.914 1.542 1.774 1.774C5.74 19.5 12 19.5 12 19.5s6.26 0 7.769-.224c.86-.232 1.542-.914 1.774-1.774C21.5 16.26 21.5 12 21.5 12s0-4.26-.224-5.769zM9.999 15.499V8.501L15.499 12l-5.5 3.499z"/>
                      </svg>
                      <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'View Video'}</span>
                    </a>
                    <a
                      href={project.manualUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                    >
                      <ExternalLink size={14} />
                      <span>{i18n.language === 'th' ? 'อ่านคู่มือ' : 'Read Manual'}</span>
                    </a>
                  </>
                ) : project.hasVideo && project.hasGallery && project.videoUrl && project.imageUrls ? (
                  <>
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.543 6.498c-.232-.86-.914-1.542-1.774-1.774C18.26 4.5 12 4.5 12 4.5S5.74 4.5 4.231 4.724c-.86.232-1.542.914-1.774 1.774C2.5 7.74 2.5 12 2.5 12s0 4.26.224 5.769c.232.86.914 1.542 1.774 1.774C5.74 19.5 12 19.5 12 19.5s6.26 0 7.769-.224c.86-.232 1.542-.914 1.774-1.774C21.5 16.26 21.5 12 21.5 12s0-4.26-.224-5.769zM9.999 15.499V8.501L15.499 12l-5.5 3.499z"/>
                      </svg>
                      <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'View Video'}</span>
                    </a>
                    <button
                      onClick={() => setGalleryImages(project.imageUrls)}
                      className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                    >
                      <Image size={14} />
                      <span>{i18n.language === 'th' ? 'ดูแกลเลอรี' : 'View Gallery'}</span>
                    </button>
                  </>
                ) : project.hasVideo && project.videoUrl ? (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.543 6.498c-.232-.86-.914-1.542-1.774-1.774C18.26 4.5 12 4.5 12 4.5S5.74 4.5 4.231 4.724c-.86.232-1.542.914-1.774 1.774C2.5 7.74 2.5 12 2.5 12s0 4.26.224 5.769c.232.86.914 1.542 1.774 1.774C5.74 19.5 12 19.5 12 19.5s6.26 0 7.769-.224c.86-.232 1.542-.914 1.774-1.774C21.5 16.26 21.5 12 21.5 12s0-4.26-.224-5.769zM9.999 15.499V8.501L15.499 12l-5.5 3.499z"/>
                    </svg>
                    <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'View Video'}</span>
                  </a>
                ) : project.hasGallery && project.imageUrls ? (
                  <button
                    onClick={() => setGalleryImages(project.imageUrls)}
                    className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                  >
                    <Image size={14} />
                    <span>{i18n.language === 'th' ? 'ดูแกลเลอรี' : 'View Gallery'}</span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center">
                    <ExternalLink size={14} />
                    <span>{t('projects.viewMore')}</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See More/Less Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{showAll ? t('projects.seeLess') : t('projects.seeMore')}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
            <p className="text-sm text-gray-500 mt-3">
              {showAll 
                ? i18n.language === 'th' 
                  ? `แสดง ${projects.length} ผลงานทั้งหมด` 
                  : `Showing all ${projects.length} projects`
                : i18n.language === 'th' 
                  ? `แสดง 6 จาก ${projects.length} ผลงาน` 
                  : `Showing 6 of ${projects.length} projects`
              }
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {i18n.language === 'th' ? 'มีโครงการที่น่าสนใจ?' : 'Have an Interesting Project?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {i18n.language === 'th' 
                ? 'ยินดีรับฟังและปรึกษาเกี่ยวกับโครงการใหม่ๆ ที่ท้าทาย'
                : 'Let\'s discuss your next challenging project together'
              }
            </p>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              {i18n.language === 'th' ? 'เริ่มคุยกันเลย' : 'Let\'s Talk'}
            </button>
          </div>
        </motion.div>
      </div>
      {galleryImages && (
        <GalleryModal images={galleryImages} onClose={() => setGalleryImages(null)} />
      )}
    </section>
  );
};

export default Projects;
