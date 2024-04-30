export const menuItemsData = [
/*   {
    title: "Home",
    url: "/",

  }, */
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
      {
        title: "Dashboard Summary",
        url: "DashboardSummary",
      },

      {
        title: "List Sponsored Child",
        url: 'BeneficiaryList_Sponsored',
      },
      {
        title: "List Unsponsored Child",
        url: 'BeneficiaryList_UnSponsored',
      },
      {
        title: "Progress Report",
        url: "ProgressReport",
      },
    ]
  },

  {
    title: "Accounts",
    url: "/",

    submenu: [
      {
        title: "Sponsors",
        url: "",
        submenu: [
//           {
//             title: "Sponsor",
//             url: "",
// /*             submenu: [
//               {
//                 title: "Add",
//                 url: 'SponsorAdd',
//               },
//               {
//                 title: "View/Edit",
//                 url: 'SponsorList',
//               }
//             ] */
//           },

          {
            title: "Sponsor---Beneficiary",
            url: "",
            submenu: [
              {
                title: "Add",
                url: 'SponsorBeneficiaryAdd',
              },
              {
                title: "View/Edit",
                url: 'SponsorBeneficiaryList',
              }


            ]
          },
        ]
      },


      {
        title: "Family Unit",
        url: "",

        submenu: [
          {
            title: "Add",
            url: 'FamilyUnitAdd',
          },
          {
            title: "View/Edit",
            url: 'FamilyUnitList',

          },
        ]
      },
      {
        title: "Payments",
        url: "",
        submenu: [
          {
            title: "Vendor",
            url: "",
            submenu: [
              {
                title: "Add",
                url: 'PaymentVendorAdd',
              },
              {
                title: "View/Edit",
                url: 'PaymentVendorList',
              }
            ]
          },

          {
            title: "Institution",
            url: "",
            submenu: [
              {
                title: "Add",
                url: 'PaymentInstitutionAdd',
              },
              {
                title: "View/Edit",
                url: 'PaymentInstitutionList',
              }
            ]
          },

          {
            title: "Other",
            url: "",
            submenu: [
              {
                title: "Add",
                url: 'PaymentOtherAdd',
              },
              {
                title: "View/Edit",
                url: 'PaymentOtherList',
              }
            ]
          },
        ]
      },


    ]
  },


];

