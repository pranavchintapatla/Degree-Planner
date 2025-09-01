import checkReq from './CheckRequirements';
import {
  CourseDict,
  PlannerInputType,
  ReqAssociation,
  MajorType,
} from './TypeInterfaces';

const updateMajorRequirements = (
  setMajors: React.Dispatch<React.SetStateAction<MajorType[]>>,
  setReqAssociations: React.Dispatch<React.SetStateAction<ReqAssociation>>,
  courses: CourseDict,
  plannerInput: PlannerInputType
) => {
  setMajors((oldMajors) => {
    return oldMajors.map((oldMajor) => {
      return {
        ...oldMajor,
        requirementState: plannerInput.Majors.includes(oldMajor.title)
          ? checkReq(
              oldMajor.requirements,
              'Any',
              courses,
              oldMajors,
              oldMajors,
              setReqAssociations,
              plannerInput
            )
          : oldMajor.requirementState,
      };
    });
  });
};

export default updateMajorRequirements;
