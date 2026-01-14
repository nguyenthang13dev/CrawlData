'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './page.css';
import { subjectNXBService } from '@/services/SubjectNXBService/SubjectNXBService.service';
import { ListCourseBySubjectDtos, ListLessonByCourseDtos, LessonDto } from '@/types/Subject/Subject';
import { ApiResponse } from '@/types/general';

const BaiSoanPage = () => {
  const params = useParams();
  const [coursesList, setCoursesList] = useState<ListCourseBySubjectDtos[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, LessonDto[]>>({});
  const [lessonsLoading, setLessonsLoading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Lấy subjectId từ params - có thể là bai (bài học)
        const subjectId = params.bai as string;
        
        if (subjectId) {
          const response: ApiResponse<ListCourseBySubjectDtos[]> = 
            await subjectNXBService.getListCourseBySubject(subjectId);
          
          if (response.data && Array.isArray(response.data)) {
            setCoursesList(response.data);
            // Lấy lessons cho tất cả courses
            fetchAllLessons(response.data);
          } else {
            setError('Dữ liệu không hợp lệ');
          }
        } else {
          setError('Không tìm thấy ID bài học');
        }
      } catch (err: any) {
        setError(err?.message || 'Có lỗi xảy ra khi tải dữ liệu');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [params.bai]);

  // Hàm lấy lessons cho tất cả courses
  const fetchAllLessons = async (courses: ListCourseBySubjectDtos[]) => {
    const allCourses: { courseId: string; courseName: string }[] = [];
    
    // Thu thập tất cả course IDs
    courses.forEach((courseGroup) => {
      if (courseGroup.courses && courseGroup.courses.length > 0) {
        courseGroup.courses.forEach((course) => {
          if (course.id) {
            allCourses.push({ courseId: course.id, courseName: course.name });
          }
        });
      }
    });

    // Gọi API cho từng course (có thể tối ưu sau bằng cách gọi song song)
    const lessonsData: Record<string, LessonDto[]> = {};
    const loadingState: Record<string, boolean> = {};

    for (const { courseId, courseName } of allCourses) {
      loadingState[courseId] = true;
      try {
        const response: ApiResponse<ListLessonByCourseDtos[]> = 
          await subjectNXBService.getListLessonByCourse(courseId);
        
        if (response.data && Array.isArray(response.data)) {
          // Flatten lessons từ tất cả các response
          const lessons: LessonDto[] = [];
          response.data.forEach((lessonGroup) => {
            if (lessonGroup.lessons && lessonGroup.lessons.length > 0) {
              lessons.push(...lessonGroup.lessons);
            }
          });
          lessonsData[courseId] = lessons;
        }
      } catch (err) {
        console.error(`Error fetching lessons for course ${courseId}:`, err);
        lessonsData[courseId] = [];
      } finally {
        loadingState[courseId] = false;
      }
    }

    setLessonsMap(lessonsData);
    setLessonsLoading(loadingState);
  };
  return (
    <div className="box_content nopad">
      <div className="box">
        <div className="top-title">
          <img
            style={{ width: '5px', verticalAlign: 'middle', margin: '-4px 5px 0 0' }}
            src="/themes/images/n-arrow-4.png"
            alt=""
          />
          <h1 style={{ display: 'inline-block', fontSize: '18px', marginBottom: 0 }}>
            <a style={{ color: '#262626' }} href="/soan-van-12-ket-noi-tri-thuc-c1737.html">
              Soạn văn 12 kết nối tri thức, Soạn văn lớp 12 hay nhất
            </a>
          </h1>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <div className="descript-categories font-16">
            <div className="box_gray bottom10" style={{ background: '#e4e4ec' }}>
              Soạn văn lớp 12 Kết nối tri thức hay nhất, chi tiết đầy đủ Tập 1 và Tập 2 chương
              trình mới giúp học sinh soạn bài, đầy đủ các bài văn mẫu Ngữ văn 12
            </div>
          </div>
          <div className="magT5 clearfix n-rate">
            <input type="hidden" value="1737" id="content_cat_id" />
            <div className="kk-star-ratings top-right rgt">
              <div style={{ display: 'inline-block' }}>
                <span className="vote_title">Bình chọn: </span>
                <div className="kksr-stars kksr-star gray">
                  <div className="kksr-fuel kksr-star yellow" style={{ width: '74%' }}></div>
                  <a
                    href="javascript:void(0)"
                    className=""
                    style={{ display: 'block' }}
                    data-rating-val="1"
                    title="1 sao"
                  ></a>
                  <a
                    href="javascript:void(0)"
                    className=""
                    style={{ display: 'block' }}
                    data-rating-val="2"
                    title="2 sao"
                  ></a>
                  <a
                    href="javascript:void(0)"
                    className=""
                    style={{ display: 'block' }}
                    data-rating-val="3"
                    title="3 sao"
                  ></a>
                  <a
                    href="javascript:void(0)"
                    className=""
                    style={{ display: 'block' }}
                    data-rating-val="4"
                    title="4 sao"
                  ></a>
                  <a
                    href="javascript:void(0)"
                    className=""
                    style={{ display: 'block' }}
                    data-rating-val="5"
                    title="5 sao"
                  ></a>
                </div>
              </div>
              <div className="kksr-legend">
                <div>
                  <span>3.7 </span> trên <span>495</span> phiếu
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
          <br />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
              Lỗi: {error}
            </div>
          ) : (
            <div className="box clearfix font-opensans-b font-16" id="event_1_columns" style={{ paddingLeft: '15px' }}>
              {coursesList.map((courseGroup, groupIndex) => (
                <div key={courseGroup.idPubSub || groupIndex}>
                  <h2
                    style={{
                      marginBottom: '10px',
                      fontSize: '18px',
                      display: 'inline-block',
                    }}
                    className="title-event-parent font-opensans-exb pm0"
                  >
                    <a style={{ color: '#2888e1' }} href="#" title={courseGroup.title}>
                      <strong>{courseGroup.title}</strong>
                    </a>
                  </h2>
                  <div>
                    {courseGroup.courses && courseGroup.courses.length > 0 && (
                      <div className="subject-item no-bg pm0" style={{ paddingLeft: 0 }}>
                        <div className="event-articles-wrap-2-cols">
                          <ul>
                            {courseGroup.courses.slice(0, Math.ceil(courseGroup.courses.length / 2)).map((course, index) => (
                              <li key={course.id || index}>
                                <a href={course.href || '#'} title={course.title || course.name}>
                                  <img
                                    style={{ padding: '0 5px 2px 0px' }}
                                    src="/themes/images/tamgiac.png"
                                    alt=""
                                  />
                                  <span>
                                    {index + 1}. {course.name || course.title}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                          <ul>
                            {courseGroup.courses.slice(Math.ceil(courseGroup.courses.length / 2)).map((course, index) => (
                              <li key={course.id || index + Math.ceil(courseGroup.courses.length / 2)}>
                                <a href={course.href || '#'} title={course.title || course.name}>
                                  <img
                                    style={{ padding: '0 5px 2px 0px' }}
                                    src="/themes/images/tamgiac.png"
                                    alt=""
                                  />
                                  <span>
                                    {Math.ceil(courseGroup.courses.length / 2) + index + 1}. {course.name || course.title}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Hiển thị lessons cho mỗi course group */}
                  {courseGroup.courses && courseGroup.courses.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      {courseGroup.courses.map((course, courseIndex) => {
                        const courseLessons = lessonsMap[course.id] || [];
                        const isLoading = lessonsLoading[course.id];
                        
                        if (isLoading) {
                          return null; // Hoặc hiển thị loading indicator
                        }

                        if (courseLessons.length === 0) {
                          return null;
                        }

                        return (
                          <div key={course.id || courseIndex} style={{ marginBottom: '30px' }}>
                            <h3
                              style={{
                                marginBottom: '10px',
                                fontSize: '16px',
                                color: '#df7100',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                              className="font-opensans-b"
                            >
                              <img src="/themes/images/star.png" alt="" style={{ width: '16px', height: '16px' }} />
                              <strong>{course.name || course.title}</strong>
                            </h3>
                            <div className="subject-item no-bg pm0" style={{ paddingLeft: 0 }}>
                              <div className="event-articles-wrap-2-cols">
                                <ul>
                                  {courseLessons.slice(0, Math.ceil(courseLessons.length / 2)).map((lesson, index) => (
                                    <li key={lesson.id || index}>
                                      <a href={lesson.href || '#'} title={lesson.title || lesson.name}>
                                        <img
                                          style={{ padding: '0 5px 2px 0px' }}
                                          src="/themes/images/tamgiac.png"
                                          alt=""
                                        />
                                        <span>
                                          {index + 1}. {lesson.name || lesson.title}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                                <ul>
                                  {courseLessons.slice(Math.ceil(courseLessons.length / 2)).map((lesson, index) => (
                                    <li key={lesson.id || index + Math.ceil(courseLessons.length / 2)}>
                                      <a href={lesson.href || '#'} title={lesson.title || lesson.name}>
                                        <img
                                          style={{ padding: '0 5px 2px 0px' }}
                                          src="/themes/images/tamgiac.png"
                                          alt=""
                                        />
                                        <span>
                                          {Math.ceil(courseLessons.length / 2) + index + 1}. {lesson.name || lesson.title}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {coursesList.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  Không có dữ liệu khóa học.
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="category-desc"
          style={{ borderTop: '1px solid lightgrey', padding: '10px', fontSize: '18px' }}
        >
          <p style={{ textAlign: 'left' }}>
            <span>
              Văn 12 Kết nối tri thức là bộ sách mới gồm tập 1 và tập 2 được Lời giải hay tổng hợp
              lý thuyết, giải bài tập, trắc nghiệm Văn 12 Kết nối tri thức đầy đủ và chi tiết nhất.
            </span>
          </p>
          <p style={{ textAlign: 'center' }}>
            <span>
              <br />
              <img
                src="https://img.loigiaihay.com/picture/2024/0129/kn.png"
                width="470"
                height="329"
                alt=""
              />
              <br />&nbsp;
            </span>
          </p>
          <p>
            <span>
              Giải sgk văn 12 tập 1, tập 2 bộ sách kết nối tri thức với cuộc sống giúp học sinh
              soạn văn 12, giải bài tập ngữ văn 12 hay nhất, đầy đủ lý thuyết tìm hiểu chung, tìm
              hiểu chi tiết, trả lời các câu hỏi phần Đọc, Viết, Nói và nghe, Thực hành tiếng Việt
            </span>
          </p>
          <p>
            <span>
              <strong>Xem thêm</strong>
            </span>
          </p>
          <p>
            <span style={{ color: '#000080' }}>
              <strong>
                <a
                  href="https://loigiaihay.com/sgk-van-12-tap-1-pdf-van-12-tap-1-ket-noi-tri-thuc-a155097.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={{ color: '#000080' }}>PDF SGK Văn 12 tập 1 Kết nối tri thức</span>
                </a>
              </strong>
            </span>
          </p>
          <p>
            <span style={{ color: '#000080' }}>
              <strong>
                <a
                  href="https://loigiaihay.com/sgk-van-12-tap-2-pdf-van-12-tap-2-ket-noi-tri-thuc-a155099.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={{ color: '#000080' }}>PDF SGK Văn 12 tập 2 Kết nối tri thức</span>
                </a>
              </strong>
            </span>
          </p>
        </div>

        <div className="ads center">
          <div
            className="adsbygoogle"
            style={{ display: 'block', height: '165px' }}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-c+4r+c+1q"
            data-ad-client="ca-pub-8529835372050931"
            data-ad-slot="4942055592"
          ></div>
        </div>

        <div className="box_other pad10 clearfix">
          <div className="magT5 clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export default BaiSoanPage;
