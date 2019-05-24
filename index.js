import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";


function projectPage() {
  const releaseEvents = ["2019-05-12", "2019-05-24", "2019-06-12", "2019-06-24", "2019-07-12", "2019-07-24", "2019-08-12", "2019-08-24", "2019-09-12", "2019-10-12"];
  const resources = ["Arthur, Brian", "Kozarzewska-Brunet, Kinga", "Leung, Fred", "McEnery, Michael", "Stone, Barbara", "Test Guy 1", "Test Guy 2", "Test Guy 3", "Test Guy 4", "Test Guy 5", "Test Guy 6" , "Test Guy 7", "Test Guy 8", "Test Guy 9", "Test Guy 10", "Test Guy 11", "Test Guy 12"];

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

  const pageTitle = "Existing Projects";

  const rootElement = document.getElementById("root");
  ReactDOM.render(<App data={projectData} filterList={filterList} title={pageTitle} resultTableHeaders={resultTableHeaders}/>, rootElement);
}

function envPage() {
  const release = ["Bell.ca R110.0", "Bell.ca R111.0", "Bell.ca R111.3", "Bell.ca R111.8", "Bell.ca R112.0", "Bell.ca R115.0"];
  const allocationState = ["Allocated", "Not available for allocation", "Available for allocation"];

  const projectData = [];
  for (let x = 0; x < 180; x ++) {
    projectData.push({"envName": "Env "+x, "envType": "Env Type "+(x%8), "applicationName": "App "+(x%13), "state": allocationState[x%(allocationState.length)], "release": release[x%(release.length)], "projects": "Project "+(x%9), "applicationDetails": "Application Details", "configurationDetails": "Configuration Details"});
  }

  const filterList = [
    {key: "envType", title: "Environment Type", type: "filterCard"},
    {key: "applicationName", title: "Application Name", type: "filterCard"},
    {key: "state", title: "Allocation State", type: "filterCard"},
    {key: "release", title: "Release", type: "filterCard"},
    {key: "projects", title: "Projects", type: "filterCard"},
  ];

  const resultTableHeaders = [
    {key: "envName", title: "Environment Name"},
    {key: "envType", title: "Environment Type"},
    {key: "applicationDetails", title: "Application Details"},
    {key: "configurationDetails", title: "Configuration Details"},
  ]

  const pageTitle = "Existing Environments";

  const rootElement = document.getElementById("root");
  ReactDOM.render(<App data={projectData} filterList={filterList} title={pageTitle} resultTableHeaders={resultTableHeaders}/>, rootElement);
}

//envPage();
projectPage();
