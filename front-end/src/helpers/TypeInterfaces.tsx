export interface MajorInputType {
  title: string;
  requirements: (string | (string | string[])[])[];
  paths?: MajorInputType[];
  requirements_raw: string;
}

export interface MajorType extends MajorInputType {
  requirementState?: CheckResult;
  parent?: string;
}

export interface PlannerInputType {
  Id: string | null;
  Courses: string[][][]; // [year][semester][course]
  MajorType: string;
  Majors: string[];
  StartYear: number;
  StartSemester: number;
  Concessions?: string[];
}

interface BaseCourseType {
  courseid: string;
  coursename: string;
  description: string;
  subject: string;
  year: string;
  requirements: string;
  prerequisite_raw?: string;
  prerequisite?: string | (string | (string | (string | string[])[])[])[];
  restriction_raw?: string;
  restriction?: string | (string | (string | (string | string[])[])[])[];
  other_requirements_raw?: string;
  other_requirements?: string | (string | (string | string[])[])[];
}

export interface InputCourseType extends BaseCourseType {
  term: string;
  url: string;
  year: string;
}

export interface InternalCourseType extends BaseCourseType {
  terms: string[];
  urls: string[];
  years: string[];

  isRecommended: boolean;

  schedule: FacultyType;
  section: CoursesType | string;
  prereqs_met: CheckResult;
  unrestricted: CheckResult;
}

export interface CourseDict {
  [courseid: string]: InternalCourseType;
}

export interface CoursesByYearDict {
  [year: number]: CourseDict;
}

export interface CheckResult {
  req: string;
  result: boolean;
  subresults?: CheckResult[];
  count?: number;
}

export interface ReqAssociation {
  [courseid: string]: string;
}

export interface StaffMajor {
  title: string;
  requirements: (string | (string | string[])[])[];
  requirements_raw: string;
  paths: StaffPath[];
}

export interface StaffPath {
  title?: string;
  requirements?: (string | (string | string[])[])[];
  requirements_raw?: string;
}

export interface StaffModule {
  title: string;
  note?: string;
  requirements: (string | (string | string[])[])[];
  requirements_raw: string;
}

export interface StaffSpecialisation {
  title: string;
  note?: string;
  requirements: (string | (string | string[])[])[];
  requirements_raw: string;
  paths: StaffPath[];
}

export interface StaffCourseType {
  courseid: string;
  coursename: string;
  description: string;
  subject: string;
  year: string;
  term: string;
  url: string;
  prerequisite_raw?: string;
  prerequisite?: string | (string | (string | (string | string[])[])[])[];
  restriction_raw?: string;
  restriction?: string | (string | (string | (string | string[])[])[])[];
  other_requirements_raw?: string;
  other_requirements?: string | (string | (string | string[])[])[];
}

export interface SubjectDict {
  [subject: string]: {
    code: string;
    courses: string[];
  };
}

export type Requirement =
  | string
  | (string | (string | (string | string[])[])[])[];

enum All {
  ALL = 'All',
}

export enum Term {
  SS = 'SS',
  S1 = 'S1',
  S2 = 'S2',
}
export const FilterTerm = { ...All, ...Term };

export enum CoursesType {
  ALL = 'All',
  RECOMMENDED = 'Recommended',
}

export enum DegreeType {
  MAJORS = 'Majors',
  SPECIALISATION = 'Specialisation',
}

export enum FacultyType {
  ARTS = 'arts',
  BUSINESS_AND_ECONOMICS = 'business-and-economics',
  CREATIVE_ARTS_AND_INDUSTRIES = 'creative-arts-and-industries',
  EDUCATION_AND_SOCIAL_WORK = 'education-and-social-work',
  ENGINEERING = 'engineering',
  GENEDS = 'geneds',
  LAW = 'law',
  MEDICAL_AND_HEALTH_SCIENCES = 'medical-and-health-sciences',
  SCIENCE = 'science',
}
