import { CourseDict, ReqAssociation } from './TypeInterfaces';

const updateRecommended = (
  courses: CourseDict,
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>,
  reqAssociations: ReqAssociation
) => {
  Object.entries(courses).forEach(([courseid, course]) => {
    course.isRecommended = courseid in reqAssociations;
  });

  setCourses(courses);
};

export default updateRecommended;
