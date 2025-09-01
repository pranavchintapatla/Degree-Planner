import { CSSProperties, useState } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
} from 'react-beautiful-dnd';
import Course from '../Course/Course';
import {
  CourseDict,
  CoursesType,
  FilterTerm,
  PlannerInputType,
  InternalCourseType,
  ReqAssociation,
  FacultyType,
} from '../../helpers/TypeInterfaces';
import Input from '../Input/Input';
import './Courses.scss';
import { areEqual, FixedSizeList } from 'react-window';
import React from 'react';
import RadioList from '../RadioList/RadioList';
import useRemtoPx from '../../helpers/RemToPxHook';
import Select from '../Select/Select';
import ReactTooltip from 'react-tooltip';
import _ from 'underscore';
import { FaBan, FaExclamationTriangle, FaStar } from 'react-icons/fa';

interface CourseColumnProps {
  courses: CourseDict;
  title: string;
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
}

interface RowDataType {
  courses: InternalCourseType[];
  reqAssociations: ReqAssociation;
  setCourses: React.Dispatch<React.SetStateAction<CourseDict>>;
  setPlannerInput: React.Dispatch<React.SetStateAction<PlannerInputType>>;
}

interface RowProps {
  data: RowDataType;
  index: number;
  style: CSSProperties;
}

const Row = React.memo(({ data, index, style }: RowProps) => {
  const { courses, reqAssociations, setCourses, setPlannerInput } = data;
  const course = courses[index];

  return (
    <Draggable
      draggableId={course.courseid}
      key={course.courseid}
      index={index}
      isDragDisabled={course.coursename === 'name'}
    >
      {(provided: DraggableProvided) => (
        <Course
          semesterIndex={-1}
          course={course}
          index={index}
          setCourses={setCourses}
          setPlannerInput={setPlannerInput}
          key={course.courseid}
          reqAssociations={reqAssociations}
          style={style}
          provided={provided}
        />
      )}
    </Draggable>
  );
}, areEqual);

export const facultyLabel: Record<FacultyType, string> = {
  [FacultyType.ARTS]: 'Arts',
  [FacultyType.BUSINESS_AND_ECONOMICS]: 'Business and Economics',
  [FacultyType.CREATIVE_ARTS_AND_INDUSTRIES]: 'Creative Arts and Industries',
  [FacultyType.EDUCATION_AND_SOCIAL_WORK]: 'Education and Social Work',
  [FacultyType.ENGINEERING]: 'Engineering',
  [FacultyType.GENEDS]: 'General Education',
  [FacultyType.LAW]: 'Law',
  [FacultyType.MEDICAL_AND_HEALTH_SCIENCES]: 'Medical and Health Sciences',
  [FacultyType.SCIENCE]: 'Science',
};

const facultyOptions = [
  { key: 'All faculties', value: 'All faculties', label: 'All' },
  ...Object.values(FacultyType).map((faculty) => ({
    key: faculty,
    value: faculty,
    label: facultyLabel[faculty],
  })),
];

const Courses = ({
  courses,
  title,
  reqAssociations,
  setCourses,
  filter,
  setFilter,
  setPlannerInput,
}: CourseColumnProps) => {
  const [faculty, setFaculty] = useState(facultyOptions[0].value);
  const [type, setType] = useState<CoursesType | string>(CoursesType.ALL);
  const [term, setTerm] = useState<string>(FilterTerm.ALL);

  const facultyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFaculty(e.target.value);
  };

  const typeChangeHandler = (value: CoursesType | string) => {
    setType(value);
  };

  const termChangeHandler = (value: string) => {
    setTerm(value);
  };

  const filterChangeHandler = (value: string) => {
    const newFilter = value.toLowerCase();

    if (filter === newFilter) {
      return;
    }

    setFilter(newFilter);
  };

  let filteredCourses = Object.values(courses).filter((course) => {
    return (
      course.section === '' &&
      (type === CoursesType.RECOMMENDED ? course.isRecommended : true) &&
      (filter === '' || course.courseid.toLowerCase().includes(filter)) &&
      (term === FilterTerm.ALL || course.terms.includes(term)) &&
      (faculty === 'All faculties' || course.schedule === faculty)
    );
  });

  filteredCourses = filteredCourses.sort((a, b) => {
    if (a.courseid > b.courseid) return 1;
    if (a.courseid < b.courseid) return -1;
    return 0;
  });

  const courseHeight = useRemtoPx(3);

  return (
    <div className="Courses">
      <div className="Courses__filter-types">
        <h3 className="Courses__title">Faculty</h3>
        <Select
          id="faculty-filter"
          value={faculty}
          options={facultyOptions}
          name={'faculty-filter' + title}
          onChange={facultyChangeHandler}
        />
      </div>
      <div className="Courses__filter-types">
        <h3 className="Courses__title">Courses</h3>
        <RadioList
          options={Object.values(CoursesType)}
          name={'course-filter' + title}
          onChange={typeChangeHandler}
          direction="row"
        />
      </div>

      <div className="Courses__term">
        <h3 className="Courses__title">Terms</h3>
        <RadioList
          options={Object.values(FilterTerm)}
          name={'course-term' + title}
          onChange={termChangeHandler}
          direction="row"
        />
      </div>

      <div className="Courses__search-input">
        <Input
          type="text"
          id={`course-filter-${type}`}
          onChange={filterChangeHandler}
        />
      </div>

      <Droppable
        droppableId={type}
        mode="virtual"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric
        ) => (
          <Course
            semesterIndex={-1}
            course={filteredCourses[rubric.source.index]}
            index={rubric.source.index}
            setCourses={setCourses}
            setPlannerInput={setPlannerInput}
            key={filteredCourses[rubric.source.index].courseid}
            reqAssociations={reqAssociations}
            isDragging={snapshot.isDragging}
            provided={provided}
          />
        )}
      >
        {(provided) => (
          <>
            <FixedSizeList
              height={500}
              itemCount={filteredCourses.length}
              itemSize={courseHeight}
              width={'100%'}
              outerRef={provided.innerRef}
              itemData={{
                courses: filteredCourses,
                reqAssociations,
                setCourses,
                setPlannerInput,
              }}
              onScroll={_.throttle(() => {
                ReactTooltip.rebuild();
                ReactTooltip.hide();
              }, 200)}
            >
              {Row}
            </FixedSizeList>
          </>
        )}
      </Droppable>

      <div className="Courses__legend">
        <h3 className="Courses__legend-title">Legend</h3>
        <div className="Courses__legend-info">
          <div className="required">
            <FaStar />
          </div>
          <div className="Courses__legend-item Courses__legend-item--required-description">
            <p>
              This symbol indicates that the course is a recommended course for
              your degree.
            </p>
          </div>
          <div className="prerequisite">
            <FaExclamationTriangle />
          </div>
          <div className="Courses__legend-item Courses__legend-item--prerequisite-description">
            <p>
              This symbol indicates that the course has prerequisites that have
              not yet been met.
            </p>
          </div>
          <div className="restriction">
            <FaBan />
          </div>
          <div className="Courses__legend-item Courses__legend-item--restriction-description">
            <p>
              This symbol indicates that the course has restrictions that have
              not yet been met.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
