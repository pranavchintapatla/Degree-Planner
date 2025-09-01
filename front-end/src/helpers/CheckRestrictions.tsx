import {
  CheckResult,
  CourseDict,
  PlannerInputType,
  InternalCourseType,
  SubjectDict,
} from './TypeInterfaces';

const flattenRestrictions = (
  restriction: string | (string | (string | (string | string[])[])[])[],
  subjects: SubjectDict,
  courseid: string,
  flat: string[] = []
) => {
  const exceptions: string[] = [];
  if (typeof restriction === 'string') {
    if (
      /^[A-Z]+ \d\d\d[A-B,G]?$/.test(restriction) &&
      !flat.includes(restriction)
    )
      flat.push(restriction);
    else if (restriction in subjects)
      flat.push(
        ...subjects[restriction].courses.filter(
          (value) => !flat.includes(value)
        )
      );
    else if (/^[A-Z]+ \d\d\d[A-B]?-\d\d\d[A-B,G]?$/.test(restriction)) {
      const [course_code, range] = restriction.split(' ');
      const [start, end] = range.split('-');
      Object.keys(subjects).every((subject_key) => {
        if (subjects[subject_key].code === course_code) {
          flat.push(
            ...subjects[subject_key].courses.filter(
              (value) =>
                value >= `${course_code} ${start}` &&
                value <= `${course_code} ${end}` &&
                !flat.includes(value)
            )
          );
          return false;
        }
        return true;
      });
    }
  } else {
    if (restriction[0] !== 'Exceptions') {
      restriction.forEach(
        (subrestriction) =>
          (flat = flattenRestrictions(subrestriction, subjects, courseid, flat))
      );
    } else {
      const except: string[] = restriction.slice(1) as string[];
      exceptions.push(...except);
    }
  }
  return flat.filter(
    (value) => value !== courseid && !exceptions.includes(value)
  );
};

const checkRestrictions = (
  course: InternalCourseType,
  courses: CourseDict,
  subjects: SubjectDict,
  plannerInput: PlannerInputType
): CheckResult => {
  const restrictedCourses = flattenRestrictions(
    course.restriction || '',
    subjects,
    course.courseid
  );

  const yearIndex = Number(course.section.split(',')[0]);
  const semesterIndex = Number(course.section.split(',')[1]);
  let result = true;

  const subresults: CheckResult[] = restrictedCourses.map(
    (restrictedCourseId) => {
      let subresult = false;

      if (
        restrictedCourseId in courses &&
        !isNaN(yearIndex) &&
        !isNaN(semesterIndex) &&
        plannerInput.Courses[yearIndex][semesterIndex].includes(
          restrictedCourseId
        )
      ) {
        subresult = true;
        result = false;
      }

      return {
        req: restrictedCourseId,
        result: subresult,
      };
    }
  );

  return {
    req: course.courseid + ' Restrictions',
    result: result,
    subresults: subresults,
  };
};

export default checkRestrictions;
