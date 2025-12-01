// Modelo de dominio: Solicitud
class Solicitud {
  constructor({ folio, cliente, fecha, ejecutivo, monto, sku }) {
    // Validaciones básicas (puedes ampliar)
    if (!folio) throw new Error('Folio es requerido');
    this.folio = String(folio);
    this.cliente = cliente || null;
    this.fecha = fecha || null;
    this.ejecutivo = ejecutivo || null;
    this.monto = monto || null;
    this.sku = sku || null;
  }

  // Comportamientos del dominio (si hubiera)
  resumen() {
    return `${this.folio} - ${this.cliente} - ${this.monto}`;
  }
}

module.exports = Solicitud;
