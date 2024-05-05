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
import StudentProfileAdd from "./routes/StudentData/StudentProfileAdd";
import StudentProfileEdit from "./routes/StudentData/StudentProfileEdit";
import StudentProfileList from "./routes/StudentData/StudentProfileList";

import StudentAddressAdd from "./routes/StudentData/StudentAddressAdd";
import StudentAddressEdit from "./routes/StudentData/StudentAddressEdit";
import StudentAddressList from "./routes/StudentData/StudentAddressList";

import StudentFamilyAdd from "./routes/StudentData/StudentFamilyAdd";
import StudentFamilyEdit from "./routes/StudentData/StudentFamilyEdit";
import StudentFamilyList from "./routes/StudentData/StudentFamilyList";

import StudentInstitutionAdd from "./routes/StudentData/StudentInstitutionAdd";
import StudentInstitutionEdit from "./routes/StudentData/StudentInstitutionEdit";
import StudentInstitutionList from "./routes/StudentData/StudentInstitutionList";

import StudentAcademicAdd from "./routes/StudentData/StudentAcademicAdd";
import StudentAcademicEdit from "./routes/StudentData/StudentAcademicEdit";
import StudentAcademicList from "./routes/StudentData/StudentAcademicList";

import StudentReportCardAdd from "./routes/StudentData/StudentReportCardAdd";
import StudentReportCardEdit from "./routes/StudentData/StudentReportCardEdit";
import StudentReportCardList from "./routes/StudentData/StudentReportCardList";
import Dashboard from "./routes/Dashboard";

import StudentSummaryList from "./routes/Reports/StudentSummaryList";
import StudentSummaryDetail from "./routes/Reports/StudentSummaryDetail";


import AreaSummary_State from "./routes/Reports/AreaSummary_State";
import AreaSummary_District from "./routes/Reports/AreaSummary_District";
import AreaSummary_Basti from "./routes/Reports/AreaSummary_Basti";


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


import StudentDocsAdd from "./routes/StudentData/StudentDocsAdd";
import StudentDocsList from "./routes/StudentData/StudentDocsList";
import StudentDocsEdit from "./routes/StudentData/StudentDocsEdit";

import ProgressReport from "./routes/Reports/ProgressReport";
import DashBoardSummary from "./routes/Reports/DashBoardSummary";

import FamilyUnitAdd from "./routes/Account/FamilyUnit/FamilyUnitAdd";
import FamilyUnitEdit from "./routes/Account/FamilyUnit/FamilyUnitEdit";
import FamilyUnitList from "./routes/Account/FamilyUnit/FamilyUnitList";

import SponsorAdd from "./routes/Account/Sponsor/SponsorAdd";
import SponsorEdit from "./routes/Account/Sponsor/SponsorEdit";
import SponsorList from "./routes/Account/Sponsor/SponsorList";

import SponsorBeneficiaryAdd from "./routes/Account/SponsorBeneficiary/SponsorBeneficiaryAdd";
import SponsorBeneficiaryEdit from "./routes/Account/SponsorBeneficiary/SponsorBeneficiaryEdit";
import SponsorBeneficiaryList from "./routes/Account/SponsorBeneficiary/SponsorBeneficiaryList";
import BeneficiaryList_UnSponsored from "./routes/Reports/BeneficiaryList_UnSponsored";
import BeneficiaryList_Sponsored from "./routes/Reports/BeneficiaryList_Sponsored";


import PaymentVendorAdd from "./routes/Account/Payment/Vendor/PaymentVendorAdd";
import PaymentVendorEdit from "./routes/Account/Payment/Vendor/PaymentVendorEdit";
import PaymentVendorList from "./routes/Account/Payment/Vendor/PaymentVendorList";


import PaymentInstitutionAdd from "./routes/Account/Payment/Institution/PaymentInstitutionAdd";
import PaymentInstitutionEdit from "./routes/Account/Payment/Institution/PaymentInstitutionEdit";
import PaymentInstitutionList from "./routes/Account/Payment/Institution/PaymentInstitutionList";

import PaymentOtherAdd from "./routes/Account/Payment/Other/PaymentOtherAdd";
import PaymentOtherEdit from "./routes/Account/Payment/Other/PaymentOtherEdit";
import PaymentOtherList from "./routes/Account/Payment/Other/PaymentOtherList";




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
        path: "FamilyUnitAdd",
        element: <FamilyUnitAdd />,
      },
      {
        path: "FamilyUnitEdit",
        element: <FamilyUnitEdit />,
      },
      {
        path: "FamilyUnitList",
        element: <FamilyUnitList />,
      },      

      {
        path: "SponsorAdd",
        element: <SponsorAdd />,
      },
      {
        path: "SponsorEdit",
        element: <SponsorEdit />,
      },
      {
        path: "SponsorList",
        element: <SponsorList />,
      },      

      {
        path: "SponsorBeneficiaryAdd",
        element: <SponsorBeneficiaryAdd />,
      },
      {
        path: "SponsorBeneficiaryEdit",
        element: <SponsorBeneficiaryEdit />,
      },
      {
        path: "SponsorBeneficiaryList",
        element: <SponsorBeneficiaryList />,
      }, 

      {
        path: "BeneficiaryList_Sponsored",
        element: <BeneficiaryList_Sponsored />,
      }, 

      {
        path: "BeneficiaryList_UnSponsored",
        element: <BeneficiaryList_UnSponsored />,
      }, 

      {
        path: "PaymentVendorAdd",
        element: <PaymentVendorAdd />,
      },
      {
        path: "PaymentVendorEdit",
        element: <PaymentVendorEdit />,
      },
      {
        path: "PaymentVendorList",
        element: <PaymentVendorList/>,
      }, 

      {
        path: "PaymentInstitutionAdd",
        element: <PaymentInstitutionAdd />,
      },
      {
        path: "PaymentInstitutionEdit",
        element: <PaymentInstitutionEdit />,
      },
      {
        path: "PaymentInstitutionList",
        element: <PaymentInstitutionList/>,
      }, 


      {
        path: "PaymentOtherAdd",
        element: <PaymentOtherAdd />,
      },
      {
        path: "PaymentOtherEdit",
        element: <PaymentOtherEdit />,
      },
      {
        path: "PaymentOtherList",
        element: <PaymentOtherList/>,
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
      
      {
        path: "AreaSummary_State",
        element: <AreaSummary_State />,
      },

      {
        path: "AreaSummary_District",
        element: <AreaSummary_District />,
      },

      {
        path: "AreaSummary_Basti",
        element: <AreaSummary_Basti />,
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
