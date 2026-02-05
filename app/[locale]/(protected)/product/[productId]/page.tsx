import { getProductById } from "@/app/[locale]/actions/products";
import AIProductDescription from "@/components/AI_productDescription";
import LoaderBtn from "@/components/loaderBtn";
import ProductBYId from "@/components/ProductById";
import { getProductDescriptionByProductId } from "@/utils/services/product";
import { toast } from "sonner";

async function GetProductBYId(props: {
  params: Promise<{ productId: string }>;
}) {
  const param = await props.params;
  const productId = param?.productId;

  const ProductData = await getProductById(productId);

  const data = ProductData?.data;

  if (!data) {
    toast.error(ProductData.message);
    return <div className="font-bold text-3xl ">{ProductData?.message}</div>;
  }
  const Pdescription = await getProductDescriptionByProductId(data?.id);

  console.log("Pdescription : ", Pdescription);
  return (
    <div className="flex flex-col lg:flex-row lg:items-top">
      <ProductBYId product={data} />
      <LoaderBtn
        btnName="Back"
        className="bg-green-800 text-center font-bold text-2xl text-white absolute top-32  rounded p-1 hover:bg-green-600 active:bg-green-400 hover:underline flex justify-center items-center left-20"
        linkTo="/product"
      />
      <div className="lg:pt-20">
        <AIProductDescription id={productId} data={Pdescription?.data} />
      </div>
    </div>
  );
}

export default GetProductBYId;
