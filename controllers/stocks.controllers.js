import http from 'http'
import { StocksService } from "../services/stocks.service.js";

export class StocksController {

    constructor(stockServie = new StocksService()) {
        this._stocksService = stockServie;
    }

    //DESC   seed data
    //ROUTE  POST api/seed
    async seedData(req = http.IncomingMessage, res = http.ServerResponse) {

        await this._stocksService.resetStocks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data seeded' }));

    }

    //DESC   add new company to list
    //ROUTE  POST api/stocks/:symbol
    async addNewCompany(req = http.IncomingMessage, res = http.ServerResponse, symbol) {

        try {

            const companyData = await this._stocksService.getCompanyData(symbol)

            if (!companyData) {

                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify({ error: 'Company not found' }));
            } else {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(companyData);
            }

        } catch (error) {
            console.log("error", error)
            res.writeHead(500, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(error));
        }

    }

    //DESC   get all Stocks saved
    //ROUTE  GET api/stocks/all
    async getAllData(req = http.IncomingMessage, res = http.ServerResponse) {

        const allStocks = await this._stocksService.getAllData();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(allStocks);

    }

    //DESC   delete company from list
    //ROUTE  DELETE api/stocks/:symbol
    async deleteCompany(req = http.IncomingMessage, res = http.ServerResponse, symbol) {

        try {

            const { notFound } = await this._stocksService.removeFromList(symbol);

            if (notFound) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Company not found' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Company deleted' }));
            }

        } catch (error) {

            console.log("error", error)
            res.writeHead(500, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(error));
        }

    }

    //DESC   get updated company data and update the list
    //ROUTE  GET api/stocks/:symbol
    async getUpdatedCompanyData(req = http.IncomingMessage, res = http.ServerResponse, symbol) {

        const companyData = await this._stocksService.getCompanyData(symbol)

        if (!companyData) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ error: 'Company not found' }));
        }

        await this._stocksService.updateData(JSON.parse(companyData));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(companyData);
    }

}