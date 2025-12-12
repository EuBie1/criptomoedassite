/**
 * Configuração e utilitários da API
 */

const API_BASE_URL = 'https://rest.coincap.io/v3'
const API_KEY = '4093eb869547906dbb66fa4c0e36b7373f68283a67f8f56e448934e714dd5b08'

/**
 * Constrói a URL da API com a chave de autenticação
 */
export function buildApiUrl(endpoint: string): string {
  const separator = endpoint.includes('?') ? '&' : '?'
  return `${API_BASE_URL}${endpoint}${separator}apiKey=${API_KEY}`
}

/**
 * Busca lista de criptomoedas
 */
export async function fetchCoins(limit: number = 10, offset: number = 0) {
  const url = buildApiUrl(`/assets?limit=${limit}&offset=${offset}`)
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar criptomoedas: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Busca detalhes de uma criptomoeda específica
 */
export async function fetchCoinDetail(coinId: string) {
  const url = buildApiUrl(`/assets/${coinId}`)
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar detalhes: ${response.statusText}`)
  }
  
  return response.json()
}

