// Para las apis

const IS_PRODUCTION = true;

const PRODUCTION_URL = 'https://tramitesmunicipales.onrender.com/api/v1';
const DEVELOPMENT_URL = 'http://localhost:8000/api/v1'
export const BASE_URL = IS_PRODUCTION ? PRODUCTION_URL : DEVELOPMENT_URL;

export const BASE_AUTH_URL = `${BASE_URL}/auth`;
export const BASE_IA_URL = `${BASE_URL}/ai/ask`;
export const BASE_DOCUMENTS_URL = `${BASE_URL}/ai/files`;

// CAMBIAR LA UBICACIÓN DEL TOKEN, SOLO PRUEBAS