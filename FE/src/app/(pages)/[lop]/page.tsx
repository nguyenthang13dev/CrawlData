'use client';

import SubjectSection from '@/components/pages/ClassPage/SubjectSection/SubjectSection';
import { SUBJECTS_DATA } from '@/components/pages/ClassPage/data/classPageData';


import '../home.css';

import './page.css';

const DESCRIPTION = `Giải bài tập, soạn bài sách giáo khoa, sách bài tập lớp 12 môn Toán, Vật lý, Hóa học, Sinh học, Ngữ Văn, Tiếng Anh, Lịch sử, Địa lý, GDCD, Tin học, Công nghệ. Đáp án và lời giải chi tiết các câu hỏi bài tập, đề kiểm tra 15 phút, 45 phút (1 tiết), đề thi học kì 1 và 2 (đề kiểm tra học kì 1 và 2) các môn lớp 12.`;

export default function ClassPage() {
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
                            <h1 >GIẢI BÀI TẬP SÁCH GIÁO KHOA, SÁCH BÀI TẬP LỚP 12</h1>
                            <br />
                            {/* Subjects Grid */}
                            {SUBJECTS_DATA.map((subject) => (
                                <SubjectSection
                                key={subject.name}
                                title={subject.title}
                                resources={subject.resources}
                                />
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
}
