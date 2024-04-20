import React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import './index.css'
import StudentProfileAdd from "./routes/StudentProfileAdd";
import StudentProfileEdit from "./routes/StudentProfileEdit";
import StudentProfileList from "./routes/StudentProfileList";

import StudentAddressAdd from "./routes/StudentAddressAdd";
import StudentAddressEdit from "./routes/StudentAddressEdit";
import StudentAddressList from "./routes/StudentAddressList";

import StudentFamilyAdd from "./routes/StudentFamilyAdd";
import StudentFamilyEdit from "./routes/StudentFamilyEdit";
import StudentFamilyList from "./routes/StudentFamilyList";

import StudentInstitutionAdd from "./routes/StudentInstitutionAdd";
import StudentInstitutionEdit from "./routes/StudentInstitutionEdit";
import StudentInstitutionList from "./routes/StudentInstitutionList";

import StudentAcademicAdd from "./routes/StudentAcademicAdd";
import StudentAcademicEdit from "./routes/StudentAcademicEdit";
import StudentAcademicList from "./routes/StudentAcademicList";

import StudentReportCardAdd from "./routes/StudentReportCardAdd";
import StudentReportCardEdit from "./routes/StudentReportCardEdit";
import StudentReportCardList from "./routes/StudentReportCardList";
import Dashboard from "./routes/Dashboard";

import StudentSummaryList from "./routes/Reports/StudentSummaryList";
import StudentSummaryDetail from "./routes/Reports/StudentSummaryDetail";


// Master Routes
import VendorAdd from "./routes/Master/VendorAdd";
import VendorEdit from "./routes/Master/VendorEdit";
import VendorList from "./routes/Master/VendorList";

import InstitutionAdd from "./routes/Master/InstitutionAdd";
import InstitutionEdit from "./routes/Master/InstitutionEdit";
import InstitutionList from "./routes/Master/InstitutionList";

import TutorAdd from "./routes/Master/TutorAdd";
import TutorEdit from "./routes/Master/TutorEdit";
import TutorList from "./routes/Master/TutorList";

import BastiAdd from "./routes/Master/BastiAdd";
import BastiEdit from "./routes/Master/BastiEdit";
import BastiList from "./routes/Master/BastiList";

import VoulnteerAdd from "./routes/Master/VoulnteerAdd";
import VoulnteerEdit from "./routes/Master/VoulnteerEdit";
import VoulnteerList from "./routes/Master/VoulnteerList";


import StudentDocsAdd from "./routes/StudentDocsAdd";
import StudentDocsList from "./routes/StudentDocsList";
import StudentDocsEdit from "./routes/StudentDocsEdit";

import ProgressReport from "./routes/Reports/ProgressReport";
import DashBoardSummary from "./routes/Reports/DashBoardSummary";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },

      {
        path: "StudentProfileAdd",
        element: <StudentProfileAdd />,
      },
      {
        path: "StudentProfileEdit",
        element: <StudentProfileEdit />,
      },

      {
        path: "StudentProfileList",
        element: <StudentProfileList />,
      },

      {
        path: "StudentAddressAdd",
        element: <StudentAddressAdd />,
      },
      {
        path: "StudentAddressEdit",
        element: <StudentAddressEdit />,
      },

      {
        path: "StudentAddressList",
        element: <StudentAddressList />,
      },

      {
        path: "StudentInstitutionAdd",
        element: <StudentInstitutionAdd />,
      },
      {
        path: "StudentInstitutionEdit",
        element: <StudentInstitutionEdit />,
      },

      {
        path: "StudentInstitutionList",
        element: <StudentInstitutionList />,
      },
      {
        path: "StudentReportCardAdd",
        element: <StudentReportCardAdd />,
      },
      {
        path: "StudentReportCardEdit",
        element: <StudentReportCardEdit />,
      },

      {
        path: "StudentReportCardList",
        element: <StudentReportCardList />,
      },


      {
        path: "StudentFamilyAdd",
        element: <StudentFamilyAdd />,
      },
      {
        path: "StudentFamilyEdit",
        element: <StudentFamilyEdit />,
      },
      {
        path: "StudentFamilyList",
        element: <StudentFamilyList />,
      },

      {
        path: "StudentAcademicAdd",
        element: <StudentAcademicAdd />,
      },
      {
        path: "StudentAcademicEdit",
        element: <StudentAcademicEdit />,
      },
      {
        path: "StudentAcademicList",
        element: <StudentAcademicList />,
      },

      {
        path: "VendorAdd",
        element: <VendorAdd />,
      },

      {
        path: "VendorEdit",
        element: <VendorEdit />,
      },

      {
        path: "VendorList",
        element: <VendorList />,
      },

      {
        path: "InstitutionAdd",
        element: <InstitutionAdd />,
      },

      {
        path: "InstitutionEdit",
        element: <InstitutionEdit />,
      },

      {
        path: "InstitutionList",
        element: <InstitutionList />,
      },

      {
        path: "TutorAdd",
        element: <TutorAdd />,
      },

      {
        path: "TutorEdit",
        element: <TutorEdit />,
      },

      {
        path: "TutorList",
        element: <TutorList />,
      },
      {
        path: "BastiAdd",
        element: <BastiAdd />,
      },

      {
        path: "BastiEdit",
        element: <BastiEdit />,
      },

      {
        path: "BastiList",
        element: <BastiList />,
      },
      {
        path: "VoulnteerAdd",
        element: <VoulnteerAdd />,
      },

      {
        path: "VoulnteerEdit",
        element: <VoulnteerEdit />,
      },

      {
        path: "VoulnteerList",
        element: <VoulnteerList />,
      },
      {
        path: "StudentDocsAdd",
        element: <StudentDocsAdd />,
      },
      {
        path: "StudentDocsList",
        element: <StudentDocsList />,
      },
      {
        path: "StudentDocsEdit",
        element: <StudentDocsEdit />,
      },

      {
        path: "StudentSummaryList",
        element: <StudentSummaryList />,
      },

      {
        path: "StudentSummaryDetail",
        element: <StudentSummaryDetail />,
      },

      {
        path: "ProgressReport",
        element: <ProgressReport />,
      },
      
      {
        path: "DashBoardSummary",
        element: <DashBoardSummary />,
      },
      

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
