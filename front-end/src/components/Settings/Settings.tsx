import {
  DegreeType,
  PlannerInputType,
  MajorType,
} from '../../helpers/TypeInterfaces';
import Select, { OptionType } from '../Select/Select';
import './Settings.scss';

interface SettingsProps {
  majors: MajorType[];
  specialisations: MajorType[];
  plannerInput: PlannerInputType;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  degreeType: DegreeType;
  setDegreeType: React.Dispatch<React.SetStateAction<DegreeType>>;
  years: number[];
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

const getMajorOptions = (majorInput: MajorType[]) => {
  const options: OptionType[] = [
    { value: 'none', key: 'none', label: 'None selected' },
  ];

  majorInput.forEach((major: MajorType) => {
    options.push({
      label: major.title,
      value: major.title,
      key: major.title,
    });
  }, []);

  return options;
};

const getYearsOptions = (years: Array<number>) => {
  const options: OptionType[] = [];
  years.forEach((year: Number) => {
    options.push({
      label: year.toString(),
      value: year.toString(),
      key: year.toString(),
    });
  }, []);
  return options;
};

const Settings = ({
  majors,
  specialisations,
  plannerInput,
  setPlannerInput,
  degreeType,
  setDegreeType,
  years,
  setYear,
}: SettingsProps) => {
  const options = getMajorOptions(majors);
  const specialisationOptions = getMajorOptions(specialisations);

  const yearChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);

    if (isNaN(newYear)) {
      return;
    }

    setYear(newYear);
  };

  const major1SelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMajor(0, e.target.value);
  };
  const major2SelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMajor(1, e.target.value);
  };

  const updateMajor = (id: number, major: string) => {
    plannerInput.Majors[id] = major === 'none' ? '' : major;
    plannerInput.Majors = plannerInput.Majors.filter((major) => major !== '');
    setPlannerInput({ ...plannerInput });
  };

  const degreeTypeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDegreeType(e.target.value as DegreeType);
    setPlannerInput((oldPlannerInput) => {
      return {
        ...oldPlannerInput,
        MajorType: e.target.value,
        Majors: [],
      };
    });
  };

  return (
    <div className="Settings">
      <div className="Settings__inner">
        <div className="Settings__item">
          <Select
            name={'degreeType'}
            id={'degreeType'}
            label={'Degree Type'}
            onChange={degreeTypeSelectHandler}
            value={degreeType}
            options={Object.values(DegreeType).map((type) => ({
              key: type,
              value: type,
              label: type,
            }))}
          />
        </div>
        <div className="Settings__item">
          <Select
            options={getYearsOptions(years)}
            name={'startYear'}
            id={'startYear'}
            label={'Start Year'}
            value={plannerInput.StartYear.toString()}
            onChange={yearChangeHandler}
          />
        </div>
      </div>

      <div className="Settings__inner">
        {degreeType === DegreeType.SPECIALISATION && (
          <div className="Settings__item">
            <Select
              name={'specialisation'}
              id={'specialisation'}
              label={'Specialisation'}
              onChange={major1SelectHandler}
              value={plannerInput.Majors[0]}
              options={specialisationOptions}
            />
          </div>
        )}

        {degreeType === DegreeType.MAJORS && (
          <>
            <div className="Settings__item">
              <Select
                name={'major1'}
                id={'major1'}
                label={'Major 1'}
                onChange={major1SelectHandler}
                value={plannerInput.Majors[0]}
                disabledValues={[plannerInput.Majors[1]]}
                options={options}
              />
            </div>
            <div className="Settings__item">
              <Select
                name={'major2'}
                id={'major2'}
                label={'Major 2'}
                onChange={major2SelectHandler}
                value={plannerInput.Majors[1]}
                disabledValues={[plannerInput.Majors[0]]}
                options={options}
              />
            </div>
          </>
        )}
      </div>
      <div className="Settings__print">
        <div className="Settings__print-item">
          <h4 className="Settings__print-title">Degree Type: </h4>
          <div className="Settings__print-value">{degreeType}</div>
        </div>
        <div className="Settings__print-item">
          <h4 className="Settings__print-title">Start Year:</h4>
          <div className="Settings__print-value">
            {plannerInput.StartYear.toString()}
          </div>
        </div>
        {plannerInput.Majors.length > 0 && plannerInput.Majors[0] && (
          <div className="Settings__print-item">
            <h4 className="Settings__print-title">
              {degreeType === DegreeType.MAJORS
                ? plannerInput.Majors.length === 2
                  ? 'Major 1:'
                  : 'Major:'
                : 'Specialisation:'}
            </h4>
            <div className="Settings__print-value">
              {plannerInput.Majors[0]}
            </div>
          </div>
        )}
        {plannerInput.Majors.length === 2 && plannerInput.Majors[1] && (
          <div className="Settings__print-item">
            <h4 className="Settings__print-title">Major 2:</h4>
            <div className="Settings__print-value">
              {plannerInput.Majors[1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
