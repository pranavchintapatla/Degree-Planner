import React, { useState } from 'react';
import Courses from '../components/Courses/Courses';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  CheckResult,
  CourseDict,
  DegreeType,
  PlannerInputType,
  MajorType,
  ReqAssociation,
} from '../helpers/TypeInterfaces';
import { onDragEnd } from '../helpers/DragDropHelpers';
import Years from '../components/Years/Years';
import Settings from '../components/Settings/Settings';
import PlannerOptions from '../components/PlannerOptions/PlannerOptions';
import RequirementFeedback from '../components/RequirementFeedback/RequirementFeedback';

interface PlannerProps {
  courses: CourseDict;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  reqAssociations: ReqAssociation;
  majors: MajorType[];
  plannerInput: PlannerInputType;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  bsc_reqs_input: any; //Change this
  degreeReqState: CheckResult;
  years: number[];
  setYear: React.Dispatch<React.SetStateAction<number>>;
  degreeType: DegreeType;
  setDegreeType: React.Dispatch<React.SetStateAction<DegreeType>>;
  specialisations: MajorType[];
}

const PlannerPage = ({
  courses,
  setCourses,
  reqAssociations,
  majors,
  plannerInput,
  setPlannerInput,
  bsc_reqs_input,
  degreeReqState,
  years,
  setYear,
  degreeType,
  setDegreeType,
  specialisations,
}: PlannerProps) => {
  const [enabledSemesters, setEnabledSemesters] = useState(['SS', 'S1', 'S2']);
  const [filter, setFilter] = useState('');

  // actual planner page component itself
  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => {
          setEnabledSemesters(['SS', 'S1', 'S2']);
          onDragEnd(result, setCourses, setPlannerInput);
        }}
        onDragStart={(result) => {
          const courseId = result.draggableId;

          if (!(courseId in courses)) {
            return;
          }

          const course = courses[courseId];
          setEnabledSemesters(course.terms);
        }}
      >
        <div className="container" key="container">
          <div className="grid">
            <div className="settings">
              <Settings
                majors={majors}
                plannerInput={plannerInput}
                setPlannerInput={setPlannerInput}
                specialisations={specialisations}
                degreeType={degreeType}
                setDegreeType={setDegreeType}
                years={years}
                setYear={setYear}
              />
            </div>

            <div className="plannerOptions">
              <PlannerOptions
                plannerInput={plannerInput}
                setPlannerInput={setPlannerInput}
              />
            </div>

            <div className="years">
              <Years
                plannerInput={plannerInput}
                setPlannerInput={setPlannerInput}
                courses={courses}
                setCourses={setCourses}
                reqAssociations={reqAssociations}
                enabledSemesters={enabledSemesters}
              />
            </div>

            <div className="courses">
              <Courses
                courses={courses}
                title="Courses"
                reqAssociations={reqAssociations}
                setCourses={setCourses}
                filter={filter}
                setFilter={setFilter}
                setPlannerInput={setPlannerInput}
              />
            </div>

            <div className="requirementFeedback">
              <RequirementFeedback
                courses={courses}
                plannerInput={plannerInput}
                degreeType={degreeType}
                majors={majors}
                bsc_reqs_input={bsc_reqs_input}
                degreeReqState={degreeReqState}
                specialisations={specialisations}
              />
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default PlannerPage;
