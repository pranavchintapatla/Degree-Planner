import { CheckResult } from './TypeInterfaces';

const generateRequirementText = (
  requirement: string | string[],
  req_result: CheckResult,
  or_index: number = -1
): JSX.Element | (string | JSX.Element)[] | string | undefined => {
  //do I need these?
  if (!requirement || requirement.length < 1 || !req_result) {
    return <>could not generate text</>;
  }

  if (typeof requirement === 'string') {
    if (requirement === 'specialisation' && req_result.subresults) {
      return req_result.subresults[or_index].result ? (
        <span className="complete">Specialisation</span>
      ) : (
        <span className="incomplete">Specialisation</span>
      );
    }

    if (requirement === 'major') {
      return req_result.result ? (
        <span className="complete">Major</span>
      ) : (
        <span className="incomplete">Major</span>
      );
    }

    if (requirement === 'capstone') {
      return req_result.result ? (
        <span className="complete">Capstone</span>
      ) : (
        <span className="incomplete">Capstone</span>
      );
    }

    return <span>Unable to read requirement</span>;
  }

  let points = requirement[0];

  if (points === 'and') {
    let subresults: CheckResult[] = [];
    if (req_result.subresults && req_result.subresults[or_index].subresults)
      subresults = req_result.subresults[or_index].subresults as CheckResult[];
    return subresults.map((subresult, index) => {
      return index > 0 ? (
        <span key={index}>
          {' '}
          and{' '}
          {generateRequirementText(requirement[index + 1], subresult) as string}
        </span>
      ) : (
        <span key={index}>
          {generateRequirementText(requirement[index + 1], subresult) as string}
        </span>
      );
    });
  }

  if (/MinSubjects:\d+/.test(requirement[0])) {
    const num = Number(requirement[0].split(':')[1]);

    return (
      <span>
        Minimum of {num} subjects ({req_result.count}/{num}) from the BSc
        Schedule
      </span>
    );
  }

  let points_sentence = points;
  let display_courses: JSX.Element[] = [];

  if (!isNaN(Number(points))) {
    points_sentence = `${points} points from `;

    const last = requirement.length - 2;

    if (
      or_index > -1 &&
      req_result.subresults &&
      req_result.subresults[or_index].subresults
    ) {
      req_result = req_result.subresults[or_index];
    }

    display_courses = requirement.slice(1).map((req_course, index) => {
      if (req_result.subresults === undefined) {
        return <span key={index + req_course}>could not generate text</span>;
      }
      if (req_result.subresults[index])
        if (req_result.subresults[index].result) {
          return (
            <span className="complete" key={index + req_course}>
              {req_course}
              {index < last ? ', ' : ' '}
            </span>
          );
        }

      return (
        <span className="incomplete" key={index + req_course}>
          {req_course}
          {index < last ? ', ' : ' '}
        </span>
      );
    });

    if (display_courses.length === 0) {
      display_courses.push(<span>(Range of Courses Outside Dataset) </span>);
    }
  }

  if (points.includes(':')) {
    let stages;

    [points, stages] = points.split(':');

    if (/^<=\d+/.test(points)) {
      points = String(Number(points.slice(2)) - 1);
      points_sentence = `Maximum ${Number(points)} points at ${stages} `;
    } else {
      points_sentence = `${points} points at ${stages} `;
    }

    if (requirement[1] === 'science') {
      points_sentence += 'from the BSc schedule ';
    }

    if (requirement[1] === 'geneds') {
      points_sentence += 'from the General Education schedules ';
    }

    if (requirement[1] === 'non-bsc') {
      points_sentence += 'from outside the BSc schedule ';
    }
  }

  const counter = `(${req_result.count}/${Number(points)})`;

  return [points_sentence, ...display_courses, counter];
};

export default generateRequirementText;
