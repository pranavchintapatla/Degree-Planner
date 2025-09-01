import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { StaffMajor, StaffPath } from '../helpers/TypeInterfaces';
import { selectStaffMajorPath, selectPathHelper } from "../helpers/StaffHelper";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import 'react-edit-text/dist/index.css';
import BasePopup from '../components/BasePopup/BasePopup';
import { GoTriangleLeft } from 'react-icons/go';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';

//Note this whole page is very similar to edit specialisation alots of the comments here explain how that page works

const EditMajor = () => {

    const [majors, setMajorsData] = useState<StaffMajor[]>([]);
    useEffect(() => {
        const getMajors = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Major/GetAllMajors`
            );
            setMajorsData(response.data);
        };
        getMajors();
    }, []);

    const blankMajor: StaffMajor = {
        title: "None selected",
        requirements: [],
        requirements_raw: "",
        paths: []
    }

    const majorOptions = [blankMajor].concat(majors);


    const [major, setStaffMajor]: [
        StaffMajor,
        React.Dispatch<React.SetStateAction<StaffMajor>>
    ] = useState(() => selectStaffMajorPath("None selected", majorOptions));

    const [paths, setPathsState] = useState(major.paths);

    const [pathsExist, setPathsExist] = useState(false);

    const selectStaffMajor = (targetValue: string, majors: StaffMajor[]) => {
        let returnMajor = selectStaffMajorPath(targetValue, majors);
        setOriginalMajorTitle(returnMajor.title);
        setNewMajorTitle(returnMajor.title);
        setNewMajorReq(returnMajor.requirements_raw);
        if (returnMajor.paths.length === 0) {
            let emptyPath = [{ title: "Major has no paths", requirements: [], requirements_raw: "" }];
            setPathsExist(false);
            setPathsState(emptyPath)
            setPathState(emptyPath[0])
        }
        else {
            if (returnMajor.paths[0].title !== undefined) {
                setPathtitle(returnMajor.paths[0].title);
                setOriginalPathTitle(returnMajor.paths[0].title);
            }
            if (returnMajor.paths[0].requirements_raw !== undefined) {
                setPathreq(returnMajor.paths[0].requirements_raw)
            }
            setPathsState(returnMajor.paths);
            setPathState(returnMajor.paths[0])
            setPathsExist(true);
        }
        return returnMajor;

    }

    const [path, setPathState]: [
        StaffPath,
        React.Dispatch<React.SetStateAction<StaffPath>>
    ] = useState(() => selectPathHelper("", paths));



    const [majorTitle, setNewMajorTitle] = useState("");
    const [majorReq, setNewMajorReq] = useState("");

    const handleMajorNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewMajorTitle(value);
    }
    const handleMajorReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewMajorReq(value);
    }

    //states and handlers for editing current paths
    const [pathtitle, setPathtitle] = useState("");
    const [pathreq, setPathreq] = useState("");

    //original titles for getting indexs
    const [originalMajorTitle, setOriginalMajorTitle] = useState("");
    const [originalPathTitle, setOriginalPathTitle] = useState("");

    const handlePathNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setPathtitle(value);
    }
    const handlePathReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setPathreq(value);
    }

    //States and handlers for adding new paths to a major
    const [newPathTitle, setNewPathTitle] = useState("");
    const [newPathReq, setNewPathReq] = useState("");

    const handleNewPathNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewPathTitle(value);
    }
    const handleNewPathReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewPathReq(value);
    }

    //Update major with empty path
    const UpdateMajor = async () => {
        let newMajor: StaffMajor = {
            title: majorTitle,
            requirements_raw: majorReq,
            requirements: [],
            paths: []
        }
        const parsePrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newMajor.requirements_raw,
                },

            }
            );
            newMajor.requirements = (response.data);
        }
        await parsePrereqs();
        let majorIndex = majors.findIndex((m: StaffMajor) => m.title === originalMajorTitle);
        let jsonString = JSON.stringify(newMajor);
        const postMajorUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Major/EditMajor', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    majorInput: jsonString,
                    index: majorIndex,
                },
            });
        }
        postMajorUpdate();
        setUpdateMajorOpen(true);
    }

    //update major with path
    const UpdateMajorWithPath = async () => {
        //get indexs for major and paths locations
        let majorIndex = majors.findIndex((m: StaffMajor) => m.title === originalMajorTitle);
        let pathIndex = majors[majorIndex].paths.findIndex((p: StaffPath) => p.title === originalPathTitle);

        //update selected major
        let newMajor: StaffMajor = {
            title: majorTitle,
            requirements_raw: majorReq,
            requirements: [],
            paths: paths
        }
        const parseMajorPrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newMajor.requirements_raw,
                },

            }
            );
            newMajor.requirements = (response.data);
        }
        await parseMajorPrereqs();

        //update selected path
        let newPath: StaffPath = {
            title: pathtitle,
            requirements_raw: pathreq,
            requirements: [],
        }
        const parsePathPrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newPath.requirements_raw,
                },

            }
            );
            newPath.requirements = (response.data);
        }
        await parsePathPrereqs();

        newMajor.paths[pathIndex] = newPath;
        let jsonString = JSON.stringify(newMajor);
        //put request update
        const postMajorUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Major/EditMajor', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    majorInput: jsonString,
                    index: majorIndex,
                },
            });
        }
        postMajorUpdate();
        setUpdateMajorOpen(true);
    }




    const CreateNewPath = async () => {

        let majorIndex = majors.findIndex((m: StaffMajor) => m.title === originalMajorTitle);
        let tempPaths = paths;
        if (majors[majorIndex].paths.length === 0) {
            tempPaths = [];
        }

        let newPath: StaffPath = {
            title: newPathTitle,
            requirements_raw: newPathReq
        }
        let newMajor: StaffMajor = {
            title: major.title,
            requirements_raw: major.requirements_raw,
            requirements: major.requirements,
            paths: tempPaths
        }
        const parsePathPrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newPathReq,
                },

            }
            );
            newPath.requirements = (response.data);
        }
        await parsePathPrereqs();

        newMajor.paths.push(newPath);

        let jsonString = JSON.stringify(newMajor);
        const postNewPathUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Major/EditMajor', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    majorInput: jsonString,
                    index: majorIndex,
                },
            });
        }
        postNewPathUpdate();
        setNewPathOpen(true);
    }

    const [pathButtonStatus, setPathButtonStatus] = useState("Add new Path");

    //conditional section variable for edit path
    let pathSection;

    //conditional section variable for new path
    let pathComponent;

    let submitButton;

    const selectPath = (targetValue: string, paths: StaffPath[]) => {
        let returnPath = selectPathHelper(targetValue, paths);
        if (returnPath.title !== undefined) {
            setPathtitle(returnPath.title);
            setOriginalPathTitle(returnPath.title);
        }
        if (returnPath.requirements_raw !== undefined)
            setPathreq(returnPath.requirements_raw)

        return returnPath;
    }

    if (pathButtonStatus === "Cancel" && major.title !== "None selected") {
        pathComponent = <div id="newPathComponent"><div>
            <strong>Name:</strong>
            <EditText name="Path Name" onSave={handleNewPathNameChange} showEditButton style={{ width: '200px' }} placeholder="Enter new path name" inline />
        </div>

            <div>
                <strong>Requirements:</strong>
                <EditTextarea name="Path Requirements" onSave={handleNewPathReqChange} style={{ paddingTop: 0 }} placeholder="Enter new path requirements" />
            </div>
            <button onClick={CreateNewPath} className="btn btn--light-blue">
                Create Path
            </button>
        </div>;
    } else {
        pathComponent = <div></div>;
    }

    const changePathComponent = () => {
        if (pathButtonStatus === "Add new Path") {
            setPathButtonStatus("Cancel")
        } else {
            setPathButtonStatus("Add new Path")
        }

    }

    //conditionally change to show if a major has any paths
    //also onlys shows submit button if a major is selected
    if (pathsExist) {
        pathSection = <div id="PathEdit">
            <select
                name="staffPathEdit"
                id="staffPathEdit"
                onChange={(e) => setPathState(selectPath(e.target.value, paths))}
            >
                {paths.map((p: StaffPath) => {
                    const path = [
                        <option value={p.title} key={p.title}>
                            {p.title}
                        </option>,
                    ];
                    return path;
                })}
            </select>
            <div>
                <strong>Name:</strong>
                <EditText name="Path Name" onSave={handlePathNameChange} showEditButton style={{ width: '200px' }} defaultValue={path.title} inline readonly/>
            </div>

            <div>
                <strong>Requirements:</strong>
                <EditTextarea name="Path Requirements" onSave={handlePathReqChange} style={{ paddingTop: 0 }} defaultValue={path.requirements_raw} />
            </div>

        </div>;
        if (major.title !== "None selected") {
            submitButton = <button onClick={UpdateMajorWithPath} className="btn btn--light-blue">
                Update Major
            </button>;
        }
        else {
            submitButton = null;
        }
    } else {
        pathSection = <div>Major has no Paths</div>;
        if (major.title !== "None selected") {
            submitButton = <button onClick={UpdateMajor} className="btn btn--light-blue">
                Update Major
            </button>;
        }
        else {
            submitButton = null;
        }
    }

    //states for modals
    const [newPathOpen, setNewPathOpen] = useState(false);
    const [updateMajorOpen, setUpdateMajorOpen] = useState(false);

    const [helpOpen, setHelpOpen] = useState(false);
    const popupHelper = () => {
        setHelpOpen(true);
    }

    //only show add path button if a option is selected
    let pathButtonOption;

    if (major.title !== "None selected") {
        pathButtonOption = <button onClick={changePathComponent} className="btn btn--light-blue">
        {pathButtonStatus}
    </button>;
    }
    else {
        pathButtonOption = <div></div>;
    }

    return (
        <React.Fragment>
            <div className='Return'>
                <li>
                    <NavLink to="/staff"><GoTriangleLeft />Return</NavLink>
                </li>
            </div>
            <div>
                Major:
            </div>

            <div id="staffMajorEdit">

                <select
                    name="staffMajorEdit"
                    id="staffMajorEdit"
                    onChange={(e) => setStaffMajor(selectStaffMajor(e.target.value, majorOptions))}
                >
                    {majorOptions.map((m: StaffMajor) => {
                        const major = [
                            <option value={m.title} key={m.title}>
                                {m.title}
                            </option>,
                        ];
                        return major;
                    })}
                </select>
                <div>
                    <strong>Name:</strong>
                    <EditText name="Major Name" onSave={handleMajorNameChange} showEditButton style={{ width: '200px' }} defaultValue={major.title} inline />
                </div>

                <div>
                    <strong>Requirements:</strong>
                    <EditTextarea name="Major Requirements" onSave={handleMajorReqChange} style={{ paddingTop: 0 }} defaultValue={major.requirements_raw} />
                </div>
                <br></br>
                <div>
                    Paths:
                </div>

                {pathSection}

                <br></br>
                <div>
                    {submitButton}
                </div>
                <br></br>
                {pathButtonOption}
                <div>
                    {pathComponent}
                </div>
                <BasePopup
                    header="Success"
                    body={`A new path: ${newPathTitle} has been created for ${major.title}`}
                    closeText="Ok"
                    open={newPathOpen}
                    setOpen={setNewPathOpen}
                />
                <BasePopup
                    header="Success"
                    body={`The Major ${major.title} was updated`}
                    closeText="Ok"
                    open={updateMajorOpen}
                    setOpen={setUpdateMajorOpen}
                />

                <StaffPopup
                    header="How to use"
                    body={`REQUIREMENTS
                    \n
                    Requirement should be written similarly to other existing major or specialisation requirements.
                    
                    You can only do one thing at once, you can edit a path or create a new path.
                    
                    Please refresh after updating or before adding additional paths.`}
                    closeText="Ok"
                    open={helpOpen}
                    setOpen={setHelpOpen}
                />
                <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>

            </div>
        </React.Fragment>

    );
};

export default EditMajor;