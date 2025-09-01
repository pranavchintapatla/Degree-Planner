import React from 'react';
import { addYear } from '../../helpers/PlannerInputHelper';
import {
  CourseDict,
  PlannerInputType,
  ReqAssociation,
} from '../../helpers/TypeInterfaces';
import Year from '../Year/Year';
import './Years.scss';

const MAX_YEARS = 5;

interface YearsProps {
  plannerInput: PlannerInputType;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  courses: CourseDict;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  reqAssociations: ReqAssociation;
  enabledSemesters: string[];
}

const Years = ({
  plannerInput,
  setPlannerInput,
  courses,
  setCourses,
  reqAssociations,
  enabledSemesters,
}: YearsProps) => {
  return (
    <div className="Years">
      {plannerInput.Courses.map((semesters, yearIndex) => {
        return (
          <div className="Years__item" key={`Year ${yearIndex}`}>
            <Year
              courses={courses}
              yearIndex={yearIndex}
              semesters={semesters}
              reqAssociations={reqAssociations}
              setCourses={setCourses}
              setPlannerInput={setPlannerInput}
              enabledSemesters={enabledSemesters}
              key={`Year ${yearIndex}`}
            />
          </div>
        );
      })}
      {plannerInput.Courses.length < MAX_YEARS && (
        <button
          className="Years__add-year-button btn btn--dark-blue"
          onClick={() => addYear(setPlannerInput)}
        >
          Add Year
        </button>
      )}
    </div>
  );
};

export default Years;
