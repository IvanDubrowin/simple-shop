const DEV_API_URL = 'http://localhost:8000/api/'

const PROD_API_URL = `${window.location.origin}/api/`

export const BASE_API_URL = process.env.NODE_ENV === "development" ? DEV_API_URL : PROD_API_URL

export const ACTIVE_CONFIG_ENDPOINT = 'configs/active/'

export const CATEGORIES_ENDPOINT = 'categories/'

export const CART_ENDPOINT = 'cart/'

export const RELATED_PRODUCTS = '/products/'

export const PAGE = '?page='

export const CREATE_ORDER = 'create_order/'