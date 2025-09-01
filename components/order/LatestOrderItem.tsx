import { formatCurrency } from "@/src/lib/utils";
import { OrderWithProducts } from "@/src/types";

type LatestOrderItemProps = {
  order: OrderWithProducts;
}
export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-slate-600">
          <span className="font-black underline underline-offset-8c text-xl">Cliente</span>:&nbsp;{order.name}
        </h3>
        <h3 className="text-lg font-medium text-gray-500">{formatCurrency(order.total)}</h3>
      </div>
      <ul className="text-sm font-medium text-gray-500">
        {order.orderProducts.map((product) => (
          <li key={product.id}
            className="flex justify-between items-center py-3">
            <p className="font-black">({product.quantity})&nbsp;&nbsp;
              <span>{product.product.name}</span></p>
            <span>{formatCurrency(product.quantity * product.product.price)}</span>
          </li>
        ))}
      </ul>
    </div >
  )
} 