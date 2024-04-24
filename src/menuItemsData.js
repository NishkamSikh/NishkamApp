export const menuItemsData = [
  {
    title: "Home",
    url: "/",
    
  },
  // {
  //   title: "Dashboard",
  //   url: "Dashboard",
  // },

  
  

  {
    title: "Student Data",
    url: "/",
    submenu: [
      {
        title: "Profile data",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "StudentProfileAdd_v2",
          },
          {
            title: "Add-Old",
            url: "StudentProfileAdd",
          },
          {
            title: "View/Edit",
            url: "StudentProfileList",
          },
        ]
      },
      {
        title: "Address data",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "StudentAddressAdd",
          },
          {
            title: "View/Edit",
            url: "StudentAddressList",
          },
        ]

      },
      {
        title: "Family data",
        url: "",

        submenu: [
          {
            title: "Add",
            url: "StudentFamilyAdd",
          },
          {
            title: "View/Edit",
            url: "StudentFamilyList",
          },
        ]
      },


      {
        title: "Institution data",
        url: "",

        submenu: [
          {
            title: "Add",
            url: "StudentInstitutionAdd",
          },
          {
            title: "View/Edit",
            url: "StudentInstitutionList",
          },
        ]


      },
      {
        title: "Academic data",
        url: "",

        submenu: [
          {
            title: "Add",
            url: "StudentAcademicAdd",
          },
          {
            title: "View/Edit",
            url: "StudentAcademicList",
          },
        ]
      },




      {
        title: "Report Card",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "StudentReportCardAdd",
          },
          {
            title: "View/Edit",
            url: "StudentReportCardList",
          },
        ]

      },

      {
        title: "Documents",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "StudentDocsAdd",
          },
          {
            title: "View/Edit",
            url: "StudentDocsList",
          },
        ]

      }

    ]
  },

  {
    title: "Master Data",
    url: "/",
    submenu: [
      {
        title: "Institution",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "InstitutionAdd",
          },
          {
            title: "View/Edit",
            url: "InstitutionList",
          },
        ]


      },
      {
        title: "Tutor",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "TutorAdd",
          },
          {
            title: "View/Edit",
            url: "TutorList",
          },

        ]
      },
      {
        title: "Volunteer",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "VoulnteerAdd",
          },
          {
            title: "View/Edit",
            url: "VoulnteerList",
          },
        ]
      },
      {
        title: "Basti",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "BastiAdd",
          },
          {
            title: "View/Edit",
            url: "BastiList",
          },
        ]
      },
      {
        title: "Vendor",
        url: "",
        submenu: [
          {
            title: "Add",
            url: "VendorAdd",
          },
          {
            title: "View/Edit",
            url: "VendorList",
          },
        ]

      }
    ]
  },

  {
    title: "Reports",
    url: "/",

    submenu: [
      {
        title: "Student Summary",
        url: "StudentSummaryList",
      },
/*       {
        title: "Dashboard Summary",
        url: "DashboardSummary",
      }, */

      {
        title: "Progress Report",
        url: "ProgressReport",
      },
    ]
  },

/*   {
    title: "Reports",
    url: "/",

    submenu: [
      {
        title: "Lists",
        url: "",
        submenu: [
          {
            title: "Student Summary",
            url: "StudentSummaryList",
          },
        ]
      },
    ]
  }, */


];

