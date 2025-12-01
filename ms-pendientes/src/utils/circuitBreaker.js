const CircuitBreaker = require('opossum');

/**
 * Crea un circuit breaker alrededor de la función proporcionada.
 * La función `action` debe devolver una Promise.
 */
function createCircuitBreaker(action, options = {}) {
  const defaultOptions = {
    timeout: options.timeout || 10000, // tiempo antes de considerar timeout
    errorThresholdPercentage: options.errorThresholdPercentage || 50,
    resetTimeout: options.resetTimeout || 30000
  };

  const breaker = new CircuitBreaker(action, defaultOptions);

  // Logs útiles para debugging (no es un logger serio)
  breaker.on('open', () => console.warn('[CircuitBreaker] abierto - llamadas bloqueadas temporalmente'));
  breaker.on('halfOpen', () => console.info('[CircuitBreaker] medio-abierto - probando la dependencia'));
  breaker.on('close', () => console.info('[CircuitBreaker] cerrado - dependencia estable'));
  breaker.on('fallback', (data) => console.info('[CircuitBreaker] fallback invoked'));
  breaker.on('reject', () => console.warn('[CircuitBreaker] request rejected'));
  breaker.on('timeout', () => console.warn('[CircuitBreaker] request timeout'));
  breaker.on('failure', (error) => console.warn('[CircuitBreaker] failure:', error && error.message));

  // Fallback razonable: devuelve array vacío (o podrías tomar cache)
  breaker.fallback(() => {
    return [];
  });

  return breaker;
}

module.exports = createCircuitBreaker;
