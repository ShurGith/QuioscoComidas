export function formatCurrency(cantidad: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(
    cantidad,
  );
}

export function getImagePath(imagePath: string | null) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com/"
  if (imagePath?.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.jpg`;
  }

}

export const MIN_ITEMS = 1;
export const MAX_ITEMS = 9;

