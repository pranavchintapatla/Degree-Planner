import classNames from 'classnames';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  CourseDict,
  PlannerInputType,
  ReqAssociation,
} from '../../helpers/TypeInterfaces';
import CourseSlot from '../CourseSlot/CourseSlot';
import './Semester.scss';

interface SemesterProps {
  courses: CourseDict;
  semester: string[];
  yearIndex: number;
  semesterIndex: number;
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  disabled: boolean;
}
const SemesterNumberToWordMap: Map<number, string> = new Map([
  [0, 'SS'],
  [1, 'S1'],
  [2, 'S2'],
]);

const getNumberAsWordSemester = (number: number): string => {
  return SemesterNumberToWordMap.get(number) || number.toString();
};

const Semester = ({
  courses,
  semester,
  yearIndex,
  semesterIndex,
  reqAssociations,
  setCourses,
  setPlannerInput,
  disabled,
}: SemesterProps) => {
  const isSummerSchool = semesterIndex === 0;

  const [slots, setSlots] = useState(isSummerSchool ? [0, 1] : [0, 1, 2, 3]);

  let isSlotsFull =
    Object.values(semester).length === 4 &&
    slots.length === 4 &&
    semester.every((course) => !!course);

  const addFifthSlotHandler = () => {
    isSlotsFull = false;
    setSlots([...slots, slots.length]);
  };

  const removeFifthSlotHandler = () => {
    setSlots([0, 1, 2, 3]);

    setPlannerInput((oldPlannerInput) => {
      const removedCourseId =
        oldPlannerInput.Courses[yearIndex][semesterIndex][4];

      oldPlannerInput.Courses[yearIndex][semesterIndex] =
        oldPlannerInput.Courses[yearIndex][semesterIndex].slice(0, 4);

      if (removedCourseId) {
        courses[removedCourseId].section = '';
      }

      return {
        ...oldPlannerInput,
      };
    });
  };

  return (
    <div
      className={classNames({
        Semester: true,
        'Semester--ss': isSummerSchool,
      })}
    >
      <div className="Semester__title-block">
        {getNumberAsWordSemester(semesterIndex)}
      </div>
      <div className="Semester__courses">
        {slots.map((slotIndex) => {
          const courseId = slotIndex in semester ? semester[slotIndex] : '';

          return (
            <CourseSlot
              courses={courseId ? [courses[courseId]] : []}
              semesterIndex={semesterIndex}
              droppableId={`${yearIndex},${semesterIndex},${slotIndex}`}
              course={courseId}
              reqAssociations={reqAssociations}
              setCourses={setCourses}
              setPlannerInput={setPlannerInput}
              key={`${yearIndex},${semesterIndex},${slotIndex}`}
              disabled={disabled}
            />
          );
        })}
      </div>

      {isSlotsFull && (
        <button
          className="Semester__add-course-slot"
          onClick={addFifthSlotHandler}
        >
          <FaPlus />
        </button>
      )}
      {slots.length === 5 && (
        <button
          className="Semester__add-course-slot"
          onClick={removeFifthSlotHandler}
        >
          <FaMinus />
        </button>
      )}
    </div>
  );
};

export default Semester;
