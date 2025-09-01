import React from 'react';
import './BasePopup.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//This component is used as a template for most popups the application needs (planner load success/fail etc.)

interface BasePopupProps {
  header: string;
  body: string | JSX.Element;
  closeText?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasePopup = ({
  header,
  body,
  closeText,
  open,
  setOpen,
}: BasePopupProps) => {
  return (
    <Popup
      contentStyle={{ width: '25%' }}
      open={open}
      modal
      onClose={() => setOpen(false)}
    >
      <div className="modal">
        <button className="close" onClick={() => setOpen(false)}>
          &times;
        </button>
        <div className="header"> {header} </div>
        <div className="content">{body}</div>
        {closeText && (
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
        )}
      </div>
    </Popup>
  );
};

export default BasePopup;
