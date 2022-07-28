import http from 'http';
import { StocksController } from './controllers/stocks.controllers.js';
import { HttpService } from './services/http.service.js';
import { StocksService } from './services/stocks.service.js';

const PORT = process.env.PORT || 5000;

// Servicio para peticiones http
const httpService = new HttpService()

// Servicio para manejar la logica y traer los datos de la api de stocks
const stockService = new StocksService(httpService);

// Controlador para responder cada uno de los endpoints
const stockController = new StocksController(stockService);

const routeWithParams = /^\/api\/stocks\/[a-zA-Z]{1,9}$/

const server = http.createServer(
    (req, res) => {

        const { url, method } = req;

        if (url === '/api/seed') {
            stockController.seedData(req, res);
        }

        else if (url.match(routeWithParams) && method === 'POST') {

            const symbol = url.split('/')[3];
            stockController.addNewCompany(req, res, symbol);
        }

        else if (url === "/api/stocks/all" && method === 'GET') {

            stockController.getAllData(req, res);
        }

        else if (url.match(routeWithParams) && method === 'DELETE') {
            const symbol = url.split('/')[3];
            stockController.deleteCompany(req, res, symbol);
        }

        else if (url.match(routeWithParams) && method === 'PUT') {
            const symbol = url.split('/')[3];
            stockController.getUpdatedCompanyData(req, res, symbol);
        }

        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }

    }
)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})