import { getProductById } from "@/app/actions/products";
import AIProductDescription from "@/components/AI_productDescription";
import ProductBYId from "@/components/ProductById";
import { getProductDescriptionByProductId } from "@/utils/services/product";
import { toast } from "sonner";

async function GetProductBYId(props: { params: Promise<{ productId: string }> }) {
    
    const param = await props.params;
    const productId = param?.productId;

    const ProductData = await getProductById(productId);

    const data = ProductData?.data;


    if(!data){
        toast.error(ProductData.message);
        return <div className="font-bold text-3xl ">{ProductData?.message}</div>
    }
    const Pdescription = await getProductDescriptionByProductId(data?.id);

    console.log("Pdescription : ",Pdescription);
    return ( 
        <div className="flex flex-col lg:flex-row lg:items-top">
            <ProductBYId product={data} />
            <div className="lg:pt-20">
            <AIProductDescription id={productId} data={Pdescription?.data} />
            </div>
        </div>
     );
}

export default GetProductBYId;