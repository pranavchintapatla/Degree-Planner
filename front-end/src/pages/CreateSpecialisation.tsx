import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { StaffSpecialisation } from '../helpers/TypeInterfaces';
import axios from 'axios';
import BasePopup from '../components/BasePopup/BasePopup';
import StaffPopup from '../components/StaffPopUp/StaffPopUp';
import { GoTriangleLeft } from 'react-icons/go';
import { NavLink } from "react-router-dom";

const CreateSpecialisation = () => {

    const [specialisationTitle, setNewSpecialisationTitle] = useState("");
    const [specialisationReq, setNewSpecialisationReq] = useState("");

    const handleNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewSpecialisationTitle(value);
    }
    const handleReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setNewSpecialisationReq(value);
    }

    const CreateNewSpecialisation = async () => {
        if (specialisationTitle.length > 0 && specialisationReq.length > 0) {
            let newSpecialisation: StaffSpecialisation = {
                title: specialisationTitle,
                requirements_raw: specialisationReq,
                requirements: [],
                paths: []
            }
            const parseReqs = async () => {
                const response = await axios.get(
                    `https://localhost:5001/api/Parse/parseCourseRequirement`, {
                    params: {
                        requirement: newSpecialisation.requirements_raw,
                    },
                }
                );
                newSpecialisation.requirements = (response.data);
            }
            await parseReqs();

            let jsonString = JSON.stringify(newSpecialisation);

            const postSpecialisationUpdate = async () => {
                const response = await axios.post('https://localhost:5001/api/Specialisation/CreateSpecialisation', null, {
                    headers: {
                        Authorization: `Basic ${btoa('staff:staffPassword')}`,
                    },
                    params: {
                        specialisationInput: jsonString,
                    },
                });
            }
            await postSpecialisationUpdate();
            setCreateSpecialisationSuccess(true);

        }
        else {
            setCreateSpecialisationError(true);
        }
    }

    const [createSpecialisationSuccess, setCreateSpecialisationSuccess] = useState(false);
    const [createSpecialisationError, setCreateSpecialisationError] = useState(false);

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
            <br></br>
            <div>
            <div style={{textAlign:'center'}}>
                Create Specialisation
            </div>
            <br></br>
            <div>
                <strong>Name:</strong>
                <EditText name="Specialisation Name" onSave={handleNameChange} showEditButton style={{ width: '200px' }} placeholder="Enter Name" inline />
            </div>

            <div>
                <strong>Requirements:</strong>
                <EditText name="Specialisation Requirements" onSave={handleReqChange} showEditButton style={{ width: '200px' }} placeholder="Requirements" inline />
            </div>
            <br></br>
            <div>
                <button onClick={CreateNewSpecialisation} className="btn btn--light-blue">
                    Create New Specialisation
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
                open={createSpecialisationError}
                setOpen={setCreateSpecialisationError}
            />

            <BasePopup
                header="Success"
                body={`The Major ${specialisationTitle} was created`}
                closeText="Ok"
                open={createSpecialisationSuccess}
                setOpen={setCreateSpecialisationSuccess}
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

export default CreateSpecialisation;