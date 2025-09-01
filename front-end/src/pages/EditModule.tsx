//Not currently implemented

import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { StaffModule } from '../helpers/TypeInterfaces';
import { selectStaffModule } from "../helpers/StaffHelper";
import { NavLink } from "react-router-dom";

const EditModule = () => {
    const modules = require("../data/modules.json");

    const [module, setStaffModule]: [
        StaffModule,
        React.Dispatch<React.SetStateAction<StaffModule>>
    ] = useState(() => selectStaffModule("Data Analysis", modules));

    return (
        <React.Fragment>
            <li>
                <NavLink to="/staff">Return</NavLink>
            </li>

            <div id="staffCourseEdit">
                <select
                    name="staffCourseEdit"
                    id="staffCourseEdit"
                    onChange={(e) => setStaffModule(selectStaffModule(e.target.value, modules))}

                >
                    {modules.map((m: StaffModule) => {
                        const module = [
                            <option value={m.title} key={m.title}>
                                {m.title}
                            </option>,
                        ];
                        return module;
                    })}
                </select>
            </div>
            <div>
                <strong>Module Title:</strong>
                <EditText id="editmoduleid" name="courseId" showEditButton style={{ width: '200px' }} defaultValue={module.title} inline />
            </div>
            <div>
                <strong>Module Requirements:</strong>
                <EditText id="editmodulereq" name="courseName" showEditButton style={{ width: '200px' }} defaultValue={module.requirements_raw} inline />
            </div>
        </React.Fragment>
    )
};

export default EditModule;