
// TODO cambiar a .env
const BASE_URL = "https://cloud.iexapis.com/stable/stock"
const API_KEY = "pk_8c0b41a07dae45f7b07a0a70d6d99b47"

export const paths = {
    getQuoteRt: (symbol) => `${BASE_URL}/${symbol}/quote?token=${API_KEY}`,
    getLogoRt: (symbol) => `${BASE_URL}/${symbol}/logo?token=${API_KEY}`
}