import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";


const releaseEvents = ["2019-05-12", "2019-05-24", "2019-06-12", "2019-06-24", "2019-07-12", "2019-07-24", "2019-08-12", "2019-08-24", "2019-09-12", "2019-10-12"];
const resources = ["Arthur, Brian", "Kozarzewska-Brunet, Kinga", "Leung, Fred", "McEnery, Michael", "Stone, Barbara"];

const projectData = [];
for (let x = 0; x < 160; x ++) {
  projectData.push({"projectName": "Project "+x, "projectPhase": "Phase "+(x%8), "applicationName": "App "+(x%13), "releaseEvent": releaseEvents[x%(releaseEvents.length)], "resources": resources[x%(resources.length)], "projectDetails": "Details"});
}

const filterList = [
  {key: "applicationName", title: "Application Name", type: "filterCard"},
  {key: "resources", title: "Resources", type: "searchCard"}, 
  {key: "projectPhase", title: "Project Phase", type: "filterCard"},
  {key: "releaseEvent", title: "Release Event", type: "filterCard"},
];

const resultTableHeaders = [
  {key: "projectName", title: "Project Name"},
  {key: "projectPhase", title: "Project Phase"},
  {key: "projectDetails", title: "Project Details"},
]


const rootElement = document.getElementById("root");
ReactDOM.render(<App data={projectData} filterList={filterList} title={"Existing Projects"} resultTableHeaders={resultTableHeaders}/>, rootElement);
