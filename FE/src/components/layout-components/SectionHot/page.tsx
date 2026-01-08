'use client';

import { RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";


import './hot.css';

const SectionHotPage = () =>
{
  // Banner slides
  const bannerSlides = [
    {
      id: 1,
      title: 'Dẫn chứng NLXH',
      image: 'https://cdn.tuyensinh247.com/picture/2025/0917/dan-chung-nghi-luan-xa-hoi-4-0.webp',
      link: '/dan-chung-nghi-luan-xa-hoi',
    },
    {
      id: 2,
      title: 'Từ điển tiếng Việt',
      image: 'https://img.loigiaihay.com/picture/2025/1231/tu-dien-tieng-viet-0_1.jpeg',
      link: '/tu-dien-tv',
    },
    {
      id: 3,
      title: 'Truyện cổ tích',
      image: 'https://cdn.tuyensinh247.com/picture/2025/0917/kho-truyen-co-tich-3-0.webp',
      link: '/kho-truyen',
    },
  ];

  // Feature items
  const features = [
    {
      id: 1,
      icon: 'L',
      title: 'Luyện kĩ năng đọc hiểu',
      description: 'Giúp rèn luyện kĩ năng phân tích, cảm thụ văn bản',
      link: '/luyen-dang-doc-hieu',
      color: '#1890ff',
    },
    {
      id: 2,
      icon: 'Đ',
      title: 'Động từ bất quy tắc',
      description: 'Tra cứu nhanh 360 động từ bất quy tắc Tiếng Anh',
      link: '/dong-tu-bat-quy-tac',
      color: '#52c41a',
    },
    {
      id: 3,
      icon: 'D',
      title: 'Dẫn chứng nghị luận xã hội',
      description: 'Bí kíp đạt điểm cao cho bài văn nghị luận xã hội',
      link: '/dan-chung-nghi-luan-xa-hoi',
      color: '#fa8c16',
    },
    {
      id: 4,
      icon: 'K',
      title: 'Kho truyện cổ tích',
      description: '200+ truyện cổ tích, truyện dân gian hay nhất',
      link: '/kho-truyen',
      color: '#722ed1',
    },
    {
      id: 5,
      icon: 'C',
      title: 'Cụm động từ Tiếng Anh',
      description: '800+ phrasal verbs đầy đủ nghĩa, từ đồng nghĩa, trái nghĩa',
      link: '/cum-dong-tu-phrasal-verbs',
      color: '#eb2f96',
    },
    {
      id: 6,
      icon: 'T',
      title: 'Thành ngữ Việt Nam',
      description: '1000 thành ngữ Việt Nam quen thuộc kèm ý nghĩa chi tiết',
      link: '/thanh-ngu-viet-nam',
      color: '#13c2c2',
    },
  ];


  return (
      
    
    <div className="v2-hot">
                <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">LOIGIAIHAY.COM CÓ GÌ HOT?</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner Slider */}
        <div className="rounded-lg overflow-hidden shadow-lg">
        <Carousel autoplay>
        {bannerSlides.map((slide) => (
            <div key={slide.id}>
            <Link href={slide.link}>
                <div className="relative h-64 lg:h-80">
                <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                />
                </div>
            </Link>
            </div>
        ))}
        </Carousel>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
        <Link key={feature.id} href={feature.link}>
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3"
                style={{ backgroundColor: feature.color }}
            >
                {feature.icon}
            </div>
            <h3 className="font-bold text-base mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{feature.description}</p>
            <p className="text-blue-600 text-sm mt-3 flex items-center gap-1">
                Khám phá ngay <RightOutlined className="text-xs" />
            </p>
            </div>
        </Link>
        ))}
        </div>
        </div>
        </div>
        </section>

    </div>
    )

}


export default SectionHotPage;