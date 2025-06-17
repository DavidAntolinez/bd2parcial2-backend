export const INTOLERANCIAS_PERMITIDAS = ['lactosa', 'gluten'] as const;

export type IntoleranciaPermitida = typeof INTOLERANCIAS_PERMITIDAS[number]; 