import { z } from 'zod';

export const OrderSchema = z.object({
  name: z.string()
    .min(1, "Tu nombre es obligatorio."),
  total: z.number().positive("El monto debe ser mayor a cero."),
  order: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number()
  })
  )
});

export const SearhSchema = z.object({
  search: z.string()
    .trim()
    .min(3, { message: "La búsqueda debe tener al menos tres caracteres." })
})

export const ProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
  description: z.string()
    .trim()
    .min(1, { message: 'La descripción del Producto no puede ir vacia' }),
  available: z.union([z.literal(true), z.literal(false), z.literal("true"), z.literal("false"), z.literal("on"), z.null(), z.undefined()])
    .transform((value) => {
      if (value === true || value === "true" || value === "on") return true;
      if (value === false || value === "false" || value === null || value === undefined) return false;
      return false;
    }),
  price: z.string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'Precio no válido' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  categoryId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  image: z.string().min(1, { message: 'La Imagen es obligatoria' })
})