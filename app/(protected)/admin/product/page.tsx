// import { getAllProducts } from "@/app/actions/products";
// import AllProducts from "@/components/fetchAllProducts";
// import AddProduct from "@/components/form/add-product";

// async function Products() {
//     const data = await getAllProducts();

//     console.log("products : ",data)
//     return ( 
//         <div>
//             <AddProduct />
//             <div>
//                 <AllProducts products={data}/>
//             </div>
//         </div>
//      );
// }

// export default Products;


import { getAllProducts } from "@/app/actions/products";
import AllProducts from "@/components/fetchAllProducts";
import AddProduct from "@/components/form/add-product";

async function Products() {
  const result = await getAllProducts();

  if (!result.success || !result.data) {
    return <div>Failed to load products here</div>;
  }
console.log("products : ",result.data)
  return (
    <div className="space-y-6 z-100">
      <AddProduct />
      <AllProducts products={result.data} />
    </div>
  );
}

export default Products;
