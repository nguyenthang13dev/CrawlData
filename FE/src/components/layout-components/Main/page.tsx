'use client';

import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Button } from "antd";

import Reason from "../Reason/page";
import '../SectionHot/hot.css';


const MainSectionPage = () =>
{


  // Grade levels
  const grades = [
    { id: 12, name: 'Lớp 12', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop12.png' },
    { id: 11, name: 'Lớp 11', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop11.png' },
    { id: 10, name: 'Lớp 10', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop10.png' },
    { id: 9, name: 'Lớp 9', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop9.png' },
    { id: 8, name: 'Lớp 8', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop8.png' },
    { id: 7, name: 'Lớp 7', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop7.png' },
    { id: 6, name: 'Lớp 6', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop6.png' },
    { id: 5, name: 'Lớp 5', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop5.png' },
    { id: 4, name: 'Lớp 4', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop4.png' },
    { id: 3, name: 'Lớp 3', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop3.png' },
    { id: 2, name: 'Lớp 2', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop2.png' },
    { id: 1, name: 'Lớp 1', image: 'https://m.loigiaihay.com/themes/images/imageClass/lop1.png' },
  ];

    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Reasons Section */}
                <Reason />
              {/* Grade Selection */}
              <div>
                <h2 className="text-2xl font-bold mb-6">LỰA CHỌN LỚP ĐỂ XEM LỜI GIẢI VÀ BÀI SOẠN</h2>
                  
                            
                            <ul className="listCardClass" id="listCardClass">
          <li>
            <a href="https://loigiaihay.com/lop-12.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop12.png" alt="Lớp 12" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-11.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop11.png" alt="Lớp 11" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-10.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop10.png" alt="Lớp 10" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-9.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop9.png" alt="Lớp 9" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-8.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop8.png" alt="Lớp 8" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-7.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop7.png" alt="Lớp 7" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-6.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop6.png" alt="Lớp 6" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-5.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop5.png" alt="Lớp 5" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-4.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop4.png" alt="Lớp 4" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-3.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop3.png" alt="Lớp 3" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-2.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop2.png" alt="Lớp 2" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
          <li>
            <a href="https://loigiaihay.com/lop-1.html" className="btnStudyNowBox">
              <img src="https://m.loigiaihay.com/themes/images/imageClass/lop1.png" alt="Lớp 1" />
              <span className="btnStudyNow">Học ngay</span>
            </a>
          </li>
        </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* App Download Card */}
                <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                  <p className="text-center font-bold text-xl mb-4">TẢI APP ĐỂ XEM OFFLINE</p>
                  <div className="space-y-3">
                    <a
                      href="https://apps.apple.com/vn/app/loigiaihay-com-l%E1%BB%9Di-gi%E1%BA%A3i-hay/id1209891610"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        type="default"
                        size="large"
                        icon={<AppleOutlined />}
                        className="w-full bg-white text-gray-800 hover:bg-gray-100"
                      >
                        App Store
                      </Button>
                    </a>
                    <a
                      href="https://goo.gl/lYsjxK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        type="default"
                        size="large"
                        icon={<AndroidOutlined />}
                        className="w-full bg-white text-gray-800 hover:bg-gray-100"
                      >
                        Google Play
                      </Button>
                    </a>
                  </div>
                </div>

                            {/* Ad Space */}
                <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
                  <p className="text-sm">Quảng cáo</p>
                  <div className="h-96 flex items-center justify-center">
                    300x600
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    )
}

export default MainSectionPage;