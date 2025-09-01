import classNames from 'classnames';
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';
import {
  CourseDict,
  PlannerInputType,
  InternalCourseType,
  ReqAssociation,
} from '../../helpers/TypeInterfaces';
import Course from '../Course/Course';
import './CourseSlot.scss';

interface CourseSlotProps {
  courses: InternalCourseType[];
  semesterIndex: number;
  course: string;
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  disabled: boolean;
  droppableId: string;
}

const CourseSlot = ({
  courses,
  semesterIndex,
  reqAssociations,
  setCourses,
  setPlannerInput,
  disabled,
  droppableId,
}: CourseSlotProps) => {
  return (
    <Droppable
      droppableId={droppableId}
      isDropDisabled={courses.length >= 1 || disabled}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={classNames({
              CourseSlot: true,
              'CourseSlot--highlight': snapshot.isDraggingOver,
              'CourseSlot--disabled': disabled,
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {courses.map((course, index) => {
              // Create a course component for each of the courses in the array
              return (
                <Draggable
                  draggableId={course.courseid}
                  key={course.courseid}
                  index={index}
                  isDragDisabled={course.coursename === 'name'}
                >
                  {(provided: DraggableProvided) => (
                    <Course
                      semesterIndex={semesterIndex}
                      course={course}
                      index={index}
                      setCourses={setCourses}
                      setPlannerInput={setPlannerInput}
                      key={course.courseid}
                      reqAssociations={reqAssociations}
                      provided={provided}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default CourseSlot;
