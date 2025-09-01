import classNames from 'classnames';
import { IoCheckmarkCircle, IoRemoveCircleOutline } from 'react-icons/io5';
import { CheckResult, Requirement } from '../../helpers/TypeInterfaces';
import RequirementLine from './../RequirementLine/RequirementLine';
import './Requirements.scss';

interface RequirementProps {
  requirements: Requirement;
  result: boolean;
  subresults: CheckResult[];
  title: string;
}

const Requirements = ({
  requirements,
  result,
  subresults,
  title,
}: RequirementProps) => {
  if (typeof requirements === 'string') {
    return <div></div>;
  }

  return (
    <div
      className={classNames({
        Requirements: true,
        'Requirements--complete': result,
        'Requirements--incomplete': !result,
      })}
    >
      <h3 className="Requirements__title">
        <div className="Requirements__icon">
          {result ? <IoCheckmarkCircle /> : <IoRemoveCircleOutline />}
        </div>
        {title}:
      </h3>

      <div className="Requirements__lines">
        {requirements.slice(1).map((req, index) => {
          return (
            <RequirementLine
              req={req as (string | string[])[]}
              key={'degreereq' + index}
              req_result={subresults[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Requirements;
