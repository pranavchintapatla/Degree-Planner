import React, { useState } from 'react';
import { EditText, onSaveProps } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { NavLink } from "react-router-dom";
import { PlannerInputType } from '../helpers/TypeInterfaces';
import axios from 'axios';
import BasePopup from '../components/BasePopup/BasePopup';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';
import { loadPlannerStaff } from '../helpers/StaffFetchHelper';
import { GoTriangleLeft } from 'react-icons/go';

const CreateConcession = () => {

    const [concessionOpen, setConcessionOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    const popupHelper = () => {
        setHelpOpen(true);
    }

    const AddConcessionHandler = ({ name, value, previousValue }: onSaveProps) => {
        setConcessionsState(value);
    }

    const studentIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentId(e.target.value);
    }

    const [studentPlanner, setStudentPlanner] = useState<PlannerInputType>({
        Id: '',
        Courses: [],
        MajorType: '',
        Majors: [],
        StartYear: 0,
        StartSemester: 0,
    });
    const [studentid, setStudentId] = useState("");
    const [concessionsState, setConcessionsState] = useState("");
    const [concessionsShown, setConcessionsShown] = useState("false");
    const [currentStudent, setCurrentStudent] = useState("");

    const SearchStudentHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentStudent(studentid);
        let planExists = await getStudentPlan(studentid);
        if (planExists) {
            if (studentPlanner.Concessions !== undefined) {
                let stringTest = JSON.stringify(studentPlanner.Concessions).replace("[", "").replace("]", "").replaceAll('"', '');
                setConcessionsState(stringTest);
                setConcessionsShown("true");
            }
            else {
                setConcessionsState("None");
                setConcessionsShown("true");
            }
        }
        else {
            setStudentPlanner({
                Id: '',
                Courses: [],
                MajorType: '',
                Majors: [],
                StartYear: 0,
                StartSemester: 0,
            });
            setConcessionsState("None");
            setConcessionsShown("false");
        }

        //if state to check if planner exists
        //if planner does not exist dont show section
    };



    const getStudentPlan = async (id: string) => {
        const checkStudentPlan = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Planner/CheckStudentPlannerExists/${id}`
            );
            return response.data;
        };
        let isPlan = await checkStudentPlan();

        if (isPlan) {
            const fetchStudentPlan = async (id: string) => {
                let fetchPlanner = await loadPlannerStaff(id);
                studentPlanner.Id = fetchPlanner.Id;
                studentPlanner.Courses= fetchPlanner.Courses;
                studentPlanner.MajorType= fetchPlanner.MajorType;
                studentPlanner.Majors= fetchPlanner.Majors;
                studentPlanner.StartYear= fetchPlanner.StartYear;
                studentPlanner.StartSemester= fetchPlanner.StartSemester;
                if (fetchPlanner.Concessions !== undefined) {
                    studentPlanner.Concessions = fetchPlanner.Concessions;
                }
            };
            await fetchStudentPlan(id);
            return true;
        }
        else {
            concessionSection = <div>Student planner not Found</div>
            return false;
        }
    };

    const UpdateConcessions = async () => {
        let concessionArray = concessionsState.split(",");
        //Checks if the concession state is empty and set it to an empty array if so
        if (concessionArray[0] === "") {
            concessionArray = [];
        }
        await axios.post('https://localhost:5001/api/Planner/CreateStudentPlanner', {
            Id: studentPlanner.Id,
            Courses: studentPlanner.Courses,
            MajorType: studentPlanner.MajorType,
            Majors: studentPlanner.Majors,
            StartYear: studentPlanner.StartYear,
            StartSemester: studentPlanner.StartSemester,
            Concessions: concessionArray
        });
        setConcessionOpen(true);
    }

    let concessionSection;

    if (concessionsShown === "true") {
        concessionSection = <div id="addconcessionsection">
            <strong>Concessions for {currentStudent}:</strong>
            <EditText className='ConcessionField' id="updatecourseconcession" name="courseconcession" onSave={AddConcessionHandler} showEditButton style={{ width: '200px' }} defaultValue={concessionsState} inline />
            <br></br>
            <div>
            <button onClick={UpdateConcessions} className="btn btn--light-blue">
                Update Concessions
            </button>
            </div>
        </div>;
    } else {
        concessionSection = <div>Student Planner not found</div>;
    }

    let message = `
    Courses should be written like: COURSE 1,COURSE 2,...  
                 Format is all caps with a comma bewteen each course. Note that correct spacing matters.
    `;

    return (
        <React.Fragment>
            <div className='Return'>
            <li>
                <NavLink to="/staff"><GoTriangleLeft />Return</NavLink>
            </li>
            </div>
            <div className="ConcessionSection">
            <div>
                <label htmlFor="studentidsearch">Search for Student:</label><br></br>
                <input className="ConcessionField" type="search" id="studentidsearch" onChange={studentIdHandler}>
                </input>
                <button onClick={SearchStudentHandler} className="btn btn--light-blue" >
                    Search
                </button>
            </div>
            <br></br>
            <div>
                {concessionSection}
            </div>
            </div>
            <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>
            <StaffPopup
                header="How to use"
                body={message}
                closeText="Ok"
                open={helpOpen}
                setOpen={setHelpOpen}
                />
            <BasePopup
                header="Success"
                body={`Concessions for ${studentid} updated`}
                closeText="Ok"
                open={concessionOpen}
                setOpen={setConcessionOpen}
            />
        </React.Fragment>
    );
};

export default CreateConcession;
