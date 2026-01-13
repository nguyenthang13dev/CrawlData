'use client';

import  from './page.css';

interface BaiSoanData {
  title: string;
  author?: string;
  bookCategory?: string;
  sections: BaiSection[];
}

interface BaiSection {
  heading: string;
  content: string | string[];
}

const BaiSoanPage = () => {
  const baiSoan: BaiSoanData = {
    title: 'Soạn bài: Xuân Tóc Đỏ - Câu Geơorge',
    author: 'Câu Geơorge',
    bookCategory: 'Kết nối tri thức',
    sections: [
      {
        heading: 'I. Tóm tắt',
        content: [
          'Bài thơ "Xuân Tóc Đỏ" của Câu Geơorge là một tác phẩm văn học nổi tiếng...',
          'Nội dung bài thơ xoay quanh...',
        ],
      },
      {
        heading: 'II. Nhân vật chính',
        content: [
          '- Nhân vật 1: ...',
          '- Nhân vật 2: ...',
        ],
      },
      {
        heading: 'III. Phân tích nội dung',
        content: [
          '1. Đặc điểm của tác phẩm',
          '2. Ý nghĩa biểu tượng',
          '3. Hình ảnh và so sánh',
        ],
      },
      {
        heading: 'IV. Cảm nhận cá nhân',
        content: 'Bài thơ đã gây ấn tượng sâu sắc...',
      },
      {
        heading: 'V. Bài học rút ra',
        content: [
          '- Giá trị nhân văn',
          '- Ý nghĩa xã hội',
          '- Bài học cuộc sống',
        ],
      },
    ],
  };

  return (
    <div className={container}>
      {/* Header */}
      <div className={header}>
        <h1 className={title}>{baiSoan.title}</h1>
        <div className={meta}>
          {baiSoan.author && <span className={author}>Tác giả: {baiSoan.author}</span>}
          {baiSoan.bookCategory && (
            <span className={category}>Sách: {baiSoan.bookCategory}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={content}>
        {baiSoan.sections.map((section, index) => (
          <div key={index} className={section}>
            <h2 className={sectionHeading}>{section.heading}</h2>
            <div className={sectionContent}>
              {Array.isArray(section.content) ? (
                <ul className={list}>
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className={styles.footer}>
        <p>Nguồn: Sách giáo khoa Ngữ Văn lớp 12 - {baiSoan.bookCategory}</p>
      </div>
    </div>
  );
};

export default BaiSoanPage;
