'use client';

import Link from 'next/link';
import './header.css';

const HeaderOut = () => {
  return (
    <div className="header-container">
      <div className="header-container-inner">
        <div className="header-logo">
          <Link href="/" title="loigiaihay.com">
            <img className='header-logo__img' src="https://loigiaihay.com/themes/style/images/logolgh.png" alt="" />
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="header-nav__grade-list">
            {/* Lớp 1 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-1" className="header-nav__grade-item__link">
                Lớp 1
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-1" className="header-nav__cat-item__link">
                          Giải Toán 1
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-1" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 1
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vbt-toan-1" className="header-nav__cat-item__link">
                          Giải VBT Toán 1
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Tiếng Việt</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-viet-1" className="header-nav__cat-item__link">
                          Giải Tiếng Việt 1
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-viet-1" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Việt 1
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 2 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-2" className="header-nav__grade-item__link">
                Lớp 2
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-2" className="header-nav__cat-item__link">
                          Giải Toán 2
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-2" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 2
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vbt-toan-2" className="header-nav__cat-item__link">
                          Giải VBT Toán 2
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Tiếng Việt</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-viet-2" className="header-nav__cat-item__link">
                          Giải Tiếng Việt 2
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-viet-2" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Việt 2
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 3 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-3" className="header-nav__grade-item__link">
                Lớp 3
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-3" className="header-nav__cat-item__link">
                          Giải Toán 3
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-3" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 3
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vbt-toan-3" className="header-nav__cat-item__link">
                          Giải VBT Toán 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Tiếng Việt</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-viet-3" className="header-nav__cat-item__link">
                          Giải Tiếng Việt 3
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-viet-3" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Việt 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 4 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-4" className="header-nav__grade-item__link">
                Lớp 4
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-4" className="header-nav__cat-item__link">
                          Giải Toán 4
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-4" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 4
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vbt-toan-4" className="header-nav__cat-item__link">
                          Giải VBT Toán 4
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Tiếng Việt</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-viet-4" className="header-nav__cat-item__link">
                          Giải Tiếng Việt 4
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-viet-4" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Việt 4
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Khoa học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-khoa-hoc-4" className="header-nav__cat-item__link">
                          Giải Khoa học 4
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-khoa-hoc-4" className="header-nav__cat-item__link">
                          Giải Sách bài tập Khoa học 4
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 5 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-5" className="header-nav__grade-item__link">
                Lớp 5
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-5" className="header-nav__cat-item__link">
                          Giải Toán 5
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-5" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 5
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vbt-toan-5" className="header-nav__cat-item__link">
                          Giải VBT Toán 5
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Tiếng Việt</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-viet-5" className="header-nav__cat-item__link">
                          Giải Tiếng Việt 5
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-viet-5" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Việt 5
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Khoa học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-khoa-hoc-5" className="header-nav__cat-item__link">
                          Giải Khoa học 5
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-khoa-hoc-5" className="header-nav__cat-item__link">
                          Giải Sách bài tập Khoa học 5
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 6 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-6" className="header-nav__grade-item__link">
                Lớp 6
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-6" className="header-nav__cat-item__link">
                          Giải Toán 6
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-6" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 6
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-6" className="header-nav__cat-item__link">
                          Giải Ngữ văn 6
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-6" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 6
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-6" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 6
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-6" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 6
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Khoa học tự nhiên</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-khoa-hoc-tu-nhien-6" className="header-nav__cat-item__link">
                          Giải KHTN 6
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-khoa-hoc-tu-nhien-6" className="header-nav__cat-item__link">
                          Giải Sách bài tập KHTN 6
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 7 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-7" className="header-nav__grade-item__link">
                Lớp 7
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-7" className="header-nav__cat-item__link">
                          Giải Toán 7
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-7" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 7
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-7" className="header-nav__cat-item__link">
                          Giải Ngữ văn 7
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-7" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 7
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-7" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 7
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-7" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 7
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Khoa học tự nhiên</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-khoa-hoc-tu-nhien-7" className="header-nav__cat-item__link">
                          Giải KHTN 7
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-khoa-hoc-tu-nhien-7" className="header-nav__cat-item__link">
                          Giải Sách bài tập KHTN 7
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 8 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-8" className="header-nav__grade-item__link">
                Lớp 8
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-8" className="header-nav__cat-item__link">
                          Giải Toán 8
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-8" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 8
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-8" className="header-nav__cat-item__link">
                          Giải Ngữ văn 8
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-8" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 8
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-8" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 8
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-8" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 8
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Khoa học tự nhiên</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-khoa-hoc-tu-nhien-8" className="header-nav__cat-item__link">
                          Giải KHTN 8
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-khoa-hoc-tu-nhien-8" className="header-nav__cat-item__link">
                          Giải Sách bài tập KHTN 8
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 9 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-9" className="header-nav__grade-item__link">
                Lớp 9
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-9" className="header-nav__cat-item__link">
                          Giải Toán 9
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-9" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 9
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-9" className="header-nav__cat-item__link">
                          Giải Ngữ văn 9
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-9" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 9
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-9" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 9
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-9" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 9
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--violet">
                      <span className="header-nav__subject-item__label">Lịch sử</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-lich-su-9" className="header-nav__cat-item__link">
                          Giải Lịch sử 9
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-lich-su-9" className="header-nav__cat-item__link">
                          Giải Sách bài tập Lịch sử 9
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 10 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-10" className="header-nav__grade-item__link">
                Lớp 10
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-10" className="header-nav__cat-item__link">
                          Giải Toán 10
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-10" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 10
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-10" className="header-nav__cat-item__link">
                          Giải Ngữ văn 10
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-10" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 10
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-10" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 10
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-10" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 10
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Vật lý</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vat-ly-10" className="header-nav__cat-item__link">
                          Giải Vật lý 10
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-vat-ly-10" className="header-nav__cat-item__link">
                          Giải Sách bài tập Vật lý 10
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--violet">
                      <span className="header-nav__subject-item__label">Hóa học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-hoa-hoc-10" className="header-nav__cat-item__link">
                          Giải Hóa học 10
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-hoa-hoc-10" className="header-nav__cat-item__link">
                          Giải Sách bài tập Hóa học 10
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 11 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-11" className="header-nav__grade-item__link">
                Lớp 11
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-11" className="header-nav__cat-item__link">
                          Giải Toán 11
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-11" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 11
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-11" className="header-nav__cat-item__link">
                          Giải Ngữ văn 11
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-11" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 11
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-11" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 11
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-11" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 11
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Vật lý</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vat-ly-11" className="header-nav__cat-item__link">
                          Giải Vật lý 11
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-vat-ly-11" className="header-nav__cat-item__link">
                          Giải Sách bài tập Vật lý 11
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--violet">
                      <span className="header-nav__subject-item__label">Hóa học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-hoa-hoc-11" className="header-nav__cat-item__link">
                          Giải Hóa học 11
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-hoa-hoc-11" className="header-nav__cat-item__link">
                          Giải Sách bài tập Hóa học 11
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Lớp 12 */}
            <li className="header-nav__grade-item">
              <Link href="/lop-12" className="header-nav__grade-item__link">
                Lớp 12
              </Link>
              <ul className="header-nav__subject-list">
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--blue">
                      <span className="header-nav__subject-item__label">Toán học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-toan-12" className="header-nav__cat-item__link">
                          Giải Toán 12
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-toan-12" className="header-nav__cat-item__link">
                          Giải Sách bài tập Toán 12
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--orange">
                      <span className="header-nav__subject-item__label">Ngữ văn</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-ngu-van-12" className="header-nav__cat-item__link">
                          Giải Ngữ văn 12
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-ngu-van-12" className="header-nav__cat-item__link">
                          Giải Sách bài tập Ngữ văn 12
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--red">
                      <span className="header-nav__subject-item__label">Tiếng Anh</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-tieng-anh-12" className="header-nav__cat-item__link">
                          Giải Tiếng Anh 12
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-tieng-anh-12" className="header-nav__cat-item__link">
                          Giải Sách bài tập Tiếng Anh 12
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--pink">
                      <span className="header-nav__subject-item__label">Vật lý</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-vat-ly-12" className="header-nav__cat-item__link">
                          Giải Vật lý 12
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-vat-ly-12" className="header-nav__cat-item__link">
                          Giải Sách bài tập Vật lý 12
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-nav__subject-item">
                  <div className="header-nav__subject-content">
                    <div className="header-nav__subject-item__link header-nav__subject-item__link--violet">
                      <span className="header-nav__subject-item__label">Hóa học</span>
                    </div>
                    <ul className="header-nav__cat-list">
                      <li className="header-nav__cat-item">
                        <Link href="/giai-hoa-hoc-12" className="header-nav__cat-item__link">
                          Giải Hóa học 12
                        </Link>
                      </li>
                      <li className="header-nav__cat-item">
                        <Link href="/giai-sach-bai-tap-hoa-hoc-12" className="header-nav__cat-item__link">
                          Giải Sách bài tập Hóa học 12
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="header-search">
                <div className="header-search__content">
                    {/* <form target="_blank"  action="https://cse.google.com/cse" style={"overflow: hidden;margin: 1px 0;"}>
                        <Input name="q" type="text" className="header-search__input" placeholder="Tìm kiếm">
                        <button className="header-search__icon"><img className="" src="/themes/style/images/search.png"></button>
                    </form> */}
                </div>

            </div>
      </div>
    </div>
  );
};

export default HeaderOut;
