import { getAllProducts } from "@/app/actions/products";
import { useTheme } from "@/components/checkTheme";
import ProductsPage from "@/components/products";

async function Products() {

    const {data} = await getAllProducts();

    console.log(data)
     
    if(!data){
        return <div >No Product Found</div>
    }
 
    return ( 
        <div>
            <ProductsPage products={data} />
        </div>
     );
}

export default Products;