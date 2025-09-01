import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { StaffMajor } from '../helpers/TypeInterfaces';
import 'react-edit-text/dist/index.css';
import axios from 'axios';
import BasePopup from '../components/BasePopup/BasePopup';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';
import { GoTriangleLeft } from 'react-icons/go';
import { NavLink } from "react-router-dom";

const CreateMajor = () => {

    const [majorTitle, setNewMajortitle] = useState("");
    const [majorReq, setNewMajorreq] = useState("");

    const handleNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewMajortitle(value);
    }
    const handleReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewMajorreq(value);
    }

    const CreateNewMajor = async () => {
        if (majorTitle.length > 0 && majorReq.length > 0) {
            let newMajor: StaffMajor = {
                title: majorTitle,
                requirements_raw: majorReq,
                requirements: [],
                paths: []
            }
            const parseReqs = async () => {
                const response = await axios.get(
                    `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                    params: {
                        requirement: newMajor.requirements_raw,
                    },
                }
                );
                newMajor.requirements = (response.data);
            }
            await parseReqs();

            let jsonString = JSON.stringify(newMajor);
            const postMajorUpdate = async () => {
                const response = await axios.post('https://localhost:5001/api/Major/CreateMajor', null, {
                    headers: {
                        Authorization: `Basic ${btoa('staff:staffPassword')}`,
                    },
                    params: {
                        majorInput: jsonString,
                    },
                });
            }
            await postMajorUpdate();
            setCreateMajorSuccess(true);

        }
        else {
            setCreateMajorError(true);
        }
    }

    const [createMajorSuccess, setCreateMajorSuccess] = useState(false);
    const [createMajorError, setCreateMajorError] = useState(false);

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
            <div>
                Create Major
            </div>
            <br></br>
                <div>
                    <strong>Name:</strong>
                    <EditText name="Major Name" onSave={handleNameChange} showEditButton style={{ width: '200px' }} placeholder="Enter Name" inline />
                </div>

                <div>
                    <strong>Requirements:</strong>
                    <EditText name="Major Requirements" onSave={handleReqChange} showEditButton style={{ width: '200px' }} placeholder="Requirements" inline />
                </div>
                <br></br>
                <div>
                    <button onClick={CreateNewMajor} className="btn btn--light-blue">
                        Create New Major
                    </button>
                </div>
            </div>
            <div className="HelpButton">
                <button onClick={popupHelper} className="btn btn--light-blue">
                    Help
                </button>
            </div>
            <BasePopup
                header="Missing Value"
                body={`The major needs to have: Name and Requirements`}
                closeText="Ok"
                open={createMajorError}
                setOpen={setCreateMajorError}
            />

            <BasePopup
                header="Success"
                body={`The Major ${majorTitle} was created`}
                closeText="Ok"
                open={createMajorSuccess}
                setOpen={setCreateMajorSuccess}
            />
            <StaffPopup
                header="How to use"
                body={`
                REQUIREMENTS
                \n
                Requirement should be written similarly to other exsting major or specialisation requirements.
                
                New Paths can be added under edit major/specialisation after creation`}
                closeText="Ok"
                open={helpOpen}
                setOpen={setHelpOpen}
            />

        </React.Fragment>


    );
};

export default CreateMajor;