import {
  CourseDict,
  InputCourseType,
  MajorInputType,
  MajorType,
  SubjectDict,
  CoursesByYearDict,
  FacultyType,
} from './TypeInterfaces';

const readCourse = (
  course: InputCourseType,
  schedule: FacultyType,
  courses: CourseDict,
  subjects: SubjectDict
) => {
  if (course.courseid in courses) {
    courses[course.courseid].urls = [
      ...courses[course.courseid].urls,
      course.url,
    ];
    courses[course.courseid].terms = [
      ...courses[course.courseid].terms,
      course.term,
    ];
    courses[course.courseid].years = [
      ...courses[course.courseid].years,
      course.year,
    ];
  } else {
    courses[course.courseid] = {
      ...course,
      terms: [course.term],
      urls: [course.url],
      years: [course.year],
      schedule: schedule,
      isRecommended: false,
      section: '',
      prereqs_met: {
        req: 'unchecked',
        result: true,
      },
      unrestricted: {
        req: 'unchecked',
        result: true,
      },
    };

    if (course.subject in subjects) {
      subjects[course.subject].courses.push(course.courseid);
    } else {
      subjects[course.subject] = {
        code: course.courseid.split(' ')[0],
        courses: [course.courseid],
      };
    }
  }
};

export const parseCourseInput = (
  inputCourses: InputCourseType[][],
  setCoursesByYear: React.Dispatch<React.SetStateAction<CoursesByYearDict>>,
  setSubjects: React.Dispatch<React.SetStateAction<SubjectDict>>,
  year: number
) => {
  const courses: CourseDict = {};
  const subjects: SubjectDict = {};

  inputCourses.forEach((schedule, index) => {
    const schedule_name = Object.values(FacultyType)[index];
    schedule.forEach((course) => {
      readCourse(course, schedule_name, courses, subjects);
    });
  });

  setCoursesByYear((oldCoursesByYear) => {
    return { ...oldCoursesByYear, [year]: courses };
  });

  setSubjects(subjects);
};

export const parseMajorsInput = (majorsInput: MajorInputType[]) => {
  const majors: MajorType[] = [];

  majorsInput.forEach((majorInput: MajorInputType) => {
    if (majorInput.requirements_raw !== 'either of the following pathways')
      majors.push({
        ...majorInput,
      });

    const pathsToParse = majorInput?.paths || [];

    pathsToParse.forEach((pathToParse: MajorInputType) => {
      majors.push({
        ...pathToParse,
        title: `${majorInput.title} (${pathToParse.title})`,
      });
    });
  });

  return majors;
};
