import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { DegreeType, PlannerInputType } from '../../helpers/TypeInterfaces';
import { loadPlanner } from '../../helpers/PlannerOptionsHelper';
import './Home.scss';
import BasePopup from '../../components/BasePopup/BasePopup';

//Home page component - it is displayed when the user logs in

interface HomeProps {
  degreeType: DegreeType;
  setDegreeType: React.Dispatch<React.SetStateAction<DegreeType>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
}

const Home = ({ degreeType, setDegreeType, setPlannerInput }: HomeProps) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const radioSelectMajor = () => {
    setDegreeType(DegreeType.MAJORS);
  };

  const radioSelectSpecialisation = () => {
    setDegreeType(DegreeType.SPECIALISATION);
  };

  const loadButtonClickHandler = async () => {
    const planner = await loadPlanner();

    if (planner.Id === 'default_planner') {
      setOpen(true);
    } else {
      setPlannerInput(planner);
      navigate('/planner');
    }
  };

  const create = () => {
    navigate('/planner');
  };

  const features = [
    'Easy Drag and Drop Courses',
    'Plan Each Semester',
    'Helpful Feedback About Requirements',
    'Customised List of Courses',
  ];

  return (
    <div className="Home">
      <section className="Home__welcome">
        <div className="Home__title-wrapper">
          <h1 className="Home__title">Plan Your Degree</h1>
        </div>
        <div className="Home__features">
          {features.map((feature, index) => (
            <div className="Home__feature" key={index}>
              <h2>{feature}</h2>
            </div>
          ))}
        </div>
        <hr className="Home__break-line" />
        <div className="Home__text">
          <p>
            Welcome to the University of Auckland Degree Planner. Here you can
            plan your Bachelor of Science degree. Each planner you make will
            give you helpful feedback about course requirements - whether this
            be required courses for your chosen major, prerequisites or
            restrictions for chosen courses, or point requirements for each
            course level.
          </p>
        </div>
        <hr className="Home__break-line" />
        <div className="Home__start-button">
          <button className="btn btn--light-blue" onClick={handleClick}>
            Get Started
          </button>
        </div>
      </section>
      <section ref={ref} className="Home__started-section">
        <div className="Home__degree-types">
          <label className="Home__degree-type" htmlFor="singleDoubleMajor">
            <div>Single/Double Major</div>
            <input
              type="radio"
              id="singleDoubleMajor"
              name="degreePlannerType"
              className="degreePlannerType"
              onChange={radioSelectMajor}
              checked={degreeType === DegreeType.MAJORS}
            />
          </label>
          <label className="Home__degree-type" htmlFor="specialization">
            <div>Specialisation</div>
            <input
              type="radio"
              id="specialization"
              name="degreePlannerType"
              className="degreePlannerType"
              onChange={radioSelectSpecialisation}
              checked={degreeType === DegreeType.SPECIALISATION}
            />
          </label>
        </div>
        <div className="Home__buttons">
          <button className="btn btn--light-blue" onClick={create}>
            Create new planner
          </button>
        </div>
        <hr className="Home__break-line" />
        <div className="Home__buttons">
          <button
            className="btn btn--light-blue"
            onClick={loadButtonClickHandler}
          >
            Load existing planner
          </button>
        </div>
      </section>
      <BasePopup
        header="Error"
        body="You have not saved a planner."
        closeText="Ok"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Home;
