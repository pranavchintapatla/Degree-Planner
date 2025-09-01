

export const loadPlannerStaff = async (id:string) => {
    return fetch('https://localhost:5001/api/Planner/GetStudentPlanner/' + id, {
    cache: 'reload',
  }).then((response) => response.json());
};