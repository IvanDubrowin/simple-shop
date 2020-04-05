const DEV_DEFAULT_IMAGE = 'http://localhost:8000/static/img/default.png'

const PROD_DEFAULT_IMAGE = `${window.location.origin}/static/img/default.png`

export const DEFAULT_IMAGE = process.env.NODE_ENV === "development" ? DEV_DEFAULT_IMAGE : PROD_DEFAULT_IMAGE

export const PRODUCTS_PER_PAGE = 16

export const CART_MAX_TOTAL_PRICE = 999999999