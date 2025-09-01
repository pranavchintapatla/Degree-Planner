import { PlannerInputType } from './TypeInterfaces';

export const getPlannerCourseIds = (
  plannerInput: PlannerInputType
): string[] => {
  const courseIds: string[] = [];

  plannerInput.Courses.forEach((year) => {
    year.forEach((semester) => {
      semester.forEach((courseId) => {
        if (!courseId) {
          return;
        }

        courseIds.push(courseId);
      });
    });
  });
  if (plannerInput.Concessions) courseIds.push(...plannerInput.Concessions);
  return courseIds;
};

export const getPlannerCourseIdsWithSlots = (
  plannerInput: PlannerInputType
): Record<string, string> => {
  const courseIdsWithSlots: Record<string, string> = {};

  if (plannerInput.Concessions)
    plannerInput.Concessions.forEach((courseId) => {
      courseIdsWithSlots[courseId] = 'Concessions';
    });

  plannerInput.Courses.forEach((year, yearIndex) => {
    year.forEach((semester, semesterIndex) => {
      semester.forEach((courseId, courseIndex) => {
        if (!courseId) {
          return;
        }

        courseIdsWithSlots[
          courseId
        ] = `${yearIndex},${semesterIndex},${courseIndex}`;
      });
    });
  });

  return courseIdsWithSlots;
};

export const addYear = (
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>
) => {
  setPlannerInput((oldPlanner) => {
    return {
      ...oldPlanner,
      Courses: [...oldPlanner.Courses, [[], [], []]],
    };
  });
};
