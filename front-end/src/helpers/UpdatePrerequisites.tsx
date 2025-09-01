import checkReq from './CheckRequirements';
import checkRestrictions from './CheckRestrictions';
import { getPlannerCourseIds } from './PlannerInputHelper';
import {
  CheckResult,
  CourseDict,
  PlannerInputType,
  ReqAssociation,
  SubjectDict,
} from './TypeInterfaces';

const updateCoursePrerequisites = (
  subjects: SubjectDict,
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>,
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  plannerInput: PlannerInputType
) => {
  setCourses((oldCourses) => {
    const coursesToUpdate: string[] = getPlannerCourseIds(plannerInput);

    if (coursesToUpdate.length === 0) {
      return oldCourses;
    }

    coursesToUpdate.forEach((courseId) => {
      const course = oldCourses[courseId];

      if (!course || (!course.prerequisite && !course.restriction)) {
        return;
      }

      let prereqs_met: CheckResult = {
        req: 'No pre-reqs',
        result: true,
      };

      if (course.prerequisite) {
        prereqs_met = checkReq(
          course.prerequisite,
          course.section,
          oldCourses,
          [],
          [],
          setReqAssociations,
          plannerInput
        );
      }

      let unrestricted = { req: 'No restrictions', result: true };

      if (course.restriction) {
        unrestricted = checkRestrictions(
          course,
          oldCourses,
          subjects,
          plannerInput
        );
      }

      course.prereqs_met = prereqs_met;
      course.unrestricted = unrestricted;
    });

    return { ...oldCourses };
  });
};

export default updateCoursePrerequisites;
