import { DropResult } from 'react-beautiful-dnd';
import { CourseDict, PlannerInputType } from './TypeInterfaces';

export const updateCourseSlot = (
  slotId: string,
  courseId: string,
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>
) => {
  const yearIndex = Number(slotId.split(',')[0]);
  const semesterIndex = Number(slotId.split(',')[1]);
  const courseIndex = Number(slotId.split(',')[2]);

  setPlannerInput((OldPlanner) => {
    OldPlanner.Courses[yearIndex][semesterIndex][courseIndex] = courseId;

    return { ...OldPlanner };
  });
};

const isSlotId = (slotId: string) => /^\d,\d,\d$/.test(slotId);

// This gets called whenever something is dropped
export const onDragEnd = (
  result: DropResult,
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>,
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>
) => {
  const { destination, source, draggableId } = result;

  // Check if movement has occurred, and if not return
  if (!destination) {
    return;
  }

  const destinationId = destination.droppableId;
  const sourceId = source.droppableId;

  if (destinationId === sourceId) {
    return;
  }

  if (isSlotId(destinationId)) {
    updateCourseSlot(destinationId, draggableId, setPlannerInput);
  }

  if (isSlotId(sourceId)) {
    updateCourseSlot(sourceId, '', setPlannerInput);
  }

  setCourses((oldCourses) => {
    return {
      ...oldCourses,
      [draggableId]: {
        ...oldCourses[draggableId],
        section: destinationId,
      },
    };
  });
};
