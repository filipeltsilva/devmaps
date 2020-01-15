const { Router } = require('express');

const devsController = require('./controllers/devs-controller');
const searchController = require('./controllers/search-controller');

const routes = Router();

// Tipos de parâmetro no Express: Query(request.query), Route(request.params) e Body Params(request.body)
routes.get('/devs', devsController.index);
routes.post('/devs', devsController.store);

routes.get('/search', searchController.index);

module.exports = routes;
