'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Image, Play, Info, ChevronDown, X } from 'lucide-react';
import GalleryModal from './GalleryModal';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [galleryImages, setGalleryImages] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Complete projects data - 21 projects
  const allProjects = [
    {
      id: 1,
      title: 'Donmuang Tollway Contest 2017',
      titleTh: 'การประกวด Donmuang Tollway Contest 2017',
      description: 'Contest project "Father\'s say Better Way" showcasing father\'s role in family and society.',
      descriptionTh: 'โครงการประกวด "Father\'s say Better Way" แสดงบทบาทของพ่อในครอบครัวและสังคม',
      category: 'contest',
      categoryTh: 'การประกวด',
      year: '2017',
      type: 'video',
      videoUrl: 'https://youtu.be/9UOp_EY1Q4w',
      thumbnail: 'https://img.youtube.com/vi/9UOp_EY1Q4w/maxresdefault.jpg'
    },
    {
      id: 2,
      title: 'National Elderly Day Video 2018',
      titleTh: 'วิดีโอวันผู้สูงอายุแห่งชาติ 2561',
      description: 'Video production for National Elderly Day 2018 - Selected as top 10 final works.',
      descriptionTh: 'ผลิตวิดีโอเพื่อสืบสานวันผู้สูงอายุแห่งชาติ - เข้ารอบ 10 ผลงานสุดท้าย',
      category: 'video',
      categoryTh: 'วิดีโอ',
      year: '2018',
      type: 'video',
      videoUrl: 'https://youtu.be/6obe8PQfu3U',
      thumbnail: 'https://img.youtube.com/vi/6obe8PQfu3U/maxresdefault.jpg'
    },
    {
      id: 3,
      title: 'Short Film "You Can Be A Child Guardian"',
      titleTh: 'ภาพยนตร์สั้น "คุณก็เป็นผู้พิทักษ์เด็กได้"',
      description: 'Short film contest for child protection by Child Protection Center Foundation.',
      descriptionTh: 'ประกวดภาพยนตร์สั้นเพื่อส่งเสริมการคุ้มครองเด็ก โดยมูลนิธิศูนย์พิทักษ์เด็ก',
      category: 'video',
      categoryTh: 'วิดีโอ',
      year: '2020',
      type: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=y2x09imI2S4',
      thumbnail: 'https://img.youtube.com/vi/y2x09imI2S4/maxresdefault.jpg'
    },
    {
      id: 4,
      title: 'Family Protection Manual',
      titleTh: 'คู่มือการปฏิบัติงานคุ้มครองครอบครัว',
      description: 'Manual for protecting victims of domestic violence - comprehensive guide for officers.',
      descriptionTh: 'คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว',
      category: 'manual',
      categoryTh: 'คู่มือ',
      year: '2022-2024',
      type: 'multiple',
      videoUrl: 'https://youtu.be/hikVR2zlErc',
      manualUrl: 'https://www.canva.com/design/DAGKhvuY3qk/WCUWKR6_CTETZ-sBhBcOCw/edit',
      thumbnail: 'https://img.youtube.com/vi/hikVR2zlErc/maxresdefault.jpg'
    },
    {
      id: 5,
      title: 'Family DEE',
      titleTh: 'Family DEE',
      description: 'New Generation Social Innovation project - Awarded New Generation Social Innovator 2023.',
      descriptionTh: 'โครงการนวัตกรรมเพื่อสังคมรุ่นใหม่ - ได้รับรางวัลนวัตกรด้านสังคมรุ่นใหม่ 2566',
      category: 'innovation',
      categoryTh: 'นวัตกรรม',
      year: '2023',
      type: 'video',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/1088651412200819/',
      thumbnail: 'https://placehold.co/400x300/4f46e5/ffffff?text=Family+DEE+2023'
    },
    {
      id: 6,
      title: 'How to Love Without Violence',
      titleTh: 'รักอย่างไร ไร้ความรุนแรง',
      description: 'Campaign to raise awareness about love without violence on Valentine\'s Day 2023.',
      descriptionTh: 'รณรงค์สร้างความตระหนักเรื่องความรักปราศจากความรุนแรง วันวาเลนไทน์ 2566',
      category: 'campaign',
      categoryTh: 'รณรงค์',
      year: '2023',
      type: 'video',
      videoUrl: 'https://www.facebook.com/sorkor026596776/videos/2558191164345971/',
      thumbnail: 'https://placehold.co/400x300/e5e7eb/6b7280?text=How+to+Love+Without+Violence'
    },
    {
      id: 7,
      title: 'DWF Dashboard Meeting 2025',
      titleTh: 'ประชุมหารือการนำแดชบอร์ดมาใช้ สค. 2568',
      description: 'Meeting on implementing dashboard to enhance organizational efficiency with data.',
      descriptionTh: 'การประชุมหารือการนำแดชบอร์ดมาใช้ในการเพิ่มประสิทธิภาพองค์กรด้วยข้อมูล',
      category: 'activity',
      categoryTh: 'กิจกรรม',
      year: '2025',
      type: 'gallery',
      thumbnail: '/images/dwfdashboardmeeting/486534512_961596016163594_3034625560110148954_n.jpg',
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
      title: 'Family Networks Training Workshop',
      titleTh: 'อบรมพัฒนาศักยภาพเครือข่ายด้านครอบครัว',
      description: 'Workshop to develop the potential of provincial family facilitator teams.',
      descriptionTh: 'ประชุมเชิงปฏิบัติการเพื่อพัฒนาศักยภาพทีมวิทยากรด้านครอบครัวระดับจังหวัด',
      category: 'training',
      categoryTh: 'การฝึกอบรม',
      year: '2022',
      type: 'gallery',
      thumbnail: '/images/dwfnodeef/484934258_9297541330334720_8065886597238879653_n.jpg',
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
      title: 'Digital Technology Meeting 2024',
      titleTh: 'ประชุม DCIO ครั้งที่ 3/2567',
      description: '3rd DCIO Working Group meeting of 2024 to drive digital technology operations.',
      descriptionTh: 'การประชุมคณะทำงานเทคโนโลยีดิจิทัล (DCIO) ครั้งที่ 3/2567',
      category: 'activity',
      categoryTh: 'กิจกรรม',
      year: '2024',
      type: 'gallery',
      thumbnail: '/images/DCIO3_67/482988963_953845130272016_5667888969399600593_n.jpg',
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
      title: 'KM Awards Contest 2022',
      titleTh: 'การประกวด KM Awards ประจำปี 2565',
      description: 'Knowledge Management Awards Contest to discover and honor excellent KM works.',
      descriptionTh: 'การจัดการประกวด KM Awards เพื่อค้นหาและยกย่องผลงานการจัดการความรู้ที่เป็นเลิศ',
      category: 'contest',
      categoryTh: 'การประกวด',
      year: '2022',
      type: 'mixed',
      videoUrl: 'https://youtu.be/gTugGrdx_-8?si=iF5G06iQ4HhO8a2c',
      thumbnail: 'https://img.youtube.com/vi/gTugGrdx_-8/maxresdefault.jpg',
      imageUrls: [
        '/images/KM2022/486227610_9345949132160606_472504435968209862_n.jpg',
        '/images/KM2022/486319561_9345949012160618_5465287812274074946_n.jpg',
        '/images/KM2022/486321048_9345949165493936_5935360759504671054_n.jpg',
        '/images/KM2022/486362681_9345949108827275_4538486133328110565_n.jpg',
        '/images/KM2022/486871575_9345948948827291_2891017909214065781_n.jpg'
      ]
    },
    {
      id: 11,
      title: 'Data Catalog Workshop',
      titleTh: 'ประชุมเชิงปฏิบัติการจัดทำบัญชีข้อมูล',
      description: 'Workshop to create understanding and develop skills in creating data catalog.',
      descriptionTh: 'การจัดประชุมเชิงปฏิบัติการเพื่อสร้างความเข้าใจและพัฒนาทักษะการจัดทำบัญชีข้อมูล',
      category: 'training',
      categoryTh: 'การฝึกอบรม',
      year: '2023',
      type: 'gallery',
      thumbnail: '/images/DataCatalog66/480871449_940599548263241_7841532354308943744_n.jpg',
      imageUrls: [
        '/images/DataCatalog66/480871449_940599548263241_7841532354308943744_n.jpg',
        '/images/DataCatalog66/480996384_940599694929893_5019624841527991381_n.jpg',
        '/images/DataCatalog66/481166124_940599308263265_393465051326366534_n.jpg',
        '/images/DataCatalog66/482022123_940599328263263_2945789381790670417_n.jpg',
        '/images/DataCatalog66/482235236_940599704929892_957194470485433770_n.jpg'
      ]
    },
    {
      id: 12,
      title: 'Social Innovation Skills Workshop',
      titleTh: 'พัฒนาทักษะนวัตกรเพื่อต่อยอดนวัตกรรมด้านสังคม',
      description: 'Workshop to develop innovator skills for personnel to extend social innovations.',
      descriptionTh: 'การจัดอบรมเชิงปฏิบัติการเพื่อพัฒนาทักษะนวัตกรให้กับบุคลากร',
      category: 'training',
      categoryTh: 'การฝึกอบรม',
      year: '2024',
      type: 'gallery',
      thumbnail: '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
      imageUrls: [
        '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
        '/images/Innovation67/482223810_948500637473132_3179917503545264439_n.jpg',
        '/images/Innovation67/482229053_948500207473175_7177344178900389949_n.jpg',
        '/images/Innovation67/482233416_948500334139829_4363352406863144085_n.jpg'
      ]
    },
    {
      id: 13,
      title: 'Creating New Generation Social Innovators',
      titleTh: 'อบรมพัฒนาศักยภาพ สร้างคนรุ่นใหม่ให้เป็นนวัตกรด้านสังคม',
      description: 'Training program to develop potential and inspire new generation social innovators.',
      descriptionTh: 'โครงการอบรมเพื่อพัฒนาศักยภาพและสร้างแรงบันดาลใจให้คนรุ่นใหม่เป็นนวัตกรด้านสังคม',
      category: 'training',
      categoryTh: 'การฝึกอบรม',
      year: '2023',
      type: 'gallery',
      thumbnail: '/images/InnovationTraining/357541761_18374266831042017_7852216339151780531_n.jpeg',
      imageUrls: [
        '/images/InnovationTraining/357541761_18374266831042017_7852216339151780531_n.jpeg',
        '/images/InnovationTraining/357747300_18374266840042017_6038994410587202327_n.jpeg',
        '/images/InnovationTraining/358045888_18374266885042017_8489550039655865020_n.jpeg',
        '/images/InnovationTraining/358053450_18374266867042017_2986429128165889025_n.jpeg',
        '/images/InnovationTraining/358104496_18374266876042017_8321872936161796898_n.jpeg',
        '/images/InnovationTraining/480525047_936652211991308_2480745683635461725_n.jpg',
        '/images/InnovationTraining/480570472_936652071991322_8702232512819397566_n.jpg'
      ]
    },
    {
      id: 14,
      title: 'Short Film "False Awakening"',
      titleTh: 'ภาพยนตร์สั้น "False Awakening"',
      description: 'Final project short film reflecting dreams and reality of life through meaningful storytelling.',
      descriptionTh: 'ภาพยนตร์สั้นเรื่อง "False Awakening" ผลงานสุดท้ายในการศึกษา สะท้อนถึงความฝันและความจริงของชีวิต',
      category: 'video',
      categoryTh: 'วิดีโอ',
      year: '2021',
      type: 'mixed',
      videoUrl: 'https://youtu.be/FC4H7cu63Tc',
      thumbnail: 'https://img.youtube.com/vi/FC4H7cu63Tc/maxresdefault.jpg',
      imageUrls: [
        '/images/FalseAwakening/131243678_2637519289872224_2151493129302845335_n.jpg',
        '/images/FalseAwakening/131539649_2637519596538860_6199422370877159104_n.jpg',
        '/images/FalseAwakening/131573259_2637519306538889_2399182084019724174_n.jpg',
        '/images/FalseAwakening/131581409_2637519236538896_2744856193773991783_n.jpg',
        '/images/FalseAwakening/131659018_2637519386538881_9097776920277172254_n.jpg'
      ]
    },
    {
      id: 15,
      title: 'Cybersecurity Infographic',
      titleTh: 'อินโฟกราฟิกความปลอดภัยทางไซเบอร์',
      description: 'Design and creation of cybersecurity infographic to educate and raise awareness.',
      descriptionTh: 'การออกแบบและสร้างสรรค์อินโฟกราฟิกเพื่อให้ความรู้เรื่องความปลอดภัยทางไซเบอร์',
      category: 'design',
      categoryTh: 'ออกแบบ',
      year: '2023',
      type: 'gallery',
      thumbnail: '/images/InfographicCyber/cybersecinfo.jpg',
      imageUrls: [
        '/images/InfographicCyber/cybersecinfo.jpg',
        '/images/InfographicCyber/Pink and Purple 3D Business Plan Cover Page A4 Document.jpg'
      ]
    },
    {
      id: 16,
      title: 'National Elderly & Family Day Recap 2022',
      titleTh: 'Recap งานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว 2565',
      description: 'Comprehensive recap video of National Elderly Day and Family Day activities in 2022.',
      descriptionTh: 'สรุปภาพรวมกิจกรรมงานวันผู้สูงอายุแห่งชาติและวันแห่งครอบครัว ประจำปี 2565',
      category: 'video',
      categoryTh: 'วิดีโอ',
      year: '2022',
      type: 'video',
      videoUrl: 'https://youtu.be/v--_EH1Ho-Y?si=4Cdp3-VufhOPeySH',
      thumbnail: 'https://img.youtube.com/vi/v--_EH1Ho-Y/maxresdefault.jpg'
    },
    {
      id: 17,
      title: 'World Food Day 2021 with SOS Thailand',
      titleTh: 'World Food Day 2021 ร่วมกับมูลนิธิ SOS Thailand',
      description: 'Collaborative project with SOS Children\'s Villages Thailand for World Food Day 2021.',
      descriptionTh: 'โครงการร่วมมือกับมูลนิธิ SOS Children\'s Villages Thailand ในวันอาหารโลก 2021',
      category: 'social',
      categoryTh: 'โครงการสังคม',
      year: '2021',
      type: 'video',
      videoUrl: 'https://youtu.be/udOIlzMg_fU?si=x3nZnejgfzbzGK2e',
      thumbnail: 'https://img.youtube.com/vi/udOIlzMg_fU/maxresdefault.jpg'
    },
    {
      id: 18,
      title: 'Community Food Distribution Phuket',
      titleTh: 'พม.ภูเก็ตลงพื้นที่แจกอาหารแห้งและของใช้จำเป็น',
      description: 'Ministry field mission to distribute food and essential supplies to Thai Mai community, Rawai, Phuket.',
      descriptionTh: 'กิจกรรมลงพื้นที่ของ พม. ภูเก็ต ในการแจกอาหารแห้งและของใช้จำเป็นให้แก่ชาวชุมชนไทยใหม่ราไวย์',
      category: 'social',
      categoryTh: 'โครงการสังคม',
      year: '2021',
      type: 'video',
      videoUrl: 'https://youtu.be/iO2Kv1p7UPI',
      thumbnail: 'https://img.youtube.com/vi/iO2Kv1p7UPI/maxresdefault.jpg'
    },
    {
      id: 19,
      title: 'CSR with HarmonyWorld.fr at Tawan Chai',
      titleTh: 'CSR ร่วมกับ HarmonyWorld.fr ณ บ้านเด็กตะวันฉาย',
      description: 'Corporate Social Responsibility project in partnership with HarmonyWorld.fr from France.',
      descriptionTh: 'โครงการ Corporate Social Responsibility ร่วมกับองค์กร HarmonyWorld.fr จากประเทศฝรั่งเศส',
      category: 'csr',
      categoryTh: 'CSR',
      year: '2021',
      type: 'video',
      videoUrl: 'https://youtu.be/Vye6sB9WMXc',
      thumbnail: 'https://img.youtube.com/vi/Vye6sB9WMXc/maxresdefault.jpg'
    },
    {
      id: 20,
      title: 'Work Innovation Awards 2024',
      titleTh: 'ประกวดรางวัลต้นแบบนวัตกรรมการทำงาน สค. 2567',
      description: 'DWF Work Innovation Model Awards Contest 2024 to promote work innovation among personnel.',
      descriptionTh: 'การจัดการประกวดรางวัลต้นแบบนวัตกรรมการทำงานของกรมกิจการสตรีและสถาบันครอบครัว',
      category: 'innovation',
      categoryTh: 'นวัตกรรม',
      year: '2024',
      type: 'gallery',
      thumbnail: '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
      imageUrls: [
        '/images/Innovation67/482018975_948500257473170_3055490125438484791_n.jpg',
        '/images/Innovation67/482223810_948500637473132_3179917503545264439_n.jpg',
        '/images/Innovation67/482229053_948500207473175_7177344178900389949_n.jpg',
        '/images/Innovation67/482233416_948500334139829_4363352406863144085_n.jpg'
      ]
    },
    {
      id: 23,
      title: 'PR Efficiency Seminar 2026',
      titleTh: 'โครงการสัมมนาเพื่อเพิ่มประสิทธิภาพผู้ปฏิบัติงานด้านประชาสัมพันธ์ ประจำปี 2569',
      description: 'Seminar project to enhance the efficiency of public relations officers, organized by the Bangkok Metropolitan Administration Public Relations Department.',
      descriptionTh: 'โครงการสัมมนาเพื่อเพิ่มประสิทธิภาพผู้ปฏิบัติงานด้านประชาสัมพันธ์ ประจำปี 2569 จัดโดย สำนักประชาสัมพันธ์ กรุงเทพมหานคร',
      category: 'training',
      categoryTh: 'การฝึกอบรม',
      year: '2569',
      type: 'gallery',
      thumbnail: '/images/PRSeminar2569/622854529_4012734405684032_218857827036604151_n.jpg',
      imageUrls: [
        '/images/PRSeminar2569/622854529_4012734405684032_218857827036604151_n.jpg',
        '/images/PRSeminar2569/622874379_4012734425684030_8624421611551431421_n.jpg',
        '/images/PRSeminar2569/622874843_4012734429017363_55268414364215823_n.jpg',
        '/images/PRSeminar2569/622946471_4012734409017365_3020863957223545920_n.jpg',
        '/images/PRSeminar2569/623056738_4012734412350698_8894287347311930001_n.jpg',
        '/images/PRSeminar2569/623066028_4012734432350696_8032759961514426524_n.jpg',
        '/images/PRSeminar2569/623208136_4012734422350697_1163836447915984767_n.jpg',
        '/images/PRSeminar2569/623303788_4012734415684031_3180368519520666817_n.jpg'
      ]
    },
    {
      id: 22,
      title: 'Thawi Wattana PR Calendar (ThawiHub)',
      titleTh: 'นวัตกรรม Thawi Wattana PR Calendar (ThawiHub)',
      description: 'Innovation project for Thawi Watthana District Administration Division 2025 — a PR calendar system to streamline public communication planning.',
      descriptionTh: 'ผลงานนวัตกรรมของฝ่ายปกครอง สำนักงานเขตทวีวัฒนา ประจำปี 2568 — ระบบปฏิทินประชาสัมพันธ์เพื่อวางแผนการสื่อสารของหน่วยงานอย่างเป็นระบบ',
      category: 'innovation',
      categoryTh: 'นวัตกรรม',
      year: '2568',
      type: 'gallery',
      thumbnail: '/images/ThawiHub2568/579027085_25376833138650424_2637755391817182363_n.jpg',
      imageUrls: [
        '/images/ThawiHub2568/579027085_25376833138650424_2637755391817182363_n.jpg',
        '/images/ThawiHub2568/580106853_25376839945316410_2098596664582902808_n.jpg',
        '/images/ThawiHub2568/581054213_25376832478650490_1026695290886942578_n.jpg',
        '/images/ThawiHub2568/581254309_25376839548649783_7575809627077246829_n.jpg',
        '/images/ThawiHub2568/581702468_25376835718650166_4249864895480368604_n.jpg',
        '/images/ThawiHub2568/581929650_25376836035316801_1912739906001571517_n.jpg',
        '/images/ThawiHub2568/582437711_25376833391983732_9022752443999148305_n.jpg'
      ],
      pdfUrl: '/presentations/ThawiHub2568.pdf'
    },
    {
      id: 21,
      title: 'DWF Mobile Application Development',
      titleTh: 'โครงการพัฒนาแอปพลิเคชัน DWF Mobile',
      description: 'Development of DWF Mobile application for citizens to access government services conveniently.',
      descriptionTh: 'โครงการพัฒนาแอปพลิเคชันมือถือ DWF Mobile เพื่อให้ประชาชนสามารถเข้าถึงบริการได้สะดวก',
      category: 'app',
      categoryTh: 'แอปพลิเคชัน',
      year: '2024-2025',
      type: 'development',
      thumbnail: 'https://placehold.co/400x300/4f46e5/ffffff?text=DWF+Mobile+App'
    }
  ];

  // Simple categories
  const categories = [
    { key: 'all', label: i18n.language === 'th' ? 'ทั้งหมด' : 'All' },
    { key: 'video', label: i18n.language === 'th' ? 'วิดีโอ' : 'Video' },
    { key: 'training', label: i18n.language === 'th' ? 'การฝึกอบรม' : 'Training' },
    { key: 'activity', label: i18n.language === 'th' ? 'กิจกรรม' : 'Activity' },
    { key: 'innovation', label: i18n.language === 'th' ? 'นวัตกรรม' : 'Innovation' },
    { key: 'contest', label: i18n.language === 'th' ? 'การประกวด' : 'Contest' },
    { key: 'social', label: i18n.language === 'th' ? 'โครงการสังคม' : 'Social' },
    { key: 'csr', label: 'CSR' },
    { key: 'campaign', label: i18n.language === 'th' ? 'รณรงค์' : 'Campaign' },
    { key: 'manual', label: i18n.language === 'th' ? 'คู่มือ' : 'Manual' },
    { key: 'design', label: i18n.language === 'th' ? 'ออกแบบ' : 'Design' },
    { key: 'app', label: i18n.language === 'th' ? 'แอปฯ' : 'App' }
  ];

  // Filter and sort projects - ผลงานที่มี thumbnail ดีจะอยู่ด้านบน
  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  // Sort projects - prioritize projects with good thumbnails
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Projects with YouTube thumbnails (img.youtube.com) go first
    const aHasYoutubeThumbnail = a.thumbnail && a.thumbnail.includes('img.youtube.com');
    const bHasYoutubeThumbnail = b.thumbnail && b.thumbnail.includes('img.youtube.com');
    
    // Projects with local image paths go second
    const aHasLocalImage = a.thumbnail && a.thumbnail.startsWith('/images/');
    const bHasLocalImage = b.thumbnail && b.thumbnail.startsWith('/images/');
    
    // Projects with Facebook thumbnails go third
    const aHasFacebookThumbnail = a.thumbnail && a.thumbnail.includes('scontent.fbkk');
    const bHasFacebookThumbnail = b.thumbnail && b.thumbnail.includes('scontent.fbkk');
    
    // Placeholder thumbnails (via.placeholder.com) go last
    const aIsPlaceholder = a.thumbnail && a.thumbnail.includes('via.placeholder.com');
    const bIsPlaceholder = b.thumbnail && b.thumbnail.includes('via.placeholder.com');

    // Priority order: YouTube > Local Images > Facebook > Placeholders
    if (aHasYoutubeThumbnail && !bHasYoutubeThumbnail) return -1;
    if (bHasYoutubeThumbnail && !aHasYoutubeThumbnail) return 1;
    
    if (aHasLocalImage && !bHasLocalImage && !bHasYoutubeThumbnail) return -1;
    if (bHasLocalImage && !aHasLocalImage && !aHasYoutubeThumbnail) return 1;
    
    if (aHasFacebookThumbnail && !bHasFacebookThumbnail && !bHasYoutubeThumbnail && !bHasLocalImage) return -1;
    if (bHasFacebookThumbnail && !aHasFacebookThumbnail && !aHasYoutubeThumbnail && !aHasLocalImage) return 1;
    
    if (aIsPlaceholder && !bIsPlaceholder) return 1;
    if (bIsPlaceholder && !aIsPlaceholder) return -1;
    
    // If same thumbnail type, sort by year (newer first)
    return new Date(b.year).getFullYear() - new Date(a.year).getFullYear();
  });

  // Visible projects
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);

  const ProjectCard = ({ project }) => {
    const title = i18n.language === 'th' ? (project.titleTh || project.title) : project.title;
    const description = i18n.language === 'th' ? (project.descriptionTh || project.description) : project.description;
    const category = i18n.language === 'th' ? (project.categoryTh || project.category) : project.category;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group min-h-[400px] flex flex-col"
      >
        {/* Thumbnail */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300/e5e7eb/6b7280?text=' + encodeURIComponent(title.substring(0, 20));
            }}
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.type === 'video' ? 'bg-red-100 text-red-700' :
              project.type === 'gallery' ? 'bg-blue-100 text-blue-700' :
              project.type === 'mixed' ? 'bg-purple-100 text-purple-700' :
              project.type === 'multiple' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {project.type === 'video' ? (i18n.language === 'th' ? 'วิดีโอ' : 'Video') :
               project.type === 'gallery' ? (i18n.language === 'th' ? 'รูปภาพ' : 'Gallery') :
               project.type === 'mixed' ? (i18n.language === 'th' ? 'ผสม' : 'Mixed') :
               project.type === 'multiple' ? (i18n.language === 'th' ? 'หลายรูปแบบ' : 'Multiple') :
               (i18n.language === 'th' ? 'อื่นๆ' : 'Other')
              }
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
              {title}
            </h3>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag size={14} />
              <span className="bg-bangkok-100 text-bangkok-700 px-2 py-1 rounded-full text-xs">
                {category}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {project.type === 'video' && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Play size={14} />
                <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'Watch'}</span>
              </a>
            )}
            
            {project.type === 'gallery' && (
              <>
                <button
                  onClick={() => setGalleryImages(project.imageUrls)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Image size={14} />
                  <span>{i18n.language === 'th' ? 'ดูรูป' : 'Gallery'} ({project.imageUrls?.length || 0})</span>
                </button>
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>PDF</span>
                  </a>
                )}
              </>
            )}

            {project.type === 'multiple' && (
              <>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Play size={14} />
                  <span>{i18n.language === 'th' ? 'วิดีโอ' : 'Video'}</span>
                </a>
                <a
                  href={project.manualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 px-2 py-2 bg-bangkok-600 hover:bg-bangkok-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>{i18n.language === 'th' ? 'คู่มือ' : 'Manual'}</span>
                </a>
              </>
            )}

            {project.type === 'mixed' && (
              <>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Play size={14} />
                  <span>{i18n.language === 'th' ? 'วิดีโอ' : 'Video'}</span>
                </a>
                <button
                  onClick={() => setGalleryImages(project.imageUrls)}
                  className="flex-1 flex items-center justify-center space-x-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Image size={14} />
                  <span>{i18n.language === 'th' ? 'รูป' : 'Gallery'} ({project.imageUrls?.length || 0})</span>
                </button>
              </>
            )}

            {project.type === 'development' && (
              <div className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium">
                <span>{i18n.language === 'th' ? 'กำลังพัฒนา' : 'In Development'}</span>
              </div>
            )}

            <button
              onClick={() => setSelectedProject(project)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Info size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-bangkok-800 mb-4">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-bangkok-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {i18n.language === 'th' 
              ? 'ผลงานและโครงการที่สำคัญ' 
              : 'Featured Works and Projects'
            }
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveFilter(category.key);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === category.key
                    ? 'bg-bangkok-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-bangkok-50 hover:text-bangkok-600 shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {i18n.language === 'th' 
              ? `พบ ${sortedProjects.length} ผลงาน`
              : `Found ${sortedProjects.length} projects`
            }
            {activeFilter !== 'all' && (
              <span className="ml-2 text-bangkok-600 font-medium">
                ({categories.find(cat => cat.key === activeFilter)?.label})
              </span>
            )}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {sortedProjects.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 bg-bangkok-600 hover:bg-bangkok-700 text-white font-medium rounded-lg transition-colors"
            >
              <span>
                {showAll 
                  ? (i18n.language === 'th' ? 'แสดงน้อยลง' : 'Show Less')
                  : (i18n.language === 'th' ? 'แสดงทั้งหมด' : 'Show All')
                }
              </span>
              <ChevronDown size={20} className={`ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {showAll
                ? (i18n.language === 'th' ? `แสดงทั้งหมด ${sortedProjects.length} ผลงาน` : `Showing all ${sortedProjects.length} projects`)
                : (i18n.language === 'th' ? `แสดง 6 จาก ${sortedProjects.length} ผลงาน` : `Showing 6 of ${sortedProjects.length} projects`)
              }
            </p>
          </div>
        )}

        {/* No Results */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Tag size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {i18n.language === 'th' ? 'ไม่พบผลงาน' : 'No Projects Found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {i18n.language === 'th' 
                ? 'ลองเปลี่ยนตัวกรองหรือดูผลงานทั้งหมด' 
                : 'Try changing filters or view all projects'
              }
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-bangkok-600 hover:bg-bangkok-700 text-white rounded-lg transition-colors"
            >
              {i18n.language === 'th' ? 'ดูทั้งหมด' : 'View All'}
            </button>
          </div>
        )}

        {/* Gallery Modal */}
        {galleryImages && (
          <GalleryModal images={galleryImages} onClose={() => setGalleryImages(null)} />
        )}
        
        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {i18n.language === 'th' ? (selectedProject.titleTh || selectedProject.title) : selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{selectedProject.year}</span>
                  <span>•</span>
                  <span>{i18n.language === 'th' ? (selectedProject.categoryTh || selectedProject.category) : selectedProject.category}</span>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'th' ? (selectedProject.descriptionTh || selectedProject.description) : selectedProject.description}
                </p>

                {/* Action buttons in modal */}
                <div className="flex space-x-3">
                  {selectedProject.videoUrl && (
                    <a
                      href={selectedProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Play size={16} />
                      <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'Watch Video'}</span>
                    </a>
                  )}
                  
                  {selectedProject.imageUrls && selectedProject.imageUrls.length > 0 && (
                    <button
                      onClick={() => {
                        setGalleryImages(selectedProject.imageUrls);
                        setSelectedProject(null);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Image size={16} />
                      <span>{i18n.language === 'th' ? 'ดูรูปภาพ' : 'View Gallery'}</span>
                    </button>
                  )}

                  {selectedProject.manualUrl && (
                    <a
                      href={selectedProject.manualUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-bangkok-600 hover:bg-bangkok-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>{i18n.language === 'th' ? 'ดูคู่มือ' : 'View Manual'}</span>
                    </a>
                  )}
                  {selectedProject.pdfUrl && (
                    <a
                      href={selectedProject.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>{i18n.language === 'th' ? 'ดู Presentation' : 'View Presentation'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
