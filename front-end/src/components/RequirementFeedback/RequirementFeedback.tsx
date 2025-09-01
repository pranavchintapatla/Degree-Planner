import {
  CheckResult,
  CourseDict,
  DegreeType,
  MajorType,
  PlannerInputType,
} from '../../helpers/TypeInterfaces';
import Prerequisites from '../Prerequisites';
import Requirements from '../Requirements/Requirements';
import './RequirementFeedback.scss';

interface RequirementFeedbackProps {
  courses: CourseDict;
  plannerInput: PlannerInputType;
  degreeType: DegreeType;
  majors: MajorType[];
  bsc_reqs_input: any; //Change this
  degreeReqState: CheckResult;
  specialisations: MajorType[];
}

const RequirementFeedback = ({
  courses,
  plannerInput,
  degreeType,
  majors,
  bsc_reqs_input,
  degreeReqState,
  specialisations,
}: RequirementFeedbackProps) => {
  return (
    <div className="RequirementFeedback">
      <div className="RequirementFeedback__majors">
        {degreeType === DegreeType.SPECIALISATION &&
          plannerInput.Majors.map((majorTitle) => {
            const specialisation: MajorType | undefined = specialisations.find(
              (m) => m.title === majorTitle
            );

            if (!specialisation || specialisation.requirements.length === 0) {
              return null;
            }

            return (
              <Requirements
                requirements={specialisation.requirements}
                result={Boolean(specialisation.requirementState?.result)}
                subresults={specialisation.requirementState?.subresults || []}
                title={`${specialisation.title} specialisation requirements`}
                key={specialisation.title}
              />
            );
          })}
        {degreeType === DegreeType.MAJORS &&
          plannerInput.Majors.map((majorTitle) => {
            const major: MajorType | undefined = majors.find(
              (m) => m.title === majorTitle
            );

            if (!major || major.requirements.length === 0) {
              return null;
            }

            return (
              <Requirements
                requirements={major.requirements}
                result={Boolean(major.requirementState?.result)}
                subresults={major.requirementState?.subresults || []}
                title={`${major.title} major requirements`}
                key={major.title}
              />
            );
          })}
      </div>
      <div className="RequirementFeedback__degree">
        <Requirements
          requirements={bsc_reqs_input}
          result={degreeReqState.result}
          subresults={degreeReqState.subresults || []}
          title={'Degree requirements'}
        />
      </div>
      <div className="RequirementFeedback__prerequisites">
        <Prerequisites courses={courses} plannerInput={plannerInput} />
      </div>
    </div>
  );
};

export default RequirementFeedback;
