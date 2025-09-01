import { getPlannerCourseIds } from '../helpers/PlannerInputHelper';
import { CourseDict, PlannerInputType } from '../helpers/TypeInterfaces';

interface PrerequisitesProps {
  courses: CourseDict;
  plannerInput: PlannerInputType;
}

const Prerequisites = ({ courses, plannerInput }: PrerequisitesProps) => {
  const prerequisites: JSX.Element[] = [];

  const plannerCourseIds = getPlannerCourseIds(plannerInput);

  plannerCourseIds.forEach((courseId) => {
    const course = courses[courseId];

    if (
      course &&
      course.prerequisite &&
      course.prerequisite_raw &&
      !course.prereqs_met.result
    ) {
      prerequisites.push(
        <p key={'prereq' + course.courseid}>
          Prerequisite not satisifed for {course.courseid}:{' '}
          {course.prerequisite_raw}
        </p>
      );
    }
  });

  return prerequisites.length > 0 ? (
    <div className="prerequisites">
      <h3>Unmet Prerequisites</h3>
      {prerequisites}
    </div>
  ) : (
    <></>
  );
};

export default Prerequisites;
