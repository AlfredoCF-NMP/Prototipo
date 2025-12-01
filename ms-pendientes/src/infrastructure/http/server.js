const express = require('express');
const bodyParser = require('body-parser');
const config = require('../../config');

const TemplateGateway = require('../gateways/templateGateway');
const GetPendingRequests = require('../../application/usecases/getPendingRequests');
const createClienteController = require('../../controllers/clienteController');

function createApp() {
  const app = express();
  app.use(bodyParser.json());

  // Construcción de dependencias (composition root)
  const templateGateway = new TemplateGateway({
    templateUrl: config.templateServiceUrl,
    axiosInstance: undefined,
    breakerOptions: {
      timeout: config.circuit.timeout,
      errorThresholdPercentage: config.circuit.errorThresholdPercentage,
      resetTimeout: config.circuit.resetTimeout
    }
  });

  const getPendingRequestsUseCase = new GetPendingRequests({ templateGateway });
  const clienteController = createClienteController({ getPendingRequestsUseCase });

  // Routes
  //app.get('/cliente/solicitud/pendiente', clienteController.getPendientes);
    app.get(config.routes.pendientes, clienteController.getPendientes);


  // health check
  //app.get('/health', (req, res) => res.json({ status: 'ok' }));
    app.get(config.routes.health, (req, res) => res.json({ status: 'ok' }));

   app.use((req, res, next) => {
    res.status(404).json({error: 'Ruta no encontrada' });
  });  

  // basic error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}

function start(port = 3000) {
  const app = createApp();
  app.listen(port, () => {
    console.log(`Microservicio corriendo en http://localhost:${port}`);
  });
  return app;
}

module.exports = { createApp, start };
