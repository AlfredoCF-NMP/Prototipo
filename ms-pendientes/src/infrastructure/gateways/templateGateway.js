const axios = require('axios');
const createCircuitBreaker = require('../../utils/circuitBreaker');
const config = require('../../config');

class TemplateGateway {
  constructor({ templateUrl, axiosInstance, breakerOptions }) {
    this.templateUrl = templateUrl;
    this.axios = axiosInstance || axios.create({ timeout: config.templateTimeoutMs });
    // Crear circuito para la llamada externa
    this.breaker = createCircuitBreaker(async () => {
      const resp = await this.axios.get(this.templateUrl);
      return resp.data;
    }, breakerOptions);
  }

  async fetchTemplates() {
    // Aquí delegamos a opossum; fallback se maneja en createCircuitBreaker
    return this.breaker.fire();
  }
}

module.exports = TemplateGateway;
