import React, { useEffect, useState } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CreateCourse from './CreateCourse';
import { render } from '@testing-library/react';
import { NavLink } from "react-router-dom";
import AccessError from './AccessError';
import useToken from '../helpers/LoginHelpers';
import "./staffStyle.scss"

const Staff = () => {

  const { token, setToken } = useToken();

  const navigate = useNavigate();

  if (token !== "staff") {
    return <AccessError />;
  }

  return (
    <div>
      <h1 style={{
        position: `absolute`,
        left: `33%`,
        textAlign: 'center',
      }}>
        Create or Update Data
      </h1>
      <table style={{
        position: `absolute`,
        left: `20%`,
        top: '30%'
      }}
      >
        <thead><tr className='staffPageHeader'><th>Course</th></tr></thead>
        <tbody>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/createcourse">Create Course</NavLink></td>
          </tr>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/editcourse">Edit Course</NavLink></td>
          </tr>
        </tbody>
      </table>
      <table style={{
        position: `absolute`,
        left: `40%`,
        top: '30%'
      }}
      >
        <thead><tr><th>Major</th></tr></thead>
        <tbody>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/createmajor">Create Major</NavLink></td>
          </tr>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/editmajor">Edit Major</NavLink></td>
          </tr>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/createspecialisation">Create Specialisation</NavLink></td>
          </tr>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/editspecialisation">Edit Specialisation</NavLink></td>
          </tr>
        </tbody>
      </table>

      <table style={{
        position: `absolute`,
        left: `60%`,
        top: '30%'
      }}
      >
        <thead><tr ><th>Planner</th></tr></thead>
        <tbody>
          <tr className='staffPageLink'>
            <td><NavLink className="pageLink" to="/createconcession">Update Concession</NavLink></td>
          </tr>
        </tbody>
      </table>
      {/*
      <li>
        <NavLink to="/createmodule">Create Module</NavLink>
      </li>
      <li>
        <NavLink to="/editmodule">Edit Module</NavLink>
      </li>
      */}

    </div>
  );
};

export default Staff;
