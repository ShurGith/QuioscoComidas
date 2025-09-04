// --- Lógica DINÁMICA para generar los números de página a mostrar ---
export const generatePagination = (totalPages: number, page: number) => {
  const siblings = 1; // <- ¡Puedes ajustar esto! Define cuántos vecinos mostrar (1 a cada lado).
  const totalVisibleBlocks = siblings * 2 + 5; // (Vecinos * 2) + Actual + Primera + Última + 2 Elipsis

  // --- CASO 1: No hay suficientes páginas para necesitar lógica compleja ---
  if (totalPages <= totalVisibleBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // --- Lógica para calcular rangos ---
  const leftSiblingIndex = Math.max(page - siblings, 1);
  const rightSiblingIndex = Math.min(page + siblings, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // --- CASO 2: Mostrar elipsis solo a la derecha ---
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

    return [...leftRange, '...', lastPageIndex];
  }

  // --- CASO 3: Mostrar elipsis solo a la izquierda ---
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);

    return [firstPageIndex, '...', ...rightRange];
  }

  // --- CASO 4: Mostrar elipsis en ambos lados (el caso intermedio) ---
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = [];
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      middleRange.push(i);
    }
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  // Fallback por si algo falla (aunque no debería ocurrir)
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

export const generatePaginationT3 = (totalPages: number, page: number) => {
  const siblings = 1; // <- ¡Puedes ajustar esto! Define cuántos vecinos mostrar (1 a cada lado).
  const totalVisibleBlocks = siblings * 2 + 5; // (Vecinos * 2) + Actual + Primera + Última + 2 Elipsis

  // --- CASO 1: No hay suficientes páginas para necesitar lógica compleja ---
  if (totalPages <= totalVisibleBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // --- Lógica para calcular rangos ---
  const leftSiblingIndex = Math.max(page - siblings, 1);
  const rightSiblingIndex = Math.min(page + siblings, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // --- CASO 2: Mostrar elipsis solo a la derecha ---
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

    return [...leftRange, '...', lastPageIndex];
  }

  // --- CASO 3: Mostrar elipsis solo a la izquierda ---
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);

    return [firstPageIndex, '...', ...rightRange];
  }

  // --- CASO 4: Mostrar elipsis en ambos lados (el caso intermedio) ---
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = [];
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      middleRange.push(i);
    }
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  // Fallback por si algo falla (aunque no debería ocurrir)
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};