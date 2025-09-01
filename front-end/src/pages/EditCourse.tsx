import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { InputCourseType, StaffCourseType } from '../helpers/TypeInterfaces';
import { selectCourse, selectElement } from "../helpers/StaffHelper";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import 'react-edit-text/dist/index.css';
import BasePopup from '../components/BasePopup/BasePopup';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';
import { GoTriangleLeft } from 'react-icons/go';

const EditCourse = () => {

    const schedules = ["arts", "business-and-economics", "creative-arts-and-industries", "education-and-social-work", "engineering", "geneds", "law", "medical-and-health-sciences", "science"];
    const years = ["2020", "2021", "2022", "2023"];

    //states for select components
    const [currentSchedule, setStaffSchedule]: [
        string,
        React.Dispatch<React.SetStateAction<string>>
    ] = useState(() => selectElement("arts", schedules));

    const [currentYear, setStaffYear]: [
        string,
        React.Dispatch<React.SetStateAction<string>>
    ] = useState(() => selectElement("2020", years));

    const [courses, setCourseData] = useState<InputCourseType[]>([]);
    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Course/GetAllCourses/${currentSchedule}/${currentYear}`
            );
            setCourseData(response.data);
        };
        getCourses();
    }, [currentSchedule, currentYear]);

    const blankCourse: InputCourseType = {
        courseid: "None selected",
        coursename: "",
        description: "",
        subject: "",
        year: "",
        term: "",
        url: "",
        requirements: "",
        prerequisite_raw: "",
        restriction_raw: "",
        other_requirements_raw: ""
    }
    const courseOptions = [blankCourse].concat(courses.sort((a: InputCourseType, b: InputCourseType) => (a.courseid < b.courseid ? -1 : 1)));


    //get course data
    //Setup course field state

    const [course, setStaffCourse]: [
        InputCourseType,
        React.Dispatch<React.SetStateAction<InputCourseType>>
    ] = useState(() => selectCourse("None selected", courseOptions));

    const [newCourseId, setCourseId] = useState(course.courseid);
    const [newCourseName, setCoursename] = useState(course.coursename);
    const [newCourseDes, setCourseDes] = useState(course.description);
    const [newCourseSubject, setCourseSubject] = useState(course.subject);
    const [newCourseTerm, setCourseTerm] = useState(course.term);
    const [newCourseUrl, setCourseUrl] = useState(course.url);
    const [newCourseYear, setCourseYear] = useState(course.year);
    const [newCoursePrereq, setCoursePrereq] = useState(course.prerequisite_raw);
    const [newCourseRestriction, setCourseRestriction] = useState(course.restriction_raw);
    const [newCourseOtherReq, setCourseOtherReq] = useState(course.other_requirements_raw);

    const [prereqChanged, setPrereqChanged] = useState(false);
    const [resChanged, setResChanged] = useState(false);
    const [otherReqChanged, setOtherReqChanged] = useState(false);
    const [orginalCourseTerm, setOriginalCourseTerm] = useState(course.term);
    const [orginalCourseId, setOriginalCourseId] = useState(course.courseid);

    



    //function to handle value changes
    const handleIDChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseId(value);
    }
    const handleNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setCoursename(value);
    }
    const handleDesChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseDes(value);
    }
    const handleSubjectChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseSubject(value);
    }
    const handleTermChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseTerm(value);
    }
    const handleUrlChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseUrl(value);
    }
    const handleYearChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseYear(value);
    }
    const handlePrereqChange = ({ name, value, previousValue }: onSaveProps) => {
        setCoursePrereq(value);
        setPrereqChanged(true);
    }
    const handleRestrictionChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseRestriction(value);
        setResChanged(true);
    }
    const handleOtherReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setCourseOtherReq(value);
        setOtherReqChanged(true);

    }

    //api call to update a course
    const updateCourse = async () => {
        let newCourse: StaffCourseType = {
            courseid: newCourseId,
            coursename: newCourseName,
            description: newCourseDes,
            subject: newCourseSubject,
            year: currentYear,
            term: newCourseTerm,
            url: newCourseUrl,
            prerequisite_raw: newCoursePrereq,
            restriction_raw: newCourseRestriction,
            other_requirements_raw: newCourseOtherReq
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
        if (prereqChanged) {
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
        if (resChanged) {
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
        if (otherReqChanged) {
            await parseOtherReqs();
        }
        let coursesForIndex: InputCourseType[] = [];
        const getCoursesForIndex = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Course/GetAllCourses/${currentSchedule}/${currentYear}`
            );
            coursesForIndex = response.data;
        };
        await getCoursesForIndex();
        let courseIndex = coursesForIndex.findIndex((c: InputCourseType) => c.courseid === orginalCourseId && c.term === orginalCourseTerm);
        let jsonString = JSON.stringify(newCourse);
        const postCourseUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Course/EditCourse', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    schedule: currentSchedule,
                    year: currentYear,
                    courseInput: jsonString,
                    index: courseIndex

                },
            });
        }
        await postCourseUpdate();
        setUpdateCourseOpen(true);
    }


    //state change handlers for select components
    const selectSchedule = (name: string, schedules: string[]) => {
        let returnSchedule = selectElement(name, schedules);
        setStaffCourse(() => selectStaffCourse("None selected", courseOptions));
        return returnSchedule;
    }
    const selectYear = (year: string, schedules: string[]) => {
        let returnSchedule = selectElement(year, schedules);
        setStaffCourse(() => selectStaffCourse("None selected", courseOptions));
        return returnSchedule;
    }
    const selectStaffCourse = (targetValue: string, coursesList: InputCourseType[]) => {
        let returnCourse = selectCourse(targetValue, coursesList);
        setCourseId(returnCourse.courseid);
        setCoursename(returnCourse.coursename);
        setCourseDes(returnCourse.description);
        setCourseUrl(returnCourse.url);
        setCourseTerm(returnCourse.term);
        setCourseSubject(returnCourse.subject);
        setCoursePrereq(returnCourse.prerequisite_raw);
        setCourseOtherReq(returnCourse.other_requirements_raw);
        setCourseRestriction(returnCourse.restriction_raw);
        setOriginalCourseTerm(returnCourse.term);
        setOriginalCourseId(returnCourse.courseid);
        return returnCourse;
    }

    //only show update button if a course is selected
    let updateButton;

    if ((course.courseid === "None selected") || course.courseid === "Course Not Found") {
        updateButton = null;
    }
    else {
        updateButton = <button onClick={updateCourse} className="btn btn--light-blue">
            Update Course
        </button>;
    }


    //states for modals
    const [updateCourseOpen, setUpdateCourseOpen] = useState(false);

    const [helpOpen, setHelpOpen] = useState(false);
    const popupHelper = () => {
        setHelpOpen(true);
    }

    return (
        <React.Fragment>
            <div className='Return'>
                <li>
                    <NavLink to="/staff"><GoTriangleLeft />Return</NavLink>
                </li>
            </div>
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
            <br></br>
            <div id="staffCourseEdit">
                <select
                    name="staffCourseEdit"
                    id="staffCourseEdit"
                    className="StaffCourseSelect"
                    onChange={(e) => setStaffCourse(selectStaffCourse(e.target.value, courseOptions))}

                >
                    {courseOptions.map((c: InputCourseType) => {
                        const course = [
                            <option value={[c.courseid, c.term]} key={c.courseid}>
                                {c.courseid} {c.term}
                            </option>,
                        ];
                        return course;
                    })}
                </select>
            </div>

            <div>
                <strong>Course ID:</strong>
                <EditText id="editcourseid" name="courseId" onSave={handleIDChange} showEditButton style={{ width: '200px' }} defaultValue={course.courseid} inline />
            </div>
            <div>
                <strong>Course Name:</strong>
                <EditText id="editcoursename" name="courseName" onSave={handleNameChange} showEditButton style={{ width: '200px' }} defaultValue={course.coursename} inline />
            </div>
            <div style={{ display: 'flex' }}>
                <strong>Description:</strong>
                <EditTextarea id="editdescription" name="description" onSave={handleDesChange} rows={4} style={{ paddingTop: 0 }} defaultValue={course.description} />
            </div>
            <div>
                <strong>Subject:</strong>
                <EditText id="editsubject" name="subject" onSave={handleSubjectChange} showEditButton style={{ width: '200px' }} defaultValue={course.subject} inline />
            </div>
            <div>
                <strong>Terms:</strong>
                <EditText id="editterms" name="terms" onSave={handleTermChange} showEditButton style={{ width: '200px' }} defaultValue={course.term} inline />
            </div>
            <div>
                <strong>URL:</strong>
                <EditText id="editurl" name="url" onSave={handleUrlChange} showEditButton style={{ width: '200px' }} defaultValue={course.url} inline />
            </div>
            <div>
                <strong>Prerequisite:</strong>
                <EditTextarea id="editprerequisite" name="prerequisite" onSave={handlePrereqChange} rows={2} style={{ paddingTop: 0 }} defaultValue={course.prerequisite_raw} />
            </div>
            <div>
                <strong>Restriction:</strong>
                <EditTextarea id="editrestriction" name="restriction" onSave={handleRestrictionChange} rows={2} style={{ paddingTop: 0 }} defaultValue={course.restriction_raw} />
            </div>
            <div>
                <strong>Other Requirements:</strong>
                <EditTextarea id="editotherreq" name="otherreq" onSave={handleOtherReqChange} rows={2} style={{ paddingTop: 0 }} defaultValue={course.other_requirements_raw} />
            </div>
            <div>
                {updateButton}
            </div>
            <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>
            <BasePopup
                header="Success"
                body={`The course: ${course.courseid}`}
                closeText="Ok"
                open={updateCourseOpen}
                setOpen={setUpdateCourseOpen}
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
                Other requirements is generally used for multi semester courses with A and B requirements, other requirments should be formated like existing
                other requirements.
                
                Push refresh to see any changes you made, or change one of the dropdown options and switch back`}
                closeText="Ok"
                open={helpOpen}
                setOpen={setHelpOpen}
            />

        </React.Fragment>


    );
};

export default EditCourse;