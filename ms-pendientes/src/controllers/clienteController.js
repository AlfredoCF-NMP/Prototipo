// Controller: adaptador web (entrada HTTP) -> caso de uso
// Mantener controlador delgado: orquesta, mapea y devuelve HTTP codes

function createClienteController({ getPendingRequestsUseCase }) {
  async function getPendientes(req, res) {
    try {
      const result = await getPendingRequestsUseCase.execute();
      // Mapear a DTO simple para la capa de presentación (si quieres)
      const dto = result.map(s => ({
        folio: s.folio,
        cliente: s.cliente,
        fecha: s.fecha,
        ejecutivo: s.ejecutivo,
        monto: s.monto,
        sku: s.sku
      }));
      return res.status(200).json(dto);
    } catch (err) {
      console.error('[clienteController] Error:', err.message);
      return res.status(502).json({ error: 'No se pudo obtener las solicitudes pendientes', details: err.message });
    }
  }

  return {
    getPendientes
  };
}

module.exports = createClienteController;
