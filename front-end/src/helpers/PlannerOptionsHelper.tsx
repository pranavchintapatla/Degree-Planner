import { PlannerInputType } from './TypeInterfaces';
import axios from 'axios';

//This helper function contains the functions for saving and loading planners

export const savePlanner = async (plannerInput: PlannerInputType) => {
  const id = sessionStorage.getItem('id');

  const planner = { ...plannerInput, Id: id };

  await axios.post('https://localhost:5001/api/Planner/CreateStudentPlanner', {
    Id: planner.Id,
    Courses: planner.Courses,
    MajorType: planner.MajorType,
    Majors: planner.Majors,
    StartYear: planner.StartYear,
    StartSemester: planner.StartSemester,
    Concessions: planner.Concessions,
  });
};

export const loadPlanner = async () => {
  const id = sessionStorage.getItem('id') || 'default_planner';

  const checkResponse = await axios.get(
    'https://localhost:5001/api/Planner/CheckStudentPlannerExists/' + id
  );

  if (!checkResponse.data) {
    console.log('No planner found');
    return require('../data/default_planner.json');
  }

  return fetch('https://localhost:5001/api/Planner/GetStudentPlanner/' + id, {
    cache: 'reload',
  }).then((response) => response.json());
};
