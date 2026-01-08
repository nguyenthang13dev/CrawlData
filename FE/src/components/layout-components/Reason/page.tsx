'use client'

import { CheckCircleOutlined } from "@ant-design/icons";
import '../SectionHot/hot.css';

const Reason = () =>
{
          // Reasons to trust
  const reasons = [
    {
      id: 1,
      icon: '/themes/style/images/note-2.png',
      text: 'Đầy đủ lời giải SGK - SBT - VBT từ lớp 1 đến lớp 12',
    },
    {
      id: 2,
      icon: '/themes/style/images/lgh-trust-icon2.png',
      text: 'Kho bài tập trắc nghiệm bám sát theo dạng bài',
    },
    {
      id: 3,
      icon: '/themes/style/images/lgh-trust-icon3.png',
      text: 'Hệ thống đề thi phong phú, chất lượng',
    },
    {
      id: 4,
      icon: '/themes/style/images/lgh-trust-icon4.png',
      text: 'Lý thuyết dạng sơ đồ tư duy dễ hiểu',
    },
  ];
    return (
        <>
            <section className="reasons">
               <h3 className="text-xl font-bold mb-6">
                  Vì sao <strong className="text-blue-600">Loigiaihay.com</strong> được{' '}
                  <span className="text-orange-500">hàng triệu học sinh</span> cả nước tin tưởng?
                </h3>
                <ul className="reasons-list">
                  {reasons.map((reason) => (
                    <li key={reason.id} className="">
                      <CheckCircleOutlined className="text-green-500 text-2xl shrink-0 mt-1" />
                      <p className="text-gray-700">{reason.text}</p>
                    </li>
                  ))}
                </ul>   
                </section>
             

        </>
    )
}

export default Reason;