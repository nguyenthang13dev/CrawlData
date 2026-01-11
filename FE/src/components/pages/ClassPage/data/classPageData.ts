export interface BookCategory {
  id: string;
  name: string;
  imageKey: string;
}

export interface Resource {
  title: string;
  href: string;
  bookCat: string;
}

export interface Subject {
  name: string;
  title: string;
  resources: Resource[];
}

export const BOOK_CATEGORIES: BookCategory[] = [
  { id: '1', name: 'Chân trời sáng tạo', imageKey: 'book-cat-1.png' },
  { id: '2', name: 'Kết nối tri thức với cuộc sống', imageKey: 'book-cat-2.png' },
  { id: '3', name: 'Cánh diều', imageKey: 'book-cat-3.png' },
  { id: '6', name: 'iLearn Smart World', imageKey: 'book-cat-6.png' },
  { id: '7', name: 'Right on', imageKey: 'book-cat-7.png' },
  { id: '9', name: 'English Discovery', imageKey: 'book-cat-9.png' },
  { id: '12', name: 'Cùng khám phá', imageKey: 'book-cat-12.png' },
];

export const SUBJECTS_DATA: Subject[] = [
  {
    name: 'Ngữ văn',
    title: 'Môn Ngữ văn',
    resources: [
      { title: 'Soạn văn - Kết nối tri thức', href: '/soan-van-12-ket-noi-tri-thuc-c1737.html', bookCat: 'book-cat-2' },
      { title: 'Soạn văn - Cánh diều', href: '/soan-van-12-canh-dieu-c1738.html', bookCat: 'book-cat-3' },
      { title: 'Soạn văn - Chân trời sáng tạo', href: '/soan-van-12-chan-troi-sang-tao-c1739.html', bookCat: 'book-cat-1' },
      { title: 'Tác giả tác phẩm lớp 12', href: '/tac-gia-tac-pham-lop-12-c1851.html', bookCat: 'book-cat-0' },
      { title: 'Tóm tắt, bố cục Văn - Kết nối tri thức', href: '/tom-tat-bo-cuc-van-12-ket-noi-tri-thuc-c1848.html', bookCat: 'book-cat-2' },
      { title: 'Tóm tắt, bố cục Văn - Cánh diều', href: '/tom-tat-bo-cuc-van-12-canh-dieu-c1849.html', bookCat: 'book-cat-3' },
      { title: 'Tóm tắt, bố cục Văn - Chân trời sáng tạo', href: '/tom-tat-bo-cuc-van-12-chan-troi-sang-tao-c1850.html', bookCat: 'book-cat-1' },
      { title: 'SBT Văn - Kết nối tri thức', href: '/sbt-van-12-ket-noi-tri-thuc-c1885.html', bookCat: 'book-cat-2' },
      { title: 'SBT Văn - Cánh diều', href: '/sbt-van-12-canh-dieu-c1888.html', bookCat: 'book-cat-3' },
      { title: 'SBT Văn - Chân trời sáng tạo', href: '/sbt-van-12-chan-troi-sang-tao-c1889.html', bookCat: 'book-cat-1' },
      { title: 'Chuyên đề học tập Văn - Kết nối tri thức', href: '/chuyen-de-hoc-tap-van-12-ket-noi-tri-thuc-c1890.html', bookCat: 'book-cat-2' },
      { title: 'Chuyên đề học tập Văn - Cánh diều', href: '/chuyen-de-hoc-tap-van-12-canh-dieu-c1891.html', bookCat: 'book-cat-3' },
      { title: 'Chuyên đề học tập Văn - Chân trời sáng tạo', href: '/chuyen-de-hoc-tap-van-12-chan-troi-sang-tao-c1892.html', bookCat: 'book-cat-1' },
      { title: 'Trắc nghiệm Văn - Kết nối tri thức', href: '/v2/tu-luyen-trac-nghiem-van-12-ket-noi-tri-thuc-c1901.html', bookCat: 'book-cat-2' },
      { title: 'Trắc nghiệm Văn - Cánh diều', href: '/v2/tu-luyen-trac-nghiem-van-12-canh-dieu-c1902.html', bookCat: 'book-cat-3' },
      { title: 'Trắc nghiệm Văn - Chân trời sáng tạo', href: '/v2/tu-luyen-trac-nghiem-van-12-chan-troi-sang-tao-c1903.html', bookCat: 'book-cat-1' },
      { title: 'Đề thi, đề kiểm tra Văn - Kết nối tri thức', href: '/de-thi-de-kiem-tra-van-12-ket-noi-tri-thuc-c1972.html', bookCat: 'book-cat-2' },
      { title: 'Đề thi, đề kiểm tra Văn - Cánh diều', href: '/de-thi-de-kiem-tra-van-12-canh-dieu-c1973.html', bookCat: 'book-cat-3' },
      { title: 'Đề thi, đề kiểm tra Văn - Chân trời sáng tạo', href: '/de-thi-de-kiem-tra-van-12-chan-troi-sang-tao-c1974.html', bookCat: 'book-cat-1' },
      { title: 'Đề thi tốt nghiệp THPT môn Văn', href: '/de-thi-tot-nghiep-thpt-mon-van-c2202.html', bookCat: 'book-cat-0' },
      { title: 'Văn mẫu - Kết nối tri thức', href: '/van-mau-12-ket-noi-tri-thuc-c2390.html', bookCat: 'book-cat-2' },
      { title: 'Từ điển môn Văn lớp 12', href: '/tu-dien-mon-van-lop-12-c2395.html', bookCat: 'book-cat-0' },
      { title: 'Kĩ năng Đọc hiểu Ngữ văn lớp 12', href: '/ki-nang-doc-hieu-ngu-van-lop-12-c2495.html', bookCat: 'book-cat-0' },
    ],
  },
  {
    name: 'Toán học',
    title: 'Môn Toán học',
    resources: [
      { title: 'SGK Toán - Kết nối tri thức', href: '/sgk-toan-12-ket-noi-tri-thuc-c1783.html', bookCat: 'book-cat-2' },
      { title: 'SGK Toán - Cánh diều', href: '/sgk-toan-12-canh-dieu-c1785.html', bookCat: 'book-cat-3' },
      { title: 'SGK Toán - Chân trời sáng tạo', href: '/sgk-toan-12-chan-troi-sang-tao-c1784.html', bookCat: 'book-cat-1' },
      { title: 'SGK Toán - Cùng khám phá', href: '/sgk-toan-12-cung-kham-pha-c1791.html', bookCat: 'book-cat-12' },
      { title: 'SBT Toán - Kết nối tri thức', href: '/sbt-toan-12-ket-noi-tri-thuc-c1959.html', bookCat: 'book-cat-2' },
      { title: 'SBT Toán - Cánh diều', href: '/sbt-toan-12-canh-dieu-c1954.html', bookCat: 'book-cat-3' },
      { title: 'SBT Toán - Chân trời sáng tạo', href: '/sbt-toan-12-chan-troi-sang-tao-c1960.html', bookCat: 'book-cat-1' },
      { title: 'Chuyên đề học tập Toán - Kết nối tri thức', href: '/chuyen-de-hoc-tap-toan-12-ket-noi-tri-thuc-c2023.html', bookCat: 'book-cat-2' },
      { title: 'Chuyên đề học tập Toán - Cánh diều', href: '/chuyen-de-hoc-tap-toan-12-canh-dieu-c2196.html', bookCat: 'book-cat-3' },
      { title: 'Chuyên đề học tập Toán - Chân trời sáng tạo', href: '/chuyen-de-hoc-tap-toan-12-chan-troi-sang-tao-c2197.html', bookCat: 'book-cat-1' },
      { title: 'Trắc nghiệm Toán - Kết nối tri thức', href: '/v2/tu-luyen-trac-nghiem-toan-12-ket-noi-tri-thuc-c1946.html', bookCat: 'book-cat-2' },
      { title: 'Trắc nghiệm Toán - Cánh diều', href: '/v2/tu-luyen-trac-nghiem-toan-12-canh-dieu-c1948.html', bookCat: 'book-cat-3' },
      { title: 'Trắc nghiệm Toán - Chân trời sáng tạo', href: '/v2/tu-luyen-trac-nghiem-toan-12-chan-troi-sang-tao-c1947.html', bookCat: 'book-cat-1' },
      { title: 'Đề thi, đề kiểm tra Toán - Kết nối tri thức', href: '/de-thi-de-kiem-tra-toan-lop-12-ket-noi-tri-thuc-c1964.html', bookCat: 'book-cat-2' },
      { title: 'Đề thi, đề kiểm tra Toán - Cánh diều', href: '/de-thi-de-kiem-tra-toan-lop-12-canh-dieu-c1965.html', bookCat: 'book-cat-3' },
      { title: 'Đề thi, đề kiểm tra Toán - Chân trời sáng tạo', href: '/de-thi-de-kiem-tra-toan-lop-12-chan-troi-sang-tao-c1966.html', bookCat: 'book-cat-1' },
      { title: 'Đề thi tốt nghiệp THPT môn Toán', href: '/de-thi-tot-nghiep-thpt-mon-toan-c2201.html', bookCat: 'book-cat-0' },
      { title: 'Từ điển môn Toán lớp 12', href: '/tu-dien-mon-toan-lop-12-c2295.html', bookCat: 'book-cat-0' },
    ],
  },
];
