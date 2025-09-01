## Team 20 - Project 12

# SciPlan

![](front-end/public/logo192.png)

## Project Description

SciPlan is a degree planner built specifically for Bachelor of Science students at the University of Auckland.

Students are able to use the planner to see what courses are on offer at the university, and to plan out potential paths for their degree. Additionally, staff can use the application to modify and update details and requirements for courses, majors, and specialisations.

The application uses an intuitive drag-and-drop interface, and provides the user with dynamic feedback on how their selections correspond to the requirements of their programme, making degree planning simple and enjoyable.

---

## Project management tool

The project was managed using the following
[Jira board](https://399team20project.atlassian.net/jira/software/projects/TEAM20/boards/1/roadmap?shared=&atlOrigin=eyJpIjoiZTBmZTQwODljOWI0NDQ3NDlkZmRkZmQzMDU3ZDcwODQiLCJwIjoiaiJ9)

---

## Technologies used to build the project

### Front-end

- [TypeScript](https://www.typescriptlang.org/) version 4.7.4
- [React](https://reactjs.org/) version 17.0.2
- [Sass](https://sass-lang.com/) version 1.54.9
- [axios](https://axios-http.com/) version 0.27.2
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) version 13.1.0
- [react-edit-text](https://www.npmjs.com/package/react-edit-text) version 5.0.2
- [react-icons](https://react-icons.github.io/react-icons/) version 4.4.0
- [reactjs-popup](https://www.npmjs.com/package/reactjs-popup) version 2.0.5
- [react-router](https://reactrouter.com/en/main) version 6.3.0
- [react-tooltip](https://www.npmjs.com/package/react-tooltip) version 4.2.21
- [react-window](https://react-window.vercel.app/#/examples/list/fixed-size) version 1.8.7

### Back-end

- [C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [.NET 5.0](https://dotnet.microsoft.com/en-us/download/dotnet/5.0)
- [EntityFrameworkCore](https://learn.microsoft.com/en-us/ef/core/) version 5.0.9
- [NewtonSoft](https://www.newtonsoft.com/json) version 13.0.1
- [IronPython](https://ironpython.net/) version 3.4

### Data Scraper and Parser

- [Python](https://www.python.org/) version 3.6
- [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) version 4.11.1

---

## Installation and Setup Instructions

1. Install Node.js v16.17.0 from https://nodejs.org/download/release/v16.17.0/. Select the correct file for your device.

2. Install .NET 5.0 from https://dotnet.microsoft.com/en-us/download/dotnet/5.0. Select the correct file for your device.

3. In command prompt, change directory to the back-end folder using `cd`.
   For example:
   `cd /Team20/back-end`

4. Run the backend server.
   `dotnet run`

5. In another command prompt, change directory to the front-end folder using `cd`.
   For example:
   `cd /Team20/front-end`

6. You can run the frontend as a development build or a production build.

   **To run the frontend as a development build:**
   `npm install`
   (This will install all dependencies as specified in `package.json`, and only needs to be done once)
   `npm start`
   The web application will start automatically in your internet browser.

   **To run the frontend as a production build:**
   `npm install`
   (This will install all dependencies as specified in `package.json`, and only needs to be done once)
   `npm run build`
   `npm install -g serve`
   (This installs the server library, and only needs to be done the first time)
   `serve -s build`
   The link to the planner will be copied to your clipboard. Go to your internet browser and paste the link. If the link does not copy to your clipboard, paste http://localhost:3000/ to your internet browser.

7. Test login credentials:

   - ID: `student`
     Password: `studentPassword`

   - ID: `staff`
     Password: `staffPassword`

---

## Future plan

The future plan of our project is to add functionality to select modules and allow students to plan for a Bachelor of Science in a conjoint degree.
The staff functionality also needs some refinement and additional features could be added such as cross credit from other universities.
