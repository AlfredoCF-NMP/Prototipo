// Capa de aplicación / caso de uso:
// - recibe gateway como dependencia (Inyección)
// - orquesta la llamada y transforma a modelos de dominio

const Solicitud = require('../../domain/models/Solicitud');

class GetPendingRequests {
  constructor({ templateGateway }) {
    // Principio de inversión de dependencias (D de SOLID)
    this.templateGateway = templateGateway;
  }

  async execute() {
    // Obtener datos crudos desde gateway (puede devolver fallback [])
    const raw = await this.templateGateway.fetchTemplates();

    if (!Array.isArray(raw)) {
      // Si la dependencia devolvió algo raro, fallamos seguro
      throw new Error('Respuesta inesperada de template service');
    }

    // Convertir a modelos de dominio (encapsula validación)
    const solicitudes = raw.map((item, idx) => {
      try {
        return new Solicitud({
          folio: item.folio,
          cliente: item.cliente,
          fecha: item.fecha,
          ejecutivo: item.ejecutivo,
          monto: item.monto,
          sku: item.sku
        });
      } catch (err) {
        // Si falla la conversión de un ítem en particular, lo saltamos
        console.warn(`Item ${idx} inválido: ${err.message}`);
        return null;
      }
    }).filter(Boolean);

    return solicitudes;
  }
}

module.exports = GetPendingRequests;
