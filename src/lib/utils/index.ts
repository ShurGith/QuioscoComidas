export function formatCurrency(cantidad: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(
    cantidad,
  );
}


export const MIN_ITEMS = 1;
export const MAX_ITEMS = 9;

