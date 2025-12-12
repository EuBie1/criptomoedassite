/**
 * Utilitários para formatação de valores monetários
 */

/**
 * Formata um valor numérico como moeda USD
 */
export function formatCurrency(value: number): string {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

/**
 * Formata um valor numérico como moeda USD compacta (ex: $1.2B)
 */
export function formatCompactCurrency(value: number): string {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(value)
}

/**
 * Formata a porcentagem de mudança
 */
export function formatChangePercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

