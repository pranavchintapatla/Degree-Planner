import {
  CourseDict,
  PlannerInputType,
  ReqAssociation,
} from '../../helpers/TypeInterfaces';
import Semester from '../Semester/Semester';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Year.scss';
import { useEffect, useState } from 'react';

interface YearProps {
  courses: CourseDict;
  yearIndex: number;
  semesters: string[][];
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  enabledSemesters: string[];
}

const YearNumberToWordMap: Map<number, string> = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
  [4, 'Four'],
  [5, 'Five'],
]);

const semesterMap: Map<number, string> = new Map([
  [0, 'SS'],
  [1, 'S1'],
  [2, 'S2'],
]);

const getNumberAsWord = (number: number): string => {
  return YearNumberToWordMap.get(number) || number.toString();
};

const Year = ({
  courses,
  yearIndex,
  semesters,
  reqAssociations,
  setCourses,
  setPlannerInput,
  enabledSemesters,
}: YearProps) => {
  const [isEnableSummerSchool, setIsEnableSummerSchool] = useState(false);

  useEffect(() => {
    setIsEnableSummerSchool(!!semesters[0].length);
  }, [semesters]);

  const addSummerSchool = () => {
    setIsEnableSummerSchool(true);
  };

  const removeSummerSchool = () => {
    setPlannerInput((oldPlannerInput) => {
      const summerCourses = [...oldPlannerInput.Courses[yearIndex][0]];
      summerCourses.forEach((courseId) => {
        if (courseId) {
          courses[courseId].section = '';
        }
      });
      oldPlannerInput.Courses[yearIndex][0] = [];
      return { ...oldPlannerInput };
    });

    setIsEnableSummerSchool(false);
  };

  return (
    <div className="Year">
      <div className="Year__title-block">
        <div>YEAR</div>
        <div>{getNumberAsWord(yearIndex + 1).toUpperCase()}</div>
        {!isEnableSummerSchool && (
          <button className="Year__add-ss-button" onClick={addSummerSchool}>
            <FaPlus />
          </button>
        )}
        {isEnableSummerSchool && (
          <button className="Year__add-ss-button" onClick={removeSummerSchool}>
            <FaMinus />
          </button>
        )}
      </div>
      <div className="Year__semesters">
        {semesters.map(
          (semester, semesterIndex) =>
            (isEnableSummerSchool || semesterIndex !== 0) && (
              <Semester
                courses={courses}
                yearIndex={yearIndex}
                semester={semester}
                semesterIndex={semesterIndex}
                reqAssociations={reqAssociations}
                setCourses={setCourses}
                setPlannerInput={setPlannerInput}
                key={`y${yearIndex}s${semesterIndex}`}
                disabled={
                  !enabledSemesters.includes(
                    semesterMap.get(semesterIndex) || ''
                  )
                }
              />
            )
        )}
      </div>
    </div>
  );
};

export default Year;
