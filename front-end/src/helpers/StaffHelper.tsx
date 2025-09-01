import { InputCourseType } from "./TypeInterfaces";
import { StaffMajor, StaffPath, StaffModule, StaffSpecialisation } from "./TypeInterfaces";

export const selectCourse = (courseidTerm: string, courses: InputCourseType[]): InputCourseType => {
    let courseidTermArray = courseidTerm.split(',');
    let courseid = courseidTermArray[0];
    let term = courseidTermArray[1];
    let temp_course = courses.find((c: InputCourseType) => c.courseid === courseid && c.term === term);
    if (temp_course) {
        if (typeof temp_course.restriction_raw === 'undefined') {
            temp_course.restriction_raw = ""
        }
        if (typeof temp_course.prerequisite_raw === 'undefined') {
            temp_course.prerequisite_raw = ""
        }
        if (typeof temp_course.other_requirements_raw === 'undefined') {
            temp_course.other_requirements_raw = ""
        }
        return {
            ...temp_course
        }
    }
    return { courseid: "Course Not Found", coursename: "", description: "", subject: "", term: "", year: "", requirements: "", url: "", other_requirements_raw: "", restriction_raw: "", prerequisite_raw: "" };
};

export const selectStaffMajorPath = (title: string, majors: StaffMajor[]): StaffMajor => {
    let temp_major = majors.find((m: StaffMajor) => m.title === title);
    if (temp_major) {
        return {
            ...temp_major
        }
    }
    return {title: "major not found", requirements:[], requirements_raw:"", paths:[]};
};

export const selectStaffModule = (title: string, modules: StaffModule[]): StaffModule => {
    let temp_module = modules.find((m: StaffModule) => m.title === title);
    if (temp_module) {
        return {
            ...temp_module
        }
    }
    return {title: "module not found", requirements:[], requirements_raw:""};
};

export const selectPathHelper = (title: string, paths: StaffPath[]): StaffPath => {
    /*
    let emptyPath !: StaffPath ;
    emptyPath.title = "Major has no paths";
    emptyPath.requirements = [];
    emptyPath.requirements_raw = "";
    */

    if (paths.length > 0){
    let temp_major = paths.find((m: StaffPath) => m.title === title);
    if (temp_major) {
        return {
            ...temp_major
        }
    }
    }
    else if (paths.length === 0){
        return {title: "Major has no paths", requirements:[], requirements_raw:""};
    }

    return {title: "major not found", requirements:[], requirements_raw:""};

};

// used for selecting year or schedule
export const selectElement = (name: string, schedules: string[]): string => {
    let temp_schedule = schedules.find(element => element === name);
    if (temp_schedule) {
        return temp_schedule
    }
    return "";
}


