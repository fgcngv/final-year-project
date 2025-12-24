
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.product_name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <div className="mt-3">
        <h3 className="font-semibold">{product.product_name}</h3>
        <p className="text-sm text-gray-600">
          {product.product_detail}
        </p>

        <div className="mt-2 font-bold text-green-600">
          {product.price} ETB
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
