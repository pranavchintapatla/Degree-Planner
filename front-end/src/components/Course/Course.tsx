import { DraggableProvided } from 'react-beautiful-dnd';
import {
  FaStar,
  FaBan,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames';
import {
  CourseDict,
  PlannerInputType,
  InternalCourseType,
  ReqAssociation,
  Term,
  FacultyType,
} from '../../helpers/TypeInterfaces';
import './Course.scss';
import React, { CSSProperties } from 'react';
import ReactTooltip from 'react-tooltip';
import { updateCourseSlot } from '../../helpers/DragDropHelpers';
import BasePopup from '../BasePopup/BasePopup';
import { facultyLabel } from '../Courses/Courses';
import { all } from 'q';

interface CourseProps {
  semesterIndex: number;
  course: InternalCourseType;
  index: number;
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
  style?: CSSProperties;
  isDragging?: boolean;
  provided: DraggableProvided;
}

const Course = ({
  semesterIndex,
  course,
  reqAssociations,
  setCourses,
  setPlannerInput,
  style = {},
  isDragging = false,
  provided,
}: CourseProps) => {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

  const isValidSemester =
    semesterIndex === -1 ||
    course.terms.includes(`S${semesterIndex ? semesterIndex : 'S'}`);

  let reqs: boolean = true;
  if (semesterIndex !== -1 && course.prerequisite) {
    reqs = course.prereqs_met.result;
  }

  const removeCourse = () => {
    updateCourseSlot(course.section, '', setPlannerInput);

    setCourses((oldCourses) => {
      return {
        ...oldCourses,
        [course.courseid]: {
          ...course,
          section: '',
        },
      };
    });
  };

  const infoClickHanlder = () => {
    setIsInfoPopupOpen(true);
  };

  const infoPopupBody = (
    <div className="Course__info-body">
      <h4 className="Course__info-coursename">{course.coursename}</h4>
      <div className="Course__info-description">
        <b>Description:</b> {course.description}
      </div>
      {course.prerequisite_raw && (
        <div className="Course__info-requirements">
          <b>Prerequisite:</b> {course.prerequisite_raw}
        </div>
      )}
      {course.restriction_raw && (
        <div className="Course__info-requirements">
          <b>Restriction:</b> {course.restriction_raw}
        </div>
      )}
      {course.other_requirements_raw && (
        <div className="Course__info-requirements">
          <b>Requirements:</b> {course.other_requirements_raw}
        </div>
      )}
      <a
        className="Course__info-link btn btn--light-blue"
        href={course.urls[0]}
        target="_blank"
        rel="noreferrer"
      >
        Open in CourseOutline
      </a>
    </div>
  );

  return (
    <div
      className={classNames({
        Course: true,
        'Course--dragging': isDragging,
      })}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        ...style,
      }}
      ref={provided.innerRef}
    >
      <div
        className={classNames({
          Course__faculty: true,
          [`Course__faculty--${course.schedule}`]: true,
        })}
        data-tip={facultyLabel[course.schedule]}
        data-place={course.section ? 'top' : 'right'}
      ></div>
      <div className="Course__title">
        {course.courseid}
        <span className="Course__info" onClick={infoClickHanlder}>
          <FaInfoCircle />
        </span>
      </div>

      <div className="Course__semesters">
        {Object.values(Term).map((term) => (
          <div
            key={term}
            className={classNames({
              Course__semester: true,
              'Course__semester--disabled': !course.terms.includes(term),
            })}
          >
            {term}
          </div>
        ))}
      </div>

      <div className="Course__features">
        <div
          className={classNames({
            Course__feature: true,
            'Course__feature--prerequisites': true,
            'Course__feature--enabled': !reqs || !isValidSemester,
          })}
          data-tip={
            !isValidSemester
              ? 'Invalid semester'
              : `Prerequsite: ${course.prerequisite_raw}`
          }
          data-tip-disable={reqs}
        >
          <FaExclamationTriangle />
        </div>
        <div
          className={classNames({
            Course__feature: true,
            'Course__feature--required': true,
            'Course__feature--enabled': course.courseid in reqAssociations,
          })}
          data-tip={'Recommended Course'}
          data-tip-disable={!(course.courseid in reqAssociations)}
        >
          <FaStar />
        </div>
        <div
          className={classNames({
            Course__feature: true,
            'Course__feature--restrictions': true,
            'Course__feature--enabled': !course.unrestricted.result,
          })}
          data-tip={`Restrictions: ${course.restriction_raw}`}
          data-tip-disable={course.unrestricted.result}
        >
          <FaBan />
        </div>
      </div>

      <div className="Course__close" onClick={removeCourse}>
        <IoClose />
      </div>

      <ReactTooltip
        key={course.courseid}
        place="bottom"
        multiline={true}
        effect="solid"
      />
      <BasePopup
        header={course.courseid}
        body={infoPopupBody}
        open={isInfoPopupOpen}
        setOpen={setIsInfoPopupOpen}
      />
    </div>
  );
};

Course.defaultProps = {
  display: true,
};

export default Course;
