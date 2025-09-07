/**
 * Mascara para CEP: 99999-999
 */
export function maskCep(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
}
/**
 * Formata um valor numérico para o formato de moeda brasileira
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no formato R$ 1.234,56
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata um valor numérico para o formato de moeda brasileira sem símbolo
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no formato 1.234,56
 */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
} 