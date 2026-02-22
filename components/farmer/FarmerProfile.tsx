

// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MessageCircle, MapPin, Globe, Calendar, Coffee } from "lucide-react";

// export default function FarmerProfile() {
//   // 🔹 Replace with real data from backend
//   const farmer = {
//     first_name: "Abebe",
//     last_name: "Bekele",
//     farmName: "Highland Aroma Farm",
//     image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
//     address: "Yirgacheffe, Ethiopia",
//     language: "English",
//     status: "ACTIVE",
//     createdAt: "2023",
//     bio: "We grow premium Arabica coffee at 2,100m altitude using sustainable and traditional Ethiopian farming methods.",
//     experience: 12,
//     stats: {
//       totalProducts: 8,
//       totalSold: 1240,
//       totalRevenue: 18500,
//     },
//     products: [
//       {
//         id: 1,
//         name: "Yirgacheffe Grade 1",
//         price: 14.5,
//         stock: 32,
//         origin: "Yirgacheffe",
//         roast: "Medium",
//         flavor: "Floral, Citrus",
//         image:
//           "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
//       },
//       {
//         id: 2,
//         name: "Sidama Natural",
//         price: 13.0,
//         stock: 18,
//         origin: "Sidama",
//         roast: "Light",
//         flavor: "Berry, Sweet",
//         image:
//           "https://images.unsplash.com/photo-1511920170033-f8396924c348",
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="grid md:grid-cols-3 gap-6"
//       >
//         <Card className="md:col-span-2 rounded-2xl shadow-md">
//           <CardContent className="p-6 flex flex-col md:flex-row gap-6">
//             <img
//               src={farmer.image}
//               alt="farmer"
//               className="w-full md:w-40 h-40 object-cover rounded-2xl"
//             />

//             <div className="flex-1 space-y-3">
//               <h1 className="text-2xl md:text-3xl font-bold">
//                 {farmer.first_name} {farmer.last_name}
//               </h1>
//               <p className="text-lg text-gray-600 font-medium">
//                 {farmer.farmName}
//               </p>

//               <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                 <div className="flex items-center gap-1">
//                   <MapPin size={16} /> {farmer.address}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Globe size={16} /> {farmer.language}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Calendar size={16} /> Member since {farmer.createdAt}
//                 </div>
//               </div>

//               <Badge
//                 className="w-fit"
//                 variant={farmer.status === "ACTIVE" ? "default" : "secondary"}
//               >
//                 {farmer.status}
//               </Badge>

//               <p className="text-gray-700 pt-2">{farmer.bio}</p>

//               <Button className="mt-4 rounded-xl flex gap-2">
//                 <MessageCircle size={18} /> Message Farmer
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Card */}
//         <Card className="rounded-2xl shadow-md">
//           <CardContent className="p-6 space-y-6">
//             <h2 className="text-xl font-semibold">Farm Stats</h2>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">Total Products</p>
//                 <p className="text-2xl font-bold">
//                   {farmer.stats.totalProducts}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Total Sold (kg)</p>
//                 <p className="text-2xl font-bold">
//                   {farmer.stats.totalSold}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Revenue</p>
//                 <p className="text-2xl font-bold">
//                   ${farmer.stats.totalRevenue}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Experience</p>
//                 <p className="text-2xl font-bold">
//                   {farmer.experience} yrs
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Products Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Available Coffees</h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {farmer.products.map((product) => (
//             <motion.div
//               key={product.id}
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Card className="rounded-2xl shadow-md overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-48 w-full object-cover"
//                 />
//                 <CardContent className="p-5 space-y-2">
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <p className="text-gray-600">${product.price}</p>
//                   <p className="text-sm text-gray-500">
//                     Stock: {product.stock}
//                   </p>
//                   <div className="text-sm text-gray-600 space-y-1 pt-2">
//                     <div>Origin: {product.origin}</div>
//                     <div>Roast: {product.roast}</div>
//                     <div>Flavor: {product.flavor}</div>
//                   </div>
//                   <Button className="w-full mt-4 rounded-xl">
//                     <Coffee size={16} className="mr-2" /> View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, MapPin, Globe, Calendar, Coffee, Edit, Edit2, Eye, EyeOff } from "lucide-react";
import LoaderBtn from "../loaderBtn";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 🔹 Define props type (adjust if you create proper TypeScript types)
type FarmerProfileProps = {
  farmer: any;
  isOwnPage?:boolean
};

export default function FarmerProfile({ farmer,isOwnPage=true }: FarmerProfileProps) {
  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Farmer not found.</p>
      </div>
    );
  }

  const [displayCoffee,setDisplayCoffee] = useState(false);
  const router = useRouter();
  

//   return (
//     <div className="mt-12 min-h-screen bg-gray-50 px-4 md:px-10 py-8">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="grid md:grid-cols-3 gap-6"
//       >
//         <Card className="md:col-span-2 rounded-2xl shadow-md">
//           <CardContent className="p-6 flex flex-col md:flex-row gap-6">
//             <img
//               src={farmer.image || "/placeholder.jpg"}
//               alt="farmer"
//               className="w-full md:w-40 h-40 object-cover rounded-2xl"
//             />

//             <div className="flex-1 space-y-3">
//               <h1 className="text-2xl md:text-3xl font-bold">
//                 {farmer.first_name} {farmer.last_name}
//               </h1>

//               {farmer.farmName && (
//                 <p className="text-lg text-gray-600 font-medium">
//                   {farmer.farmName}
//                 </p>
//               )}

//               <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                 {farmer.address && (
//                   <div className="flex items-center gap-1">
//                     <MapPin size={16} /> {farmer.address}
//                   </div>
//                 )}
//                 {farmer.language && (
//                   <div className="flex items-center gap-1">
//                     <Globe size={16} /> {farmer.language}
//                   </div>
//                 )}
//                 {farmer.createdAt && (
//                   <div className="flex items-center gap-1">
//                     <Calendar size={16} /> Member since{" "}
//                     {new Date(farmer.createdAt).getFullYear()}
//                   </div>
//                 )}
//               </div>

//               {farmer.status && (
//                 <Badge
//                   className="w-fit"
//                   variant={
//                     farmer.status === "ACTIVE" ? "default" : "secondary"
//                   }
//                 >
//                   {farmer.status}
//                 </Badge>
//               )}

//               {farmer.bio && (
//                 <p className="text-gray-700 pt-2">{farmer.bio}</p>
//               )}

//               {
//                 isOwnPage ? (
//                 <Button className="mt-4 rounded-xl flex gap-2 cursor-pointer bg-green-800 hover:bg-green-700 active:bg-green-600">
//                     <Edit size={18} /> Edit Profile
//                   </Button>
//                 ) : (
//                 <Button className="mt-4 rounded-xl flex gap-2 cursor-pointer bg-green-800 hover:bg-green-700 active:bg-green-600" onClick={()=>router.push(`/chatMatche/${farmer.id}`)}>
//                     <MessageCircle size={18} /> Message Farmer
//                   </Button>
//                 )
//               }

//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Card */}
//         {farmer.stats && (
//           <Card className="rounded-2xl shadow-md">
//             <CardContent className="p-6 space-y-6">
//               <h2 className="text-xl font-semibold">Farm Stats</h2>

//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Products</p>
//                   <p className="text-2xl font-bold">
//                     {farmer.stats.totalProducts}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Total Sold (kg)</p>
//                   <p className="text-2xl font-bold">
//                     {farmer.stats.totalSold}
//                   </p>
//                 </div>
//                 {
//                     isOwnPage && (
//                         <div>
//                         <p className="text-sm text-gray-500">Revenue</p>
//                         <p className="text-2xl font-bold">
//                           ${farmer.stats.totalRevenue}
//                         </p>
//                       </div>
//                     )
//                 }
//                 {farmer.experience && (
//                   <div>
//                     <p className="text-sm text-gray-500">Experience</p>
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

//       {/* Products Section */}
// {

// <Button
//   onClick={() => setDisplayCoffee(!displayCoffee)}
//   className="mt-4 rounded-xl flex gap-2 cursor-pointer bg-green-800 hover:bg-green-700 active:bg-green-600"
// >
//   {displayCoffee ? (
//     <>
//       <EyeOff size={18} />
//       Hide Products
//     </>
//   ) : (
//     <>
//       <Eye size={18} />
//       Display Products
//     </>
//   )}
// </Button>

// }
//       {farmer.products && farmer.products.length > 0 && (
//          displayCoffee ? (
//             <div className="mt-12">
//             <h2 className="text-2xl font-bold mb-6">Available Coffees</h2>
  
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {farmer.products.map((product: any) => (
//                 <motion.div
//                   key={product.id}
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Card className="rounded-2xl shadow-md overflow-hidden">
//                   <Link href={`/product/${product.id}`}>
//                   <div className="relative group">
//                   <img
//                       src={product.image}
//                       alt={product.product_name}
//                      className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
//                       loading="lazy"
  
//                     />
//                   </div>
//                   </Link>
//                     <CardContent className="p-5 space-y-2">
//                       <h3 className="text-lg font-semibold">
//                         {product.product_name}
//                       </h3>
//                       <p className="text-gray-600">${product.price}</p>
//                       <p className="text-sm text-gray-500">
//                         Stock: {product.stock}
//                       </p>
  
//                       {product.description && (
//                         <div className="text-sm text-gray-600 space-y-1 pt-2">
//                           {product.description.origion && (
//                             <div>
//                               Origin: {product.description.origion}
//                             </div>
//                           )}
//                           {product.description.roastLevel && (
//                             <div>
//                               Roast: {product.description.roastLevel}
//                             </div>
//                           )}
//                           {product.description.flavorNotes && (
//                             <div>
//                               Flavor: {product.description.flavorNotes}
//                             </div>
//                           )}
//                         </div>
//                       )}
  
//                       {
//                           isOwnPage ? (
//                               <LoaderBtn btnName="Edit" className="mt-4 rounded-xl w-full flex gap-2 cursor-pointer bg-green-800 hover:bg-green-700 active:bg-green-600"
//                               />
//                           ) :(
         
//                               <LoaderBtn btnName="View Details" className="mt-4 w-full rounded-xl flex gap-2 cursor-pointer bg-green-800 hover:bg-green-700 active:bg-green-600" linkTo={`/product/${product.id}`}/>
//                           )
  
//                       }
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//          ) :null

//       )}
//     </div>
//   );


return (
  <div className="mt-12 min-h-screen bg-background text-foreground px-4 md:px-10 py-8 transition-colors">
    
    {/* ================= HEADER SECTION ================= */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-3 gap-6"
    >
      <Card className="md:col-span-2 rounded-2xl shadow-md border border-border bg-card">
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          
          <img
            src={farmer.image || "/placeholder.jpg"}
            alt="farmer"
            className="w-full md:w-40 h-40 object-cover rounded-2xl"
          />

          <div className="flex-1 space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {farmer.first_name} {farmer.last_name}
            </h1>

            {farmer.farmName && (
              <p className="text-lg text-muted-foreground font-medium">
                {farmer.farmName}
              </p>
            )}

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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

            {farmer.status && (
              <Badge
                className="w-fit"
                variant={farmer.status === "ACTIVE" ? "default" : "secondary"}
              >
                {farmer.status}
              </Badge>
            )}

            {farmer.bio && (
              <p className="text-muted-foreground pt-2 leading-relaxed">
                {farmer.bio}
              </p>
            )}

            {isOwnPage ? (
              <Button className="mt-4 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition">
                <Edit size={18} /> Edit Profile
              </Button>
            ) : (
              <Button
                className="mt-4 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                onClick={() => router.push(`/chatMatche/${farmer.id}`)}
              >
                <MessageCircle size={18} /> Message Farmer
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
                <p className="text-2xl font-bold">
                  {farmer.stats.totalSold}
                </p>
              </div>

              {isOwnPage && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ${farmer.stats.totalRevenue}
                  </p>
                </div>
              )}

              {farmer.experience && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Experience
                  </p>
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

    {/* ================= PRODUCTS SECTION ================= */}
    {farmer.products && farmer.products.length > 0 && displayCoffee && (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Available Coffees
        </h2>

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
                        <div>
                          Flavor: {product.description.flavorNotes}
                        </div>
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
