import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { NavLink } from "react-router-dom";
import { InputCourseType } from '../helpers/TypeInterfaces';
import BasePopup from '../components/BasePopup/BasePopup';
import { selectElement } from '../helpers/StaffHelper';
import axios from 'axios';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';

const CreateCourse = () => {

    const schedules = ["arts", "business-and-economics", "creative-arts-and-industries", "education-and-social-work", "engineering", "geneds", "law", "medical-and-health-sciences", "science"];
    const years = ["2020", "2021", "2022", "2023"];

    const [currentSchedule, setStaffSchedule]: [
        string,
        React.Dispatch<React.SetStateAction<string>>
    ] = useState(() => selectElement("arts", schedules));

    const selectSchedule = (name: string, schedules: string[]) => {
        let returnSchedule = selectElement(name, schedules);
        return returnSchedule;
    }

    const [currentYear, setStaffYear]: [
        string,
        React.Dispatch<React.SetStateAction<string>>
    ] = useState(() => selectElement("2022", years));

    const selectYear = (year: string, schedules: string[]) => {
        let returnSchedule = selectElement(year, schedules);
        return returnSchedule;
    }

    //states for new course
    const [newcourseid, setnewcourseid] = useState("");
    const [newcoursename, setnewcoursename] = useState("");
    const [newcourseDes, setnewcourseDes] = useState("");
    const [newcourseSubject, setnewcourseSubject] = useState("");
    const [newcourseTerm, setnewcourseTerm] = useState("");
    const [newcourseUrl, setnewcourseUrl] = useState("");
    const [newcoursePrereq, setnewcoursePrereq] = useState("");
    const [newcourseRestriction, setnewcourseRestriction] = useState("");
    const [newcourseOtherReq, setnewcourseOtherReq] = useState("");

    //function to handle value changes
    const handleNewCourseID = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseid(value);
    }
    const handleNewCourseName = ({ name, value, previousValue }: onSaveProps) => {
        setnewcoursename(value);
    }
    const handleNewDes = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseDes(value);
    }
    const handleNewSubject = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseSubject(value);
    }
    const handleNewTerm = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseTerm(value);
    }
    const handleNewUrl = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseUrl(value);
    }
    const handleNewPrereq = ({ name, value, previousValue }: onSaveProps) => {
        setnewcoursePrereq(value);
    }
    const handleNewRestriction = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseRestriction(value);
    }
    const handleNewOtherReq = ({ name, value, previousValue }: onSaveProps) => {
        setnewcourseOtherReq(value);
    }

    //create new course if the required values are present
    const CreateNewCourse = async () => {
        if (newcourseid.length > 0 && newcoursename.length > 0 && newcourseDes.length > 0 && newcourseTerm.length > 0 && newcourseSubject.length > 0) {
            let newCourse: InputCourseType = {
                courseid: newcourseid,
                coursename: newcoursename,
                description: newcourseDes,
                subject: newcourseSubject,
                year: currentYear,
                term: newcourseTerm,
                url: newcourseUrl,
                requirements: "",
                prerequisite_raw: newcoursePrereq,
                restriction_raw: newcourseRestriction,
                other_requirements_raw: newcourseOtherReq
            }
            const parsePrereqs = async () => {
                const response = await axios.get(
                    `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                    params: {
                        requirement: newCourse.prerequisite_raw,
                    },
                }
                );
                newCourse.prerequisite = (response.data);
            }
            if (newcoursePrereq.length > 0) {
                await parsePrereqs();
            }
            const parseRestrictions = async () => {
                const response = await axios.get(
                    `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                    params: {
                        requirement: newCourse.restriction_raw,
                    },
                }
                );
                newCourse.restriction = (response.data);
            }
            if (newcourseRestriction.length > 0) {
                await parseRestrictions();
            }
            const parseOtherReqs = async () => {
                const response = await axios.get(
                    `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                    params: {
                        requirement: newCourse.other_requirements_raw,
                    },
                }
                );
                newCourse.other_requirements = (response.data);
            }
            if (newcourseOtherReq.length > 0) {
                await parseOtherReqs();
            }
            let jsonString = JSON.stringify(newCourse);

            const postCourseUpdate = async () => {
                const response = await axios.post('https://localhost:5001/api/Course/CreateCourse', null, {
                    headers: {
                        Authorization: `Basic ${btoa('staff:staffPassword')}`,
                    },
                    params: {
                        courseInput: jsonString,
                        year: currentYear,
                        schedule: currentSchedule,
                    },
                });
            }
            await postCourseUpdate();
            setCreateCourseSuccess(true);
        }

        else {
            setCreateCourseError(true);
        }
    }

    const [createCourseSuccess, setCreateCourseSuccess] = useState(false);
    const [createCourseError, setCreateCourseError] = useState(false);

    const [helpOpen, setHelpOpen] = useState(false);
    const popupHelper = () => {
        setHelpOpen(true);
    }

    return (
        <React.Fragment>
            <li>
                <NavLink to="/staff">Return</NavLink>
            </li>
            <div>
                <select
                    name="staffYear"
                    id="staffYear"
                    className="StaffCourseSelect"
                    onChange={(e) => setStaffYear(selectYear(e.target.value, years))}

                >
                    {years.map((value: string, index: number, array: string[]) => {
                        const year = [
                            <option value={value} key={index}>
                                {value}
                            </option>,
                        ];
                        return year;
                    })}
                </select>
                <select
                    name="staffScheduleSelect"
                    id="staffScheduleSelect"
                    className="StaffCourseSelect"
                    onChange={(e) => setStaffSchedule(selectSchedule(e.target.value, schedules))}

                >
                    {schedules.map((value: string, index: number, array: string[]) => {
                        const schedule = [
                            <option value={value} key={index}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </option>,
                        ];
                        return schedule;
                    })}
                </select>
            </div>
            <div>
                <strong>Course ID:</strong>
                <EditText id="createcourseid" name="courseId" onSave={handleNewCourseID} showEditButton style={{ width: '200px' }} placeholder="Enter course code eg. STATS 101" inline />
            </div>
            <div>
                <strong>Course Name:</strong>
                <EditText id="createcoursename" name="courseName" onSave={handleNewCourseName} showEditButton style={{ width: '200px' }} placeholder="Course Name" inline />
            </div>
            <div style={{ display: 'flex' }}>
                <strong>Description:</strong>
                <EditTextarea id="createdescription" name="description" onSave={handleNewDes} rows={4} style={{ paddingTop: 0 }} placeholder="Enter course description here" />
            </div>
            <div>
                <strong>Subject:</strong>
                <EditText id="createsubject" name="subject" onSave={handleNewSubject} showEditButton style={{ width: '200px' }} placeholder="Add course subject eg. Computer Science" inline />
            </div>
            <div>
                <strong>Terms:</strong>
                <EditText id="createterms" name="terms" onSave={handleNewTerm} showEditButton style={{ width: '200px' }} placeholder="Enter a single semester SS,S1 or S2, example entry: SS" inline />
            </div>
            <div>
                <strong>URL:</strong>
                <EditText id="createurl" name="url" onSave={handleNewUrl} showEditButton style={{ width: '200px' }} placeholder="Add URL for Digital Course Outline" inline />
            </div>
            <div>
                <strong>Prerequisite:</strong>
                <EditText id="createprerequisite" name="prerequisite" onSave={handleNewPrereq} showEditButton style={{ width: '200px' }} placeholder="Add prerequisites see help for formatting suggestions" inline />
            </div>
            <div>
                <strong>Restriction:</strong>
                <EditText id="createrestriction" name="restriction" onSave={handleNewRestriction} showEditButton style={{ width: '200px' }} placeholder="Add Restrictions" inline />
            </div>
            <div>
                <strong>Other Requirements:</strong>
                <EditText id="createotherreq" name="otherreq" onSave={handleNewOtherReq} showEditButton style={{ width: '200px' }} placeholder="Add other requirements" inline />
            </div>
            <div>
                <button onClick={CreateNewCourse} className="btn btn--light-blue">
                    Create New Course
                </button>
            </div>
            <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>
            <BasePopup
                header="Missing Value"
                body={`The course needs to have: ID, Name, Description, Subject, and a Term`}
                closeText="Ok"
                open={createCourseError}
                setOpen={setCreateCourseError}
            />

            <BasePopup
                header="Success"
                body={`The course ${newcourseid} was created`}
                closeText="Ok"
                open={createCourseSuccess}
                setOpen={setCreateCourseSuccess}
            />
            <StaffPopup
                header="How to use"
                body={`COURSE ID
                \n
                Course IDs should be entered in the format: COMPSCI 120
                Note the ID is all caps with a space between the subject code and number.
                \n
                TERM
                \n
                Only ONE term should be entered in the format following format: SS : which stands for summerschool
                or S1 and S2 for semester 1 and 2 respectively.
                \n
                REQUIREMENTS
                \n
                Prequisites and Restrictions can be entered in a similar format to any currently existing prerequisites.
                \n
                Other requirements is generally used for multi semester courses and requirments should be formated like existing
                other requirements.`}
                closeText="Ok"
                open={helpOpen}
                setOpen={setHelpOpen}
            />

        </React.Fragment>


    );
};

export default CreateCourse;