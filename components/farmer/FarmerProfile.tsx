

// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   MessageCircle,
//   MapPin,
//   Globe,
//   Calendar,
//   Coffee,
//   Edit,
//   Edit2,
//   Eye,
//   EyeOff,
//   AlertTriangle,
// } from "lucide-react";
// import LoaderBtn from "../loaderBtn";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { cn } from "@/lib/utils";

// // 🔹 Define props type (adjust if you create proper TypeScript types)
// type FarmerProfileProps = {
//   farmer: any;
//   isOwnPage?: boolean;
//   status?:string
// };

// export default function FarmerProfile({
//   farmer,
//   isOwnPage = true,
//   status,
// }: FarmerProfileProps) {
//   const userInfo = useUser();

//   if (!farmer) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Farmer not found.</p>
//       </div>
//     );
//   }

//   const [displayCoffee, setDisplayCoffee] = useState(false);
//   const router = useRouter();
//   return (
//     <div className="mt-12 min-h-screen bg-background text-foreground px-4 md:px-10 py-8 transition-colors">
//       {/* ================= HEADER SECTION ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="grid md:grid-cols-3 gap-6"
//       >
// <Card
//   className={cn(
//     "relative md:col-span-2 rounded-2xl shadow-lg border bg-card overflow-hidden transition",
//     status === "INACTIVE" && "border-red-500",
//     status === "DORMANT" && "border-yellow-500",
//     status === "PAUSED" && "border-blue-500"
//   )}
// >
//   {/* STATUS BANNER */}
//   {(status === "INACTIVE" ||
//     status === "DORMANT" ||
//     status === "PAUSED") && (
//     <div
//       className={cn(
//         "absolute top-0 left-0 w-full px-4 py-3 flex items-center gap-2 text-white z-10 backdrop-blur-md",
//         status === "INACTIVE" && "bg-red-600/90",
//         status === "DORMANT" && "bg-yellow-500/90",
//         status === "PAUSED" && "bg-blue-600/90"
//       )}
//     >
//       <AlertTriangle size={18} />
//       <span className="font-semibold text-sm md:text-base">
//         {status === "INACTIVE" &&
//           "Account is inactive — actions are disabled"}
//         {status === "DORMANT" &&
//           "Warning: Account under review. Please contact admin"}
//         {status === "PAUSED" &&
//           "Account is paused — temporarily unavailable"}
//       </span>
//     </div>
//   )}

//   <CardContent className="p-6 flex flex-col md:flex-row gap-6 pt-16 md:pt-10">

//     {/*  IMAGE + STATUS DOT */}
//     <div className="relative">
//       <img
//         src={isOwnPage ? userInfo.user?.imageUrl : farmer.image}
//         alt={farmer.first_name}
//         className="w-40 h-40 object-cover rounded-2xl border shadow-sm"
//       />

//       {/* STATUS DOT */}
//       <span
//         className={cn(
//           "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white",
//           status === "INACTIVE" && "bg-red-500",
//           status === "DORMANT" && "bg-yellow-400",
//           status === "PAUSED" && "bg-blue-500",
//           status === "ACTIVE" && "bg-green-500"
//         )}
//       />
//     </div>

//     {/*  CONTENT */}
//     <div className="flex-1 space-y-3">

//       {/* NAME + BADGE */}
//       <div className="flex items-center gap-3 flex-wrap">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {farmer.first_name} {farmer.last_name}
//         </h1>

//         <Badge
//           className={cn(
//             "font-semibold px-3 py-1 rounded-full",
//             status === "INACTIVE" && "bg-red-600 text-white",
//             status === "DORMANT" && "bg-yellow-500 text-black",
//             status === "PAUSED" && "bg-blue-600 text-white",
//             status === "ACTIVE" && "bg-green-600 text-white"
//           )}
//         >
//           {status}
//         </Badge>
//       </div>

//       {/* FARM NAME */}
//       {farmer.farmName && (
//         <p className="text-lg text-muted-foreground font-medium">
//           {farmer.farmName}
//         </p>
//       )}

//       {/* META INFO */}
//       <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//         {farmer.address && (
//           <div className="flex items-center gap-1">
//             <MapPin size={16} /> {farmer.address}
//           </div>
//         )}
//         {farmer.language && (
//           <div className="flex items-center gap-1">
//             <Globe size={16} /> {farmer.language}
//           </div>
//         )}
//         {farmer.createdAt && (
//           <div className="flex items-center gap-1">
//             <Calendar size={16} />
//             Member since {new Date(farmer.createdAt).getFullYear()}
//           </div>
//         )}
//       </div>

//       {/* EMAIL */}
//       <Link
//         className="text-emerald-600 font-semibold hover:underline"
//         href={`mailto:${farmer.email}`}
//       >
//         {farmer.email}
//       </Link>

//       {/*  STATUS INFO CARDS */}
//       {status === "INACTIVE" && (
//         <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-700 dark:text-red-300 text-sm">
//           🚫 This account is inactive. Messaging and transactions are disabled.
//         </div>
//       )}

//       {status === "DORMANT" && (
//         <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 text-yellow-800 text-sm">
//           ⚠️ This account is under warning. Activity may be restricted.
//         </div>
//       )}

//       {farmer.status === "PAUSED" && (
//         <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 text-blue-700 dark:text-blue-300 text-sm">
//           ⏸️ This account is temporarily paused. The Acount may return soon.
//         </div>
//       )}

//       {/* BIO */}
//       {farmer.bio && (
//         <p className="text-muted-foreground pt-2 leading-relaxed">
//           {farmer.bio}
//         </p>
//       )}

//       {/* ACTIONS */}
//       {isOwnPage ? (
//         <Button className="mt-4 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600">
//           <Edit size={18} /> Edit Profile
//         </Button>
//       ) : userInfo.user?.id === farmer.id ? (
//         <h1 className="bg-green-600 text-xl font-bold text-center rounded-2xl text-white p-2">
//           This is your own profile
//         </h1>
//       ) : (
//         <Button
//           disabled={
//             status === "INACTIVE" || status === "PAUSED"
//           }
//           className={cn(
//             "mt-4 rounded-xl flex gap-2 transition",
//             status === "INACTIVE" || status === "PAUSED"
//               ? "bg-gray-400 cursor-not-allowed opacity-70"
//               : "bg-emerald-700 hover:bg-emerald-600"
//           )}
//           onClick={() => router.push(`/chatMatche/${farmer.id}`)}
//         >
//           <MessageCircle size={18} />
//           {status === "INACTIVE" && "Unavailable"}
//           {status === "PAUSED" && "Temporarily Unavailable"}
//           {status !== "INACTIVE" &&
//             status !== "PAUSED" &&
//             "Message Farmer"}
//         </Button>
//       )}
//     </div>
//   </CardContent>
// </Card>
//         {/* ================= STATS CARD ================= */}
//         {farmer.stats && (
//           <Card className="rounded-2xl shadow-md border border-border bg-card">
//             <CardContent className="p-6 space-y-6">
//               <h2 className="text-xl font-semibold">Farm Stats</h2>

//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Total Products
//                   </p>
//                   <p className="text-2xl font-bold">
//                     {farmer.stats.totalProducts}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Total Sold (kg)
//                   </p>
//                   <p className="text-2xl font-bold">{farmer.stats.totalSold}</p>
//                 </div>

//                 {(isOwnPage || userInfo.user?.id === farmer.id) && (
//                   <div>
//                     <p className="text-sm text-muted-foreground">Revenue</p>
//                     <p className="text-2xl font-bold">
//                       ${farmer.stats.totalRevenue}
//                     </p>
//                   </div>
//                 )}

//                 {farmer.experience && (
//                   <div>
//                     <p className="text-sm text-muted-foreground">Experience</p>
//                     <p className="text-2xl font-bold">
//                       {farmer.experience} yrs
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </motion.div>

//       {/* ================= TOGGLE PRODUCTS ================= */}
// {
//   (status !== "INACTIVE" && status !== "PAUSED") && (
//     <Button
//     onClick={() => setDisplayCoffee(!displayCoffee)}
//     className="mt-6 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
//   >
//     {displayCoffee ? (
//       <>
//         <EyeOff size={18} />
//         Hide Products
//       </>
//     ) : (
//       <>
//         <Eye size={18} />
//         Display Products
//       </>
//     )}
//   </Button>
//   )
// }

//       {/* ================= PRODUCTS SECTION ================= */}
//       {farmer.products && farmer.products.length > 0 && displayCoffee && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Available Coffees</h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {farmer.products.map((product: any) => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Card className="rounded-2xl shadow-md overflow-hidden border border-border bg-card">
//                   <Link href={`/product/${product.id}`}>
//                     <div className="relative group">
//                       <img
//                         src={product.image}
//                         alt={product.product_name}
//                         className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     </div>
//                   </Link>

//                   <CardContent className="p-5 space-y-2">
//                     <h3 className="text-lg font-semibold">
//                       {product.product_name}
//                     </h3>

//                     <p className="text-emerald-600 dark:text-emerald-400 font-medium">
//                       ${product.price}
//                     </p>

//                     <p className="text-sm text-muted-foreground">
//                       Stock: {product.stock}
//                     </p>

//                     {product.description && (
//                       <div className="text-sm text-muted-foreground space-y-1 pt-2">
//                         {product.description.origion && (
//                           <div>Origin: {product.description.origion}</div>
//                         )}
//                         {product.description.roastLevel && (
//                           <div>Roast: {product.description.roastLevel}</div>
//                         )}
//                         {product.description.flavorNotes && (
//                           <div>Flavor: {product.description.flavorNotes}</div>
//                         )}
//                       </div>
//                     )}

//                     {isOwnPage ? (
//                       <LoaderBtn
//                         btnName="Edit"
//                         className="mt-4 w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
//                       />
//                     ) : (
//                       <LoaderBtn
//                         btnName="View Details"
//                         linkTo={`/product/${product.id}`}
//                         className="mt-4 w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
//                       />
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }














"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  MapPin,
  Globe,
  Calendar,
  Coffee,
  Edit,
  Edit2,
  Eye,
  EyeOff,
  AlertTriangle,
  Ban,
  Pause,
} from "lucide-react";
import LoaderBtn from "../loaderBtn";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

// 🔹 Define props type (adjust if you create proper TypeScript types)
type FarmerProfileProps = {
  farmer: any;
  isOwnPage?: boolean;
  status?:string
};

export default function FarmerProfile({
  farmer,
  isOwnPage = true,
  status,
}: FarmerProfileProps) {
  const userInfo = useUser();

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Farmer not found.</p>
      </div>
    );
  }

  const [displayCoffee, setDisplayCoffee] = useState(false);
  const router = useRouter();
  return (
    <div className="mt-12 min-h-screen bg-background text-foreground px-4 md:px-10 py-8 transition-colors">
      {/* ================= HEADER SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
<Card
  className={cn(
    "relative md:col-span-2 rounded-2xl shadow-lg border bg-card overflow-hidden transition",
    farmer.status === "INACTIVE" && "border-red-500",
    farmer.status === "DORMANT" && "border-yellow-500",
    farmer.status === "PAUSED" && "border-blue-500"
  )}
>
  {/* STATUS BANNER */}
  {(farmer.status === "INACTIVE" ||
    farmer.status === "DORMANT" ||
    farmer.status === "PAUSED") && (
    <div
      className={cn(
        "absolute top-0 left-0 w-full px-4 py-3 flex items-center gap-2 text-white z-10 backdrop-blur-md",
        farmer.status === "INACTIVE" && "bg-red-600/90",
        farmer.status === "DORMANT" && "bg-yellow-500/90",
        farmer.status === "PAUSED" && "bg-blue-600/90"
      )}
    >
      <AlertTriangle size={18} />
      <span className="font-semibold text-sm md:text-base">
        {farmer.status === "INACTIVE" &&
          "Account is inactive — actions are disabled"}
        {farmer.status === "DORMANT" &&
          "Warning: Account under review. Please contact admin"}
        {farmer.status === "PAUSED" &&
          "Account is paused — temporarily unavailable"}
      </span>
    </div>
  )}

  <CardContent className="p-6 flex flex-col md:flex-row gap-6 pt-16 md:pt-10">

    {/*  IMAGE + STATUS DOT */}
    <div className="relative">
      <img
        src={(isOwnPage || userInfo.user?.id === farmer.id) ? userInfo.user?.imageUrl : farmer.image}
        alt={farmer.first_name}
        className="w-40 h-40 object-cover rounded-2xl border shadow-sm"
      />

      {/* STATUS DOT */}
      <span
        className={cn(
          "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white",
          farmer.status === "INACTIVE" && "bg-red-500",
          farmer.status === "DORMANT" && "bg-yellow-400",
          farmer.status === "PAUSED" && "bg-blue-500",
          farmer.status === "ACTIVE" && "bg-green-500"
        )}
      />
    </div>

    {/*  CONTENT */}
    <div className="flex-1 space-y-3">

      {/* NAME + BADGE */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold">
          {farmer.first_name} {farmer.last_name}
        </h1>

        <Badge
          className={cn(
            "font-semibold px-3 py-1 rounded-full",
            farmer.status === "INACTIVE" && "bg-red-600 text-white",
            farmer.status === "DORMANT" && "bg-yellow-500 text-black",
            farmer.status === "PAUSED" && "bg-blue-600 text-white",
            farmer.status === "ACTIVE" && "bg-green-600 text-white"
          )}
        >
          {status}
        </Badge>
      </div>

      {/* FARM NAME */}
      {farmer.farmName && (
        <p className="text-lg text-muted-foreground font-medium">
          {farmer.farmName}
        </p>
      )}

      {/* META INFO */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {farmer.address && (
          <div className="flex items-center gap-1">
            <MapPin size={16} /> {farmer.address}
          </div>
        )}
        {farmer.language && (
          <div className="flex items-center gap-1">
            <Globe size={16} /> {farmer.language}
          </div>
        )}
        {farmer.createdAt && (
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            Member since {new Date(farmer.createdAt).getFullYear()}
          </div>
        )}
      </div>

      {/* EMAIL */}
      <Link
        className="text-emerald-600 font-semibold hover:underline"
        href={`mailto:${farmer.email}`}
      >
        {farmer.email}
      </Link>

      {/*  STATUS INFO CARDS */}
      {farmer.status === "INACTIVE" && (
        <div className="p-4 rounded-xl flex gap-1 items-center  bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-700 dark:text-red-300 text-sm">
          <Ban /> This account is inactive. Messaging and transactions are disabled.
        </div>
      )}

      {farmer.status === "DORMANT" && (
        <div className="p-4 rounded-xl flex gap-1 items-center  bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 text-yellow-800 text-sm">
         <AlertTriangle className="font-bold"/> This account is under warning. Activity may be restricted.
        </div>
      )}

      {farmer.status === "PAUSED" && (
        <div className="p-4 rounded-xl flex gap-1 items-center  bg-blue-50 dark:bg-blue-900/30 border border-blue-200 text-blue-700 dark:text-blue-300 text-sm">
          <Pause />  This account is temporarily paused. The Acount may return soon.
        </div>
      )}

      {/* BIO */}
      {farmer.bio && (
        <p className="text-muted-foreground pt-2 leading-relaxed">
          {farmer.bio}
        </p>
      )}

      {/* ACTIONS */}
      {isOwnPage ? (
        <Button className="mt-4 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600">
          <Edit size={18} /> Edit Profile
        </Button>
      ) : userInfo.user?.id === farmer.id ? (
        <h1 className="bg-green-600 text-xl font-bold text-center rounded-2xl text-white p-2">
          This is your own profile
        </h1>
      ) : (
        <Button
          disabled={
            farmer.status === "INACTIVE" || farmer.status === "PAUSED"
          }
          className={cn(
            "mt-4 rounded-xl flex gap-2 transition",
            farmer.status === "INACTIVE" || farmer.status === "PAUSED"
              ? "bg-gray-400 cursor-not-allowed opacity-70"
              : "bg-emerald-700 hover:bg-emerald-600"
          )}
          onClick={() => router.push(`/chatMatche/${farmer.id}`)}
        >
          <MessageCircle size={18} />
          {farmer.status === "INACTIVE" && "Unavailable"}
          {farmer.status === "PAUSED" && "Temporarily Unavailable"}
          {farmer.status !== "INACTIVE" &&
            farmer.status !== "PAUSED" &&
            "Message Farmer"}
        </Button>
      )}
    </div>
  </CardContent>
</Card>
        {/* ================= STATS CARD ================= */}
        {farmer.stats && (
          <Card className="rounded-2xl shadow-md border border-border bg-card">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Farm Stats</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold">
                    {farmer.stats.totalProducts}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Sold (kg)
                  </p>
                  <p className="text-2xl font-bold">{farmer.stats.totalSold}</p>
                </div>

                {(isOwnPage || userInfo.user?.id === farmer.id) && (
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">
                      ${farmer.stats.totalRevenue}
                    </p>
                  </div>
                )}

                {farmer.experience && (
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-2xl font-bold">
                      {farmer.experience} yrs
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* ================= TOGGLE PRODUCTS ================= */}
{
  (farmer.status !== "INACTIVE" && farmer.status !== "PAUSED") && (
    <Button
    onClick={() => setDisplayCoffee(!displayCoffee)}
    className="mt-6 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
  >
    {displayCoffee ? (
      <>
        <EyeOff size={18} />
        Hide Products
      </>
    ) : (
      <>
        <Eye size={18} />
        Display Products
      </>
    )}
  </Button>
  )
}

      {/* ================= PRODUCTS SECTION ================= */}
      {farmer.products && farmer.products.length > 0 && displayCoffee && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Available Coffees</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmer.products.map((product: any) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="rounded-2xl shadow-md overflow-hidden border border-border bg-card">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative group">
                      <img
                        src={product.image}
                        alt={product.product_name}
                        className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <CardContent className="p-5 space-y-2">
                    <h3 className="text-lg font-semibold">
                      {product.product_name}
                    </h3>

                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ${product.price}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </p>

                    {product.description && (
                      <div className="text-sm text-muted-foreground space-y-1 pt-2">
                        {product.description.origion && (
                          <div>Origin: {product.description.origion}</div>
                        )}
                        {product.description.roastLevel && (
                          <div>Roast: {product.description.roastLevel}</div>
                        )}
                        {product.description.flavorNotes && (
                          <div>Flavor: {product.description.flavorNotes}</div>
                        )}
                      </div>
                    )}

                    {isOwnPage ? (
                      <LoaderBtn
                        btnName="Edit"
                        className="mt-4 w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                      />
                    ) : (
                      <LoaderBtn
                        btnName="View Details"
                        linkTo={`/product/${product.id}`}
                        className="mt-4 w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
