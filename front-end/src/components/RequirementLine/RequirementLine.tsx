import classNames from 'classnames';
import {
  IoAlertCircleOutline,
  IoCheckmarkCircle,
  IoRemoveCircleOutline,
} from 'react-icons/io5';
import generateRequirementText from '../../helpers/GenerateRequirementText';
import { CheckResult } from '../../helpers/TypeInterfaces';
import './RequirementLine.scss';

interface RequirementLineProps {
  req: (string | string[])[];
  req_result: CheckResult;
}

const RequirementLine = ({ req, req_result }: RequirementLineProps) => {
  if (!req_result) {
    return <div></div>;
  }

  if (req[0] === 'or') {
    return (
      <div
        className={classNames({
          RequirementLine: true,
          'RequirementLine--complete': req_result.result,
          'RequirementLine--incomplete': !req_result.result,
        })}
      >
        <div className={'RequirementLine__icon'}>
          {req_result.result && <IoCheckmarkCircle />}
          {!req_result.result && <IoRemoveCircleOutline />}
        </div>
        {req.slice(1).map((or_req, index) => {
          return (
            <div className="RequirementLine__inner" key={'or' + index}>
              <div className={req_result.result ? 'complete' : 'incomplete'}>
                {generateRequirementText(or_req as string[], req_result, index)}
              </div>
              {req.length >= 2 && index < req.length - 2 && (
                <div className="RequirementLine__or">{' or '}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const isComplete = req_result.result;
  const isPartlyComplete =
    !req_result.result && !!req_result.count && req_result.count > 0;
  const isIncomplete =
    !req_result.result && (!req_result.count || req_result.count === 0);

  return (
    <div
      className={classNames({
        RequirementLine: true,
        'RequirementLine--complete': isComplete,
        'RequirementLine--partlycomplete': isPartlyComplete,
        'RequirementLine--incomplete': isIncomplete,
      })}
    >
      <div className={'RequirementLine__icon'}>
        {isComplete && <IoCheckmarkCircle />}
        {isPartlyComplete && <IoAlertCircleOutline />}
        {isIncomplete && <IoRemoveCircleOutline />}
      </div>
      <span>{generateRequirementText(req as string[], req_result)}</span>
    </div>
  );
};

export default RequirementLine;
