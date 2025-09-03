
import AvailabilityToggle from "@/components/products/AvailabilityToggle";
import ImageUpload from "@/components/products/ImageUpload";
import { prisma } from "@/src/lib/prisma";
import { ProductCardComplete } from "@/src/types";
async function getCategories() {
  return await prisma.category.findMany();
}

type ProducFormProps = {
  product?: ProductCardComplete;
};

export default async function ProductForm({ product }: ProducFormProps) {
  const categories = await getCategories();
  return (
    <>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre del producto"
          defaultValue={product?.name}
        />
      </div>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >Descripción:</label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            className="bg-slate-100 block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            defaultValue={product?.description ?? ''}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="available">Disponible:</label>
        <input
          id="available"
          type="checkbox" // O un input hidden con value="true" si quieres que siempre se envíe
          name="available"
          className="ml-2"
          defaultChecked={product?.available} // Usa defaultChecked para checkboxes
        />
      </div>
      {product && (<AvailabilityToggle product={product} />)}

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="price"
        >Precio:</label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="categoryId"
        >Categoría:</label>
        <select
          className="block w-full p-3 bg-slate-100 cursor-pointer"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ImageUpload
        image={product?.image}
      />

    </>
  )
}