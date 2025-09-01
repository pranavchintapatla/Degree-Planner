import { useState, useEffect } from 'react';
import PlannerPage from './pages/PlannerPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Staff from './pages/Staff';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import CreateConcession from './pages/CreateConcession';
import EditMajor from './pages/EditMajor';
import EditSpecialisation from './pages/EditSpecialisation';
import CreateSpecialisation from './pages/CreateSpecialisation';
import CreateModule from './pages/CreateModule';
import EditModule from './pages/EditModule';
import CreateMajor from './pages/CreateMajor';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AccessError from './pages/AccessError';
import useToken from './helpers/LoginHelpers';
import {
  CheckResult,
  CourseDict,
  DegreeType,
  PlannerInputType,
  ReqAssociation,
  SubjectDict,
  FacultyType,
  CoursesByYearDict,
  MajorType,
  MajorInputType,
  InputCourseType,
} from './helpers/TypeInterfaces';
import axios from 'axios';
import updateMajorRequirements from './helpers/UpdateMajorRequirements';
import checkReq from './helpers/CheckRequirements';
import updateCoursePrerequisites from './helpers/UpdatePrerequisites';
import updateRecommended from './helpers/UpdateRecommended';
import ScrollToTop from './helpers/ScrollToTop';
import { getPlannerCourseIdsWithSlots } from './helpers/PlannerInputHelper';
import { parseCourseInput, parseMajorsInput } from './helpers/Parsers';
import { loadPlanner } from './helpers/PlannerOptionsHelper';

const App = () => {
  const { token, setToken } = useToken();

  const [plannerInput, setPlannerInput] = useState<PlannerInputType>({
    Id: 'default_planner',
    Courses: [
      [[], [], []],
      [[], [], []],
      [[], [], []],
    ],
    MajorType: DegreeType.MAJORS,
    Majors: ['Computer Science'],
    StartYear: 2022,
    StartSemester: 1,
    Concessions: [],
  });

  const [majors, setMajors] = useState<MajorType[]>([]);
  const [specialisations, setSpecialisations] = useState<MajorType[]>([]);
  const [modules, setModules] = useState<MajorType[]>([]);

  const [bscReqs, setBscReqs] = useState<(string | (string | string[])[])[]>(
    []
  );

  const [coursesByYear, setCoursesByYear] = useState<CoursesByYearDict>({});
  const [courses, setCourses] = useState<CourseDict>({});
  const [subjects, setSubjects] = useState<SubjectDict>({});
  const [reqAssociations, setReqAssociations] = useState<ReqAssociation>({});

  const [degreeType, setDegreeType] = useState<DegreeType>(DegreeType.MAJORS);
  const [degreeReqState, setDegreeReqState] = useState<CheckResult>({
    req: 'unchecked',
    result: false,
  });

  const [year, setYear] = useState(plannerInput.StartYear);

  const years = [2023, 2022, 2021, 2020];

  const getPlanner = async () => {
    const planner = await loadPlanner();
    setPlannerInput(planner);
  };

  const getMajors = async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Major/GetAllMajors`
    );

    const majorsInput = response.data ? response.data : [];
    setMajors(parseMajorsInput(majorsInput));
  };

  const getSpecialisations = async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Specialisation/GetAllSpecialisations`
    );
    const specialisationsInput: MajorInputType[] = response.data
      ? response.data
      : [];
    setSpecialisations(parseMajorsInput(specialisationsInput));
  };

  const getModules = async () => {
    /*const response = await axios.get(
        `https://localhost:5001/api/Modules/GetAllModules`
      );
      setModulesInput(response.data);*/
    const modulesInput: MajorInputType[] = require('./data/modules.json');
    setModules(parseMajorsInput(modulesInput));
  };

  const getBscReqs = async () => {
    const response = await axios.get(
      `https://localhost:5001/api/BScReq/GetBScReq`
    );
    setBscReqs(response.data);
  };

  useEffect(() => {
    getPlanner();
    getMajors();
    getSpecialisations();
    getModules();
    getBscReqs();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      const inputCourses: InputCourseType[][] = await Promise.all(
        Object.values(FacultyType).map(async (faculty) => {
          const response = await axios.get(
            `https://localhost:5001/api/Course/GetAllCourses/${faculty}/${year}`
          );
          return response.data;
        })
      );

      parseCourseInput(inputCourses, setCoursesByYear, setSubjects, year);
    };

    setPlannerInput((oldPlanner) => ({ ...oldPlanner, StartYear: year }));

    if (year in coursesByYear) {
      setCourses(coursesByYear[year]);
    } else {
      getCourses();
    }
  }, [year, coursesByYear]);

  useEffect(() => {
    setReqAssociations({});
  }, []);

  useEffect(() => {
    setReqAssociations({});
    updateMajorRequirements(
      degreeType === DegreeType.MAJORS ? setMajors : setSpecialisations,
      setReqAssociations,
      courses,
      plannerInput
    );

    const plannerCoursesIdsWithSlots =
      getPlannerCourseIdsWithSlots(plannerInput);
    Object.keys(plannerCoursesIdsWithSlots).forEach((courseId) => {
      courses[courseId].section = plannerCoursesIdsWithSlots[courseId];
    });
  }, [courses, plannerInput, degreeType]);

  useEffect(() => {
    if (majors.length > 0)
      setDegreeReqState(
        checkReq(
          bscReqs,
          'Any',
          courses,
          majors,
          specialisations,
          setReqAssociations,
          plannerInput
        )
      );
  }, [courses, plannerInput, majors, specialisations, bscReqs]);

  useEffect(() => {
    updateCoursePrerequisites(
      subjects,
      setCourses,
      setReqAssociations,
      plannerInput
    );
  }, [subjects, plannerInput]);

  useEffect(() => {
    updateRecommended(courses, setCourses, reqAssociations);
  }, [courses, reqAssociations]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout getPlanner={getPlanner} />}>
          <Route
            index
            element={
              <Home
                degreeType={degreeType}
                setDegreeType={setDegreeType}
                setPlannerInput={setPlannerInput}
              />
            }
          />
          <Route path="staff" element={<Staff />} />
          <Route path="createcourse" element={<CreateCourse />} />
          <Route path="editcourse" element={<EditCourse />} />
          <Route path="createconcession" element={<CreateConcession />} />
          <Route path="editmajor" element={<EditMajor />} />
          <Route path="createmajor" element={<CreateMajor />} />
          <Route path="editmodule" element={<EditModule />} />
          <Route path="createmodule" element={<CreateModule />} />
          <Route path="editspecialisation" element={<EditSpecialisation />} />
          <Route
            path="createspecialisation"
            element={<CreateSpecialisation />}
          />
          <Route
            path="planner"
            element={
              <PlannerPage
                courses={courses}
                setCourses={setCourses}
                plannerInput={plannerInput}
                setPlannerInput={setPlannerInput}
                majors={majors}
                reqAssociations={reqAssociations}
                bsc_reqs_input={bscReqs}
                degreeReqState={degreeReqState}
                years={years}
                setYear={setYear}
                degreeType={degreeType}
                setDegreeType={setDegreeType}
                specialisations={specialisations}
              />
            }
          />
          <Route
            path="login"
            element={<Login setToken={setToken} getPlanner={getPlanner} />}
          />
          <Route path="error" element={<AccessError />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
