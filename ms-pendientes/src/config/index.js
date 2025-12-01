module.exports = {
  port: process.env.PORT || 3000,
  templateServiceUrl: process.env.TEMPLATE_SERVICE_URL || 'http://localhost:4000/template/prueba',
  templateTimeoutMs: parseInt(process.env.TEMPLATE_TIMEOUT_MS, 10) || 5000,
  circuit: {
    timeout: parseInt(process.env.CIRCUIT_BREAKER_TIMEOUT_MS, 10) || 10000,
    errorThresholdPercentage: parseInt(process.env.CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE, 10) || 50,
    resetTimeout: parseInt(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT_MS, 10) || 30000
  },
  routes: {
    pendientes: process.env.ROUTE_PENDIENTES || '/cliente/solicitud/pendiente',
    health: process.env.ROUTE_HEALTH || '/health'
  }
};
