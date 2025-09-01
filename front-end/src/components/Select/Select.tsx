import React from 'react';
import './Select.scss';

interface SelectProps {
  options: OptionType[];
  label?: string;
  value: string;
  name: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabledValues?: string[];
}

export interface OptionType {
  value: string;
  key: string;
  label: string;
}

const Select = ({
  options,
  label,
  value,
  name,
  id,
  onChange: onChangeHandler,
  disabledValues,
}: SelectProps) => {
  return (
    <div className="Select">
      {label && (
        <label className="Select__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="Select__select-container">
        <select
          className="Select__select"
          name={name}
          id={id}
          onChange={onChangeHandler}
          value={value}
        >
          {options.map((option: OptionType) => {
            const isDisabled =
              option.value !== 'none' && disabledValues?.includes(option.value);

            return (
              <option
                value={option.value}
                key={`${id}:${option.key}`}
                disabled={isDisabled}
              >
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
