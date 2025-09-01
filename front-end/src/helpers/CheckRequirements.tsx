import { getPlannerCourseIds } from './PlannerInputHelper';
import {
  CheckResult,
  CourseDict,
  CoursesType,
  PlannerInputType,
  ReqAssociation,
  FacultyType,
  MajorType,
} from './TypeInterfaces';

const checkOr = (
  or_reqs: (string | (string | (string | string[])[])[])[],
  course_section: string,
  courses: CourseDict,
  majors: MajorType[],
  specialisations: MajorType[],
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  plannerInput: PlannerInputType
): CheckResult => {
  let result = false;

  const subresults: CheckResult[] = or_reqs.map((or_req) => {
    const subresult = checkReq(
      or_req,
      course_section,
      courses,
      majors,
      specialisations,
      setReqAssociations,
      plannerInput
    );

    if (subresult.result) {
      result = true;
    }

    return subresult;
  });

  return {
    req: 'or' + or_reqs,
    result: result,
    subresults: subresults,
  };
};

const checkAnd = (
  and_reqs: (string | (string | (string | string[])[])[])[],
  course_section: string,
  courses: CourseDict,
  majors: MajorType[],
  specialisations: MajorType[],
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  plannerInput: PlannerInputType
): CheckResult => {
  let result = true;
  const subresults = and_reqs.map((and_req) => {
    const subresult = checkReq(
      and_req,
      course_section,
      courses,
      majors,
      specialisations,
      setReqAssociations,
      plannerInput
    );

    if (!subresult.result) {
      result = false;
    }

    return subresult;
  });

  return {
    req: 'and' + and_reqs,
    result: result,
    subresults: subresults,
  };
};

const checkRangeCourses = (
  course_range: string,
  course_section: string,
  courses: CourseDict,
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>
): CheckResult => {
  const [subject_code, range] = course_range.split(' ');
  const [start, end] = range.split('-');
  let result = false;
  let count = 0;
  const subresults: CheckResult[] = [];

  for (let i = Number(start); i <= Number(end); i++) {
    const course = `${subject_code} ${i}`;

    if (course in courses) {
      const subresult = checkCourse(
        course,
        course_section,
        courses,
        setReqAssociations
      );

      if (subresult.result) {
        count += 15;
        result = true;
      }

      subresults.push(subresult);
    }
  }

  return {
    req: course_range,
    result: result,
    subresults: subresults,
    count: count,
  };
};

const checkCourse = (
  course: string,
  course_section: string,
  courses: CourseDict,
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>
): CheckResult => {
  if (course.includes('-'))
    return checkRangeCourses(
      course,
      course_section,
      courses,
      setReqAssociations
    );

  setReqAssociations((old) => {
    return {
      ...old,
      [course]: CoursesType.RECOMMENDED,
    };
  });

  const result =
    course in courses &&
    ((/\d,\d,\d/.test(courses[course].section) &&
      courses[course].section.slice(0, 3) < course_section.slice(0, 3)) ||
      courses[course].section === 'Concessions');

  return {
    req: course,
    result: result,
    count: result ? 15 : 0,
  };
};

const checkPoints = (
  points: number,
  course_section: string,
  req_courses: string[],
  courses: CourseDict,
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>
): CheckResult => {
  let count = 0;
  const subresults = req_courses.map((course) => {
    const subresult = checkCourse(
      course,
      course_section,
      courses,
      setReqAssociations
    );
    if (subresult.result && subresult.count) {
      count += subresult.count;
    }
    return subresult;
  });
  return {
    req: `${points} from ${req_courses}`,
    result: count >= points,
    subresults: subresults,
    count: count,
  };
};

const checkPointsAt = (
  req: string[],
  course_section: string,
  courses: CourseDict,
  plannerInput: PlannerInputType
): CheckResult => {
  let count = 0;
  const [points, raw_stages] = req[0].split(':');
  const stages: boolean[] = [];
  stages[1] = / I$/.test(raw_stages) || / I /.test(raw_stages);
  stages[2] = / II$/.test(raw_stages) || / II /.test(raw_stages);
  stages[3] = / III$/.test(raw_stages) || / III /.test(raw_stages);
  const subjects = req.slice(1);
  if (subjects.includes('non-bsc'))
    subjects.push(
      ...[
        FacultyType.ARTS,
        FacultyType.BUSINESS_AND_ECONOMICS,
        FacultyType.CREATIVE_ARTS_AND_INDUSTRIES,
        FacultyType.EDUCATION_AND_SOCIAL_WORK,
        FacultyType.ENGINEERING,
        FacultyType.LAW,
        FacultyType.MEDICAL_AND_HEALTH_SCIENCES,
      ]
    );

  const plannerCourseIds = getPlannerCourseIds(plannerInput);

  plannerCourseIds.forEach((courseId) => {
    if (courses[courseId].section.slice(0, 3) >= course_section.slice(0, 3))
      return;
    const course_stage_match = courseId.match(/(\d)\d\d/);
    const course_stage = course_stage_match ? course_stage_match[1] : '0';

    if (courseId in courses) {
      if (subjects.length === 0 && stages[Number(course_stage)]) {
        count += 15;
      }

      subjects.forEach((subject) => {
        if (
          (courses[courseId].subject === subject ||
            subject === courses[courseId].schedule) &&
          stages[Number(course_stage)]
        ) {
          count += 15;
        }
      });
    }
  });

  return {
    req: `${points} at ${raw_stages}`,
    result: count >= Number(points),
    count: count,
  };
};

const checkGradeCourse = (
  req: (string | string[])[],
  course_section: string,
  courses: CourseDict,
  majors: MajorType[],
  specialisations: MajorType[],
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  plannerInput: PlannerInputType
): CheckResult => {
  return checkReq(
    req[1],
    course_section,
    courses,
    majors,
    specialisations,
    setReqAssociations,
    plannerInput
  );
};

const checkCapstone = (plannerInput: PlannerInputType): CheckResult => {
  const plannerCourseIds = getPlannerCourseIds(plannerInput);

  const result = plannerCourseIds.some((courseId) => {
    return /^[A-Z]+ 399$/.test(courseId);
  });

  return {
    req: 'capstone',
    result: result,
  };
};

const checkMajors = (
  plannerInput: PlannerInputType,
  majors: MajorType[]
): CheckResult => {
  let result = false;
  if (plannerInput.MajorType === 'Majors')
    plannerInput.Majors.forEach((plannerMajor) => {
      majors.forEach((major) => {
        if (major.title === plannerMajor) {
          if (major.requirementState?.result) result = true;
        }
      });
    });
  return {
    req: 'major',
    result: result,
  };
};

const checkSpecialisation = (
  plannerInput: PlannerInputType,
  specialisations: MajorType[]
): CheckResult => {
  let result = false;
  if (plannerInput.MajorType === 'Specialisation')
    plannerInput.Majors.forEach((plannerMajor) => {
      specialisations.forEach((specialisation) => {
        if (specialisation.title === plannerMajor) {
          if (specialisation.requirementState?.result) result = true;
        }
      });
    });
  return {
    req: 'specialisation',
    result: result,
  };
};

const checkMinSubjects = (
  num: number,
  schedule: string,
  courses: CourseDict,
  plannerInput: PlannerInputType
): CheckResult => {
  const subjects = new Set();

  const plannerCourseIds = getPlannerCourseIds(plannerInput);

  plannerCourseIds.forEach((courseId) => {
    const subject = courseId.split(' ')[0];

    if (
      subject !== 'empty' &&
      subject !== 'exclude' &&
      schedule === courses[courseId].schedule
    ) {
      subjects.add(subject);
    }
  });

  return {
    req: `minimum ${num} subjects`,
    count: subjects.size,
    result: subjects.size >= num,
  };
};

const checkReq = (
  req: string | (string | (string | (string | string[])[])[])[],
  course_section: string,
  courses: CourseDict,
  majors: MajorType[],
  specialisations: MajorType[],
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  plannerInput: PlannerInputType
): CheckResult => {
  // return if requirement is empty
  if (req.length < 1) {
    return {
      req: 'empty requirement',
      result: false,
    };
  }
  if (req.length === 1 && !isNaN(Number(req[0]))) req = req[0];
  if (typeof req == 'string') {
    // if requirement is simply a number of points
    if (!isNaN(Number(req))) {
      return checkPointsAt(
        [req + ':Stage I or II or III'],
        course_section,
        courses,
        plannerInput
      );
    }
    // if requirement is a course
    if (/^[A-Z]+ \d\d\d[A-B,G]?$/.test(req)) {
      return checkCourse(req, course_section, courses, setReqAssociations);
    }
    if (req.includes('GPA')) {
      return {
        req: req,
        result: true,
      };
    }
    if (req.includes('approval')) {
      return {
        req: req,
        result: true,
      };
    }
    if (req.includes('NCEA') || req.includes('CIE') || req.includes('IB')) {
      return {
        req: req,
        result: true,
      };
    }
    if (req.includes('capstone')) {
      return checkCapstone(plannerInput);
    }
    if (req.includes('major')) {
      return checkMajors(plannerInput, majors);
    }
    if (req.includes('specialisation')) {
      return checkSpecialisation(plannerInput, specialisations);
    }
    return {
      req: req,
      result: true,
    };
  }
  if (typeof req[0] == 'string') {
    const inputs = req.slice(1);
    if (req[0] === 'and') {
      return checkAnd(
        inputs,
        course_section,
        courses,
        majors,
        specialisations,
        setReqAssociations,
        plannerInput
      );
    }
    if (req[0] === 'or') {
      return checkOr(
        inputs,
        course_section,
        courses,
        majors,
        specialisations,
        setReqAssociations,
        plannerInput
      );
    }
    if (!isNaN(Number(req[0]))) {
      return checkPoints(
        Number(req[0]),
        course_section,
        inputs as string[],
        courses,
        setReqAssociations
      );
    }
    if (/^\d\d+:Stage I+/.test(req[0])) {
      return checkPointsAt(
        req as string[],
        course_section,
        courses,
        plannerInput
      );
    }
    if (/^[A-D][^a-z]?$/.test(req[0])) {
      return checkGradeCourse(
        req as (string | string[])[],
        course_section,
        courses,
        majors,
        specialisations,
        setReqAssociations,
        plannerInput
      );
    }
    if (/Concurrent enrolment/.test(req[0])) {
      const new_sem = Number(course_section[2]) + 1;
      const new_year = Number(course_section[0]) + Math.floor(new_sem / 3);
      const next_sem = `${new_year},${new_sem % 3},${0}`;
      return checkReq(
        ['and', ...inputs],
        next_sem,
        courses,
        majors,
        specialisations,
        setReqAssociations,
        plannerInput
      );
    }

    if (/MinSubjects:\d+/.test(req[0])) {
      const number = Number(req[0].split(':')[1]);
      return checkMinSubjects(number, req[1] as string, courses, plannerInput);
    }

    if (/^<=\d+/.test(req[0])) {
      const reverse_result = checkPointsAt(
        [req[0].slice(2), ...(req.slice(1) as string[])],
        course_section,
        courses,
        plannerInput
      );
      return {
        ...reverse_result,
        result: !reverse_result.result,
      };
    }

    return {
      req: req[0],
      result: true,
    };
  }

  return {
    req: 'unknown requirement',
    result: true,
  };
};

export default checkReq;
