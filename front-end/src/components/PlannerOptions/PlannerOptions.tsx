import React, { useState } from 'react';
import { PlannerInputType } from '../../helpers/TypeInterfaces';
import { savePlanner, loadPlanner } from '../../helpers/PlannerOptionsHelper';
import './PlannerOptions.scss';
import BasePopup from '../BasePopup/BasePopup';

//This component displays the load and save options that are located on the planner page

interface PlannerOptionsProps {
  plannerInput: PlannerInputType;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
}

const PlannerOptions = ({
  plannerInput,
  setPlannerInput,
}: PlannerOptionsProps) => {
  //Popup states
  const [loadOpen, setLoadOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [loadFailOpen, setLoadFailOpen] = useState(false);

  const loadButtonHandler = async () => {
    const planner = await loadPlanner();
    if (planner.Id === 'default_planner') {
      setLoadFailOpen(true);
    } else {
      setPlannerInput(planner);
      setLoadOpen(true);
    }
  };

  return (
    <div className="PlannerOptions">
      <h3 className="PlannerOptions__title">Options</h3>
      <button
        className="PlannerOptions__btn btn btn--light-blue"
        onClick={loadButtonHandler}
      >
        Load Planner
      </button>
      <button
        className="PlannerOptions__btn btn btn--light-blue"
        onClick={() => {
          savePlanner(plannerInput);
          setSaveOpen(true);
        }}
      >
        Save Planner
      </button>
      <button
        className="PlannerOptions__btn btn btn--light-blue"
        onClick={() => window.print()}
      >
        Print/Save as PDF
      </button>
      <BasePopup
        header="Success"
        body="Planner successfully loaded."
        closeText="Ok"
        open={loadOpen}
        setOpen={setLoadOpen}
      />
      <BasePopup
        header="Error"
        body="You have not saved a planner."
        closeText="Ok"
        open={loadFailOpen}
        setOpen={setLoadFailOpen}
      />
      <BasePopup
        header="Success"
        body="Planner successfully saved."
        closeText="Ok"
        open={saveOpen}
        setOpen={setSaveOpen}
      />
    </div>
  );
};

export default PlannerOptions;
