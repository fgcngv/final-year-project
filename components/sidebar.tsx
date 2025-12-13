// import { getRole } from "@/utils/role";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";

// const sidebarLinks = [
//   {
//     label: "MENU",
//     key: "dashboard",
//     links: [
//       {
//         name: "Dashboard",
//         link: `/admin`,
//         key2: "dashboard",
//       },
//     ],
//   },
//   {
//     label: "MANAGE",
//     key: "manage",
//     links: [
//       {
//         name: "Users",
//         link: "/admin/users",
//         key2: "users",
//         icon: "Users",
//       },
//       {
//         name: "Farmers",
//         link: "/admin/farmers",
//         key2: "farmers",
//         icon: "User",
//       },
//       {
//         name: "Staffs",
//         link: "/admin/staffs",
//         key2: "staffs",
//         icon: "User",
//       },
//       {
//         name: "Products",
//         link: "/admin/product",
//         key2: "Products",
//         icon: "Users",
//       },
//     ],
//   },
// ];

// const {userId} = await auth();


// const farmerSideBarLinks = [
//   {
//     label: "MENU",
//     key: "dashboard",
//     links: [
//       {
//         name: "Dashboard",
//         link: `/farmer`,
//         key2: "dashboard",
//       },
//     ],
//   },
//   {
//     label: "MANAGE",
//     key: "manage",
//     links: [
//       {
//         name: "Orders",
//         link: `/order/${userId}`,
//         key2: "orders",
//         icon: "Users",
//       },
//       {
//         name: "Cart",
//         link: `/cart/${userId}`,
//         key2: "farmers",
//         icon: "User",
//       },
//       {
//         name: "Staffs",
//         link: "/admin/staffs",
//         key2: "staffs",
//         icon: "User",
//       },
//       {
//         name: "Products",
//         link: "/admin/product",
//         key2: "Products",
//         icon: "Users",
//       },
//     ],
//   },
// ]

// async function Sidebar() {
//   const role = await getRole();
//   console.log("id is :",userId)

//   return (
//     <div className="px-2 fixed">
//       <div className="border text-center cursor-pointer bg-green-800 rounded font-bold text-2xl text-green-300 mb-4 md:p-3 w-full">
//         Green Coffee
//       </div>
//       {sidebarLinks.map((links) => (
//         <div key={links.key}>
//           <h1 className="font-bold" key={links.key}>
//             {links.label}
//           </h1>
//           <div className="flex flex-col pl-3 gap-2">
//             {links.links.map((link) => (
//               <Link
//                 key={link.key2}
//                 href={link.link}
//                 className="bg-gray-300 rounded flex justify-center items-center hover:bg-gray-500 font-bold "
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
          
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Sidebar;





















import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const sidebarLinks = [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      {
        name: "Dashboard",
        link: "/admin",
        key2: "dashboard",
      },
    ],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      { name: "Users", link: "/admin/users", key2: "users" },
      { name: "Farmers", link: "/admin/farmers", key2: "farmers" },
      { name: "Staffs", link: "/admin/staffs", key2: "staffs" },
      { name: "Products", link: "/admin/product", key2: "products" },
    ],
  },
];

const farmerSideBarLinks = (userId: string) => [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      {
        name: "Dashboard",
        link: "/farmer",
        key2: "dashboard",
      },
    ],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      {
        name: "Orders",
        link: `farmer/orders/${userId}`,
        key2: "orders",
      },
      {
        name: "Cart",
        link: `/cart/${userId}`,
        key2: "cart",
      },
    ],
  },
];

async function Sidebar() {
  const { userId } = await auth();
  const role = await getRole();

  // Choose links based on role
  const linksToRender =
    role === "farmer" && userId
      ? farmerSideBarLinks(userId)
      : sidebarLinks;

  return (
    <div className="px-2 fixed">
      <div className="border text-center cursor-pointer bg-green-800 rounded font-bold text-2xl text-green-300 mb-4 md:p-3 w-full">
        Green Coffee
      </div>

      {linksToRender.map((section) => (
        <div key={section.key}>
          <h1 className="font-bold">{section.label}</h1>
          <div className="flex flex-col pl-3 gap-2">
            {section.links.map((link) => (
              <Link
                key={link.key2}
                href={link.link}
                className="bg-gray-300 rounded flex justify-center items-center hover:bg-gray-500 font-bold"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
