export const PREFERENCIAS_PERMITIDAS = ['vegano', 'vegetariano'] as const;

export type PreferenciaPermitida = typeof PREFERENCIAS_PERMITIDAS[number]; 