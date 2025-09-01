import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { StaffMajor, StaffPath } from '../helpers/TypeInterfaces';
import { selectStaffMajorPath, selectPathHelper } from "../helpers/StaffHelper";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import BasePopup from '../components/BasePopup/BasePopup';
import { GoTriangleLeft } from 'react-icons/go';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';


const EditSpecialisation = () => {

    const [specialisations, setSpecialisationsData] = useState<StaffMajor[]>([]);
    useEffect(() => {
        const getSpecialisations = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Specialisation/GetAllSpecialisations`
            );
            setSpecialisationsData(response.data);
        };
        getSpecialisations();
    }, []);

    const blankMajor: StaffMajor = {
        title: "None selected",
        requirements: [],
        requirements_raw: "",
        paths: []
    }

    const specialisationOptions = [blankMajor].concat(specialisations);

    const [specialisation, setStaffSpecialisation]: [
        StaffMajor,
        React.Dispatch<React.SetStateAction<StaffMajor>>
    ] = useState(() => selectStaffMajorPath("None selected", specialisationOptions));

    const [paths, setPathsState] = useState(specialisation.paths);

    const [pathsExist, setPathsExist] = useState(false);

    const [specialisationTitle, setNewSpecialisationTitle] = useState("");
    const [specialisationReq, setNewSpecialisationReq] = useState("");

    const handleMajorNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewSpecialisationTitle(value);
    }
    const handleMajorReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewSpecialisationReq(value);
    }

    //states and handlers for editing current paths
    const [pathTitle, setPathTitle] = useState("");
    const [pathReq, setPathReq] = useState("");

    const [originalSpecialisationTitle, setOriginalSpecialisationTitle] = useState("");
    const [originalPathTitle, setOriginalPathTitle] = useState("");

    const handlePathNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setPathTitle(value);
    }
    const handlePathReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setPathReq(value);
    }

    //States and handlers for adding new paths to a specialisation
    const [newPathTitle, setNewPathTitle] = useState("");
    const [newPathReq, setNewPathReq] = useState("");

    const handleNewPathNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewPathTitle(value);
    }
    const handleNewPathReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewPathReq(value);
    }

    //note that this is the same function as in Edit major with different names
    const selectStaffMajor = (targetValue: string, specialisations: StaffMajor[]) => {
        let returnSpecialisation = selectStaffMajorPath(targetValue, specialisationOptions);
        setNewSpecialisationTitle(returnSpecialisation.title);
        setOriginalSpecialisationTitle(returnSpecialisation.title);
        setNewSpecialisationReq(returnSpecialisation.requirements_raw);
        if (returnSpecialisation.paths.length === 0) {
            let emptyPath = [{ title: "Specialisation has no paths", requirements: [], requirements_raw: "" }];
            setPathsExist(false);
            setPathsState(emptyPath)
            setPathState(emptyPath[0])
        }
        else {
            if (returnSpecialisation.paths[0].title !== undefined) {
                setPathTitle(returnSpecialisation.paths[0].title);
                setOriginalPathTitle(returnSpecialisation.paths[0].title);

            }
            if (returnSpecialisation.paths[0].requirements_raw !== undefined) {
                setPathReq(returnSpecialisation.paths[0].requirements_raw)
            }
            setPathsState(returnSpecialisation.paths);
            setPathState(returnSpecialisation.paths[0])
            setPathsExist(true);
        }
        return returnSpecialisation;
    }

    const [path, setPathState]: [
        StaffPath,
        React.Dispatch<React.SetStateAction<StaffPath>>
    ] = useState(() => selectPathHelper("Anatomical Imaging Science", paths));

    const [pathButtonStatus, setPathButtonStatus] = useState("Add new Path");

    //conditional section variable for edit path
    let pathSection;

    //conditional section variable for new path
    let pathComponent;

    //conditional section to show button only if there is a specialisation selected
    let submitButton;


    //the word major is used interchangably with specialisation as the code is reused from EditMajors
    const UpdateSpecialisation = async () => {
        let newSpecialisation: StaffMajor = {
            title: specialisationTitle,
            requirements_raw: specialisationReq,
            requirements: [],
            paths: []
        }
        const parsePrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newSpecialisation.requirements_raw,
                },

            }
            );
            newSpecialisation.requirements = (response.data);
        }
        await parsePrereqs();
        let specialisationIndex = specialisations.findIndex((m: StaffMajor) => m.title === originalSpecialisationTitle);
        let jsonString = JSON.stringify(newSpecialisation);
        const postSpecialisationUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Specialisation/EditSpecialisation', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    specialisationInput: jsonString,
                    index: specialisationIndex,
                },
            });
        }
        postSpecialisationUpdate();
        setUpdateSpecialisationOpen(true);
    }

    const UpdateSpecialisationWithPath = async () => {

        let specialisationIndex = specialisations.findIndex((m: StaffMajor) => m.title === originalSpecialisationTitle);
        let pathIndex = specialisations[specialisationIndex].paths.findIndex((p: StaffPath) => p.title === originalPathTitle);

        let newSpecialisation: StaffMajor = {
            title: specialisationTitle,
            requirements_raw: specialisationReq,
            requirements: [],
            paths: paths
        }

        const parseSpecialisationPrereqs = async () => {
            const response = await axios.get(
                `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                params: {
                    requirement: newSpecialisation.requirements_raw,
                },

            }
            );
            newSpecialisation.requirements = (response.data);
        }
        await parseSpecialisationPrereqs();

        let newPath: StaffPath = {
            title: pathTitle,
            requirements_raw: pathReq,
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

        newSpecialisation.paths[pathIndex] = newPath;
        let jsonString = JSON.stringify(newSpecialisation);
        const postSpecialisationUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Specialisation/EditSpecialisation', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    specialisationInput: jsonString,
                    index: specialisationIndex,
                },
            });
        }
        postSpecialisationUpdate();
        setUpdateSpecialisationOpen(true);
    }




    const CreateNewPath = async () => {

        let specialisationIndex = specialisations.findIndex((m: StaffMajor) => m.title === specialisationTitle);
        let tempPaths = paths;
        if (specialisations[specialisationIndex].paths.length === 0) {
            tempPaths = [];
        }

        let newPath: StaffPath = {
            title: newPathTitle,
            requirements_raw: newPathReq
        }
        let newSpecialisation: StaffMajor = {
            title: specialisation.title,
            requirements_raw: specialisation.requirements_raw,
            requirements: specialisation.requirements,
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

        newSpecialisation.paths.push(newPath);

        let jsonString = JSON.stringify(newSpecialisation);
        const postNewPathUpdate = async () => {
            const response = await axios.put('https://localhost:5001/api/Specialisation/EditSpecialisation', null, {
                headers: {
                    Authorization: `Basic ${btoa('staff:staffPassword')}`,
                },
                params: {
                    majorInput: jsonString,
                    index: specialisationIndex,
                },
            });
        }
        postNewPathUpdate();
        setNewPathOpen(true);
    }

    const selectPath = (targetValue: string, paths: StaffPath[]) => {
        let returnPath = selectPathHelper(targetValue, paths);
        if (returnPath.title !== undefined) {
            setPathTitle(returnPath.title);
            setOriginalPathTitle(returnPath.title);
        }
        if (returnPath.requirements_raw !== undefined)
            setPathReq(returnPath.requirements_raw)

        return returnPath;
    }

    if (pathButtonStatus === "Cancel" && specialisation.title !== "None selected") {
        pathComponent = <div id="newPathComponent">
            <div>New Path:</div><div>
            <strong>Name:</strong>
            <EditText name="Path Name" onSave={handleNewPathNameChange} showEditButton style={{ width: '200px' }} placeholder="Enter new path name" inline />
        </div>

            <div>
                <strong>Requirements:</strong>
                <EditTextarea name="Path Requirements" onSave={handleNewPathReqChange} rows={2} style={{ paddingTop: 0 }} placeholder="Enter new path requirements" />
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

    //conditionally change to show if a specialisation has any paths
    //also onlys shows submit button if a specialisation is selected
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
                <EditText name="Path Name" onSave={handlePathNameChange} showEditButton style={{ width: '200px' }} defaultValue={path.title} inline />
            </div>

            <div>
                <strong>Requirements:</strong>
                <EditTextarea name="Path Requirements" onSave={handlePathReqChange} style={{ paddingTop: 0 }} defaultValue={path.requirements_raw} />
            </div>

        </div>;
        if (specialisation.title !== "None selected") {
            submitButton = <button onClick={UpdateSpecialisationWithPath} className="btn btn--light-blue">
                Update Specialisation
            </button>;
        }
        else {
            submitButton = null;
        }
    } else {
        pathSection = <div>Specialisation has no Paths</div>;
        if (specialisation.title !== "None selected") {
            submitButton = <button onClick={UpdateSpecialisation} className="btn btn--light-blue">
                Update Specialisation
            </button>;
        }
        else {
            submitButton = null;
        }
    }

    const [newPathOpen, setNewPathOpen] = useState(false);
    const [updateMajorOpen, setUpdateSpecialisationOpen] = useState(false);

    const [helpOpen, setHelpOpen] = useState(false);
    const popupHelper = () => {
        setHelpOpen(true);
    }

    let pathButtonOption;

    if (specialisation.title !== "None selected") {
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
                Specialisation:
            </div>

            <div id="staffspecialisationEdit">

                <select
                    name="staffspecialisationEdit"
                    id="staffspecialisationEdit"
                    onChange={(e) => setStaffSpecialisation(selectStaffMajor(e.target.value, specialisationOptions))}
                >
                    {specialisationOptions.map((m: StaffMajor) => {
                        const specialisation = [
                            <option value={m.title} key={m.title}>
                                {m.title}
                            </option>,
                        ];
                        return specialisation;
                    })}
                </select>
                <div>
                    <strong>Name:</strong>
                    <EditText name="Specialisation Name" onSave={handleMajorNameChange} showEditButton style={{ width: '200px' }} defaultValue={specialisation.title} inline />
                </div>

                <div>
                    <strong>Requirements:</strong>
                    <EditTextarea name="Specialisation Requirements" onSave={handleMajorReqChange} style={{ paddingTop: 0 }} defaultValue={specialisation.requirements_raw} />
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
                <br></br>
                <div>
                    {pathComponent}
                </div>
                <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>
                <BasePopup
                    header="Success"
                    body={`A new path: ${newPathTitle} has been created for ${specialisation.title}`}
                    closeText="Ok"
                    open={newPathOpen}
                    setOpen={setNewPathOpen}
                />
                <BasePopup
                    header="Success"
                    body={`The Specialisaion ${specialisation.title} was updated`}
                    closeText="Ok"
                    open={updateMajorOpen}
                    setOpen={setUpdateSpecialisationOpen}
                />
                <StaffPopup
                header="How to use"
                body={`REQUIREMENTS
                \n
                Requirement should be written similarly to other existing specialisation or specialisation requirements.
                
                You can only do one thing at once, you can edit a path or create a new path.
                
                Please refresh after updating or before adding additional paths.`}
                closeText="Ok"
                open={helpOpen}
                setOpen={setHelpOpen}
            />

            </div>
        </React.Fragment>


    );
};

export default EditSpecialisation;