// calculations.js

/**
 * Calcula la probabilidad implícita de la casa a partir de las cuotas
 * @param {number[]} cuotas - Array de cuotas de la casa
 * @returns {string[]} - Array de probabilidades implícitas en %
 */
export const calculateImpliedProbability = (cuotas) => {
  if (!cuotas) return [];
  return cuotas.map(c => ((1 / c) * 100).toFixed(2));
};

/**
 * Calcula el margen de la casa
 * @param {number[]} cuotas - Array de cuotas de la casa
 * @returns {string} - Margen en %
 */
export const calculateBookmakerMargin = (cuotas) => {
  if (!cuotas) return '0';
  const sum = cuotas.reduce((acc, c) => acc + 1 / c, 0);
  return ((sum - 1) * 100).toFixed(2);
};

/**
 * Calcula probabilidades ajustadas, eliminando el margen de la casa
 * @param {number[]} cuotas - Array de cuotas de la casa
 * @returns {string[]} - Probabilidades ajustadas en %
 */
export const calculateAdjustedProbabilities = (cuotas) => {
  if (!cuotas) return [];
  const margin = cuotas.reduce((acc, c) => acc + 1 / c, 0);
  return cuotas.map(c => ((1 / c) / margin * 100).toFixed(2));
};

/**
 * Calcula el Expected Value usando la probabilidad del usuario
 * @param {number[]} cuotas - Array de cuotas de la casa
 * @param {number[]} probsUsuario - Array de probabilidades estimadas por el usuario en decimal (0-1)
 * @returns {number[]} - Array de EV
 */
export const calculateExpectedValue = (cuotas, probsUsuario) => {
  if (!cuotas || !probsUsuario) return [];
  if (cuotas.length !== probsUsuario.length) return [];
  return cuotas.map((cuota, i) => probsUsuario[i] * cuota - 1);
};


// export const calculateImpliedProbability = (oddsArray) => {
//   return oddsArray.map(odd => (1 / odd * 100).toFixed(2));
// };

// export const calculateBookmakerMargin = (oddsArray) => {
//   const margin = oddsArray.reduce((sum, odd) => sum + (1 / odd), 0);
//   return (margin * 100 - 100).toFixed(2);
// };

// export const calculateAdjustedProbabilities = (oddsArray) => {
//   const margin = oddsArray.reduce((sum, odd) => sum + (1 / odd), 0);
//   return oddsArray.map(odd => ((1 / odd) / margin * 100).toFixed(2));
// };

// export const calculateExpectedValue = (oddsArray) => {
//   return oddsArray.map(odd => ((odd * (1 / odd)) - 1).toFixed(2));
// };

