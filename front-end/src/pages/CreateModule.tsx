//Not currently implemented

import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { StaffModule } from '../helpers/TypeInterfaces';

const CreateModule = () => {

    const [moduletitle, setnewmoduletitle] = useState("");
    const [modulereq, setnewmodulereq] = useState("");

    const handleNameChange = ({ name, value, previousValue }: onSaveProps) => {
        setnewmoduletitle(value);
    }
    const handleReqChange = ({ name, value, previousValue }: onSaveProps) => {
        setnewmodulereq(value);
    }

    const CreateNewModule = () => {
        let newModule: StaffModule = {
            title: moduletitle,
            requirements_raw: modulereq,
            requirements: [],
        }
        console.log(newModule);
    }

    return (
        <React.Fragment>
            <div>
                Create Module
            </div>
            <div>
                <strong>Name:</strong>
                <EditText name="Module Name" onSave={handleNameChange} showEditButton style={{ width: '200px' }} placeholder="Enter Name" inline />
            </div>

            <div>
                <strong>Requirements:</strong>
                <EditText name="Module Requirements" onSave={handleReqChange} showEditButton style={{ width: '200px' }} placeholder="Requirements" inline />
            </div>

            <div>
                <button onClick={CreateNewModule}>
                    Create New Module
                </button>
            </div>

        </React.Fragment>


    );
};

export default CreateModule;