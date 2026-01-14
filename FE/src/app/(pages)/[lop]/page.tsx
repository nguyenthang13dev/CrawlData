'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SubjectSection from '@/components/pages/ClassPage/SubjectSection/SubjectSection';
import { subjectService } from '@/services/Subject/Subject.service';
import { GradeSubjectDtos } from '@/types/Subject/Subject';
import { ApiResponse } from '@/types/general';

import '../home.css';
import './page.css';

const DESCRIPTION = `Giải bài tập, soạn bài sách giáo khoa, sách bài tập lớp 12 môn Toán, Vật lý, Hóa học, Sinh học, Ngữ Văn, Tiếng Anh, Lịch sử, Địa lý, GDCD, Tin học, Công nghệ. Đáp án và lời giải chi tiết các câu hỏi bài tập, đề kiểm tra 15 phút, 45 phút (1 tiết), đề thi học kì 1 và 2 (đề kiểm tra học kì 1 và 2) các môn lớp 12.`;

export default function ClassPage() {
  const params = useParams();
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubjectDtos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy id từ params - lop là id của lớp học
        const id = params.lop as string;
        
        if (id) {
          const response: ApiResponse<GradeSubjectDtos[]> = await subjectService.getGradeSubjectNXB(id);
          if (response.data && Array.isArray(response.data)) {
            console.log('Grade Subjects Data:', response.data);
            setGradeSubjects(response.data);
          } else {
            setError('Dữ liệu không hợp lệ');
          }
        } else {
          setError('Không tìm thấy ID lớp học');
        }
      } catch (err: any) {
        setError(err?.message || 'Có lỗi xảy ra khi tải dữ liệu');
        console.error('Error fetching grade subjects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.lop]);

  // Map GradeSubjectDtos sang format cho SubjectSection
  const mapToSubjectSectionData = (gradeSubject: GradeSubjectDtos) => {
    // Xử lý cả PascalCase và camelCase từ API
    const subjectName = (gradeSubject as any).Name || (gradeSubject as any).name || 
                       gradeSubject.CodeObject || (gradeSubject as any).codeObject || 
                       'Chưa có tên';
    const subjectNXBS = gradeSubject.SubjectNXBS || (gradeSubject as any).subjectNXBS || [];
    
    return {
      title: `Môn ${subjectName}`,
      resources: subjectNXBS.map((subjectNXB: any) => ({
        title: subjectNXB.Name || subjectNXB.name || 'Chưa có tên',
        href: subjectNXB.Href || subjectNXB.href || '#',
        bookCat: 'book-cat-0', // Default book category
      })),
    };
  };

  if (loading) {
    return (
      <div className='categories-page'>
        <div className='main clearfix'>
          <div className='box_center clearfix'>
            <div className='left'>
              <div className={'content-page-left'}>
                <div className='n-form-sub top20 grade-page'>
                  <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='categories-page'>
        <div className='main clearfix'>
          <div className='box_center clearfix'>
            <div className='left'>
              <div className={'content-page-left'}>
                <div className='n-form-sub top20 grade-page'>
                  <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                    Lỗi: {error}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='categories-page'>
      <div className='main clearfix'>
        <div className='box_center clearfix'>
          <div className='left'>
            {/* <DescriptionSection 
              description={DESCRIPTION}
            /> */}

            <div className={'content-page-left'}>
              {/* Description Section */}

              {/* Book Category Dropdown & Rating Section */}
              {/* <div className={'controlsSection'}>
                <BookCategoryDropdown categories={BOOK_CATEGORIES} />
                <RatingSection classId="12" rating={3.6} totalVotes={1766} />
              </div> */}

              {/* Main Content */}
              <div className='n-form-sub top20 grade-page'>
                <h1>GIẢI BÀI TẬP SÁCH GIÁO KHOA, SÁCH BÀI TẬP LỚP {params.lop}</h1>
                <br />
                {/* Subjects Grid */}
                {gradeSubjects.length > 0 ? (
                  gradeSubjects.map((gradeSubject, index) => {
                    const sectionData = mapToSubjectSectionData(gradeSubject);
                    return (
                      <SubjectSection
                        key={gradeSubject.Id || `subject-${index}`}
                        title={sectionData.title}
                        resources={sectionData.resources}
                      />
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    Không tìm thấy dữ liệu môn học.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
