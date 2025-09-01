import React from "react";
import './StaffPopUp.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface StaffPopupProps {
  header: string
  body: string
  closeText: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
 
const StaffPopup = ({header, body, closeText, open, setOpen}:StaffPopupProps) => {
  return (
    <Popup
    contentStyle={{width: "60%"}}
    open={open}
    modal
  >
      <div className="staffmodal">
        <button className="close" onClick={() => setOpen(false)}>
          &times;
        </button>
        <div className="header"> {header} </div>
        <div className="content">
          {body}
        </div>
        <div className="actions">
          <button
            className="btn btn--light-blue"
            onClick={() => {
              setOpen(false);
            }}
          >
            {closeText}
          </button>
        </div>
      </div>
  </Popup>
  );
};
 
export default StaffPopup;