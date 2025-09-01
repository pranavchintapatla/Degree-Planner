import classNames from 'classnames';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './Input.scss';

interface InputProps {
  id: string;
  type: HTMLInputElement['type'];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  label?: string;
}

const Input = ({
  id,
  type,
  onChange,
  value = '',
  placeholder = '',
  label = '',
}: InputProps) => {
  const [innerValue, setInnerValue] = useState(value);

  const clearHandler = () => {
    setInnerValue('');
    onChange('');
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (innerValue === newValue) {
      return;
    }

    setInnerValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="Input">
      {label && (
        <label className="Input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="Input__input"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={innerValue}
      />
      <div
        className={classNames({
          Input__clear: true,
          'Input__clear--hidden': innerValue === '',
        })}
        onClick={clearHandler}
      >
        <IoClose />
      </div>
    </div>
  );
};

export default Input;
