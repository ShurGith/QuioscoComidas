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
  search: z.string().trim()
    .min(3, { message: "La búsqueda debe tener al menos tres caracteres." })
})

export const ProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
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
})