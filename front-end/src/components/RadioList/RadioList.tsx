import classNames from 'classnames';
import { useState } from 'react';
import './RadioList.scss';

interface RadioListProps {
  options: string[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  direction?: 'row' | 'column';
}

const RadioList = ({
  options,
  defaultValue,
  name,
  onChange = () => {},
  direction = 'column',
}: RadioListProps) => {
  const [value, setValue] = useState(defaultValue || options[0]);

  const changeHandler = (option: string) => {
    setValue(option);
    onChange(option);
  };

  return (
    <div
      className={classNames({
        RadioList: true,
        [`RadioList--${direction}`]: true,
      })}
    >
      {options.map((option) => (
        <label
          className={classNames({
            RadioList__label: true,
            'RadioList__label--checked': option === value,
          })}
          htmlFor={`${name}:${option}`}
          key={option}
        >
          <input
            className="RadioList__input"
            name={name}
            type="radio"
            id={`${name}:${option}`}
            onChange={() => changeHandler(option)}
            checked={option === value}
          />
          <div className="RadioList__fakeinput" />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioList;
