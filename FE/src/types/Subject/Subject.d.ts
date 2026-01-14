import { EntityType, SearchBase, DropdownOption } from '../general';

export interface Subject extends EntityType {
  subjectName: string;
  code: string;
}

export interface SubjectSearch extends SearchBase {
  subjectName?: string;
  code?: string;
}

export interface SubjectCreateOrUpdate {
  id?: string;
  subjectName: string;
  code: string;
}

export interface SubjectNXB extends EntityType {
  name: string;
  href: string;
  subject?: string; // Guid? trong C# -> string | undefined trong TypeScript
}

export interface SubjectNXBSearch extends SearchBase {
  name?: string;
  href?: string;
  subject?: string;
}

export interface SubjectNXBCreateOrUpdate {
  id?: string;
  name: string;
  href: string;
  subject?: string;
}


export interface GradeSubjectDtos
{
    SubjectNXBS: SubjectNXBDto[];
    Id: string;
    Name: string;
    CodeObject: string;
} 

export interface SubjectNXBDto {
    Id: string;
    Name: string;
    Href: string;
    Subject: string;
}

export interface CourseDto {
    id: string;
    name: string;
    href: string;
    title: string;
}

export interface LessonDto {
    id: string;
    name: string;
    href: string;
    title: string;
    courseId?: string;
    [key: string]: any; // Allow other properties from backend
}

export interface ListCourseBySubjectDtos {
    courses: CourseDto[];
    idPubSub: string; // Guid trong C# -> string trong TypeScript
    title: string;
}

export interface ListLessonByCourseDtos {
    lessons: LessonDto[];
    courseId: string;
    title?: string;
}