/**
 * Utilidades de moneda para AgendApp.
 *
 * REGLA DE ORO: el dinero se calcula en CENTAVOS (enteros), nunca con decimales
 * flotantes. En JS, 0.1 + 0.2 === 0.30000000000000004; con centavos enteros
 * evitamos esos errores y garantizamos que abono + saldo === total SIEMPRE.
 */

/** Porcentaje de abono que se cobra online al reservar (5%). */
export const DEPOSIT_RATE = 0.05;

/** Convierte dólares (20.5) a centavos enteros (2050). */
export const toCents = (usd) => Math.round(Number(usd) * 100);

/** Convierte centavos (2050) a dólares (20.5). */
export const fromCents = (cents) => cents / 100;

/**
 * Calcula el desglose financiero de un servicio.
 * Ej: calculateDeposit(20) -> { total: 20, deposit: 1, balance: 19 }
 *
 * El saldo se obtiene por RESTA (total - abono), no recalculando el 95%,
 * así nunca se pierde ni sobra un centavo por redondeo.
 *
 * @param {number} priceUsd Precio del servicio en USD.
 * @returns {{ total: number, deposit: number, balance: number }}
 */
export function calculateDeposit(priceUsd) {
  const totalCents = toCents(priceUsd);
  const depositCents = Math.round(totalCents * DEPOSIT_RATE);
  const balanceCents = totalCents - depositCents;

  return {
    total: fromCents(totalCents),
    deposit: fromCents(depositCents),
    balance: fromCents(balanceCents),
  };
}

/**
 * Formatea un monto como "$1.00 USD".
 * @param {number} amount Monto en USD.
 */
export function formatUSD(amount) {
  return `$${Number(amount).toFixed(2)} USD`;
}
