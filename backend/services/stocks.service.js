import stocks from '../utils/data/data.json' assert { type: 'json' };
import { paths as pt } from "../utils/routes/routes.js";
import { HttpService } from "./http.service.js";
import fs from 'fs'


export class StocksService {

    constructor(httpService = new HttpService()) {
        this._httpService = httpService;
    }

    async resetStocks() {
        this._writeDataToFile('./utils/data/data.json', []);
    }

    async getAllData() {
        return JSON.stringify(stocks);
    }

    async getCompanyData(symbol) {

        if (!symbol) { throw new Error('Symbol is required') }

        try {
            const quotesUrl = pt.getQuoteRt(symbol);
            const logoUrl = pt.getLogoRt(symbol);

            const quotesData = await this._httpService.get(quotesUrl)
            const companyLogo = await this._httpService.get(logoUrl)

            if (!quotesData || !companyLogo) {
                return undefined;
            }

            const companyData = {
                logo: companyLogo?.url,
                name: quotesData?.companyName,
                change: quotesData?.change,
                price: quotesData?.latestPrice,
                symbol: quotesData?.symbol,
            }

            const stock = this._getStockFromList(symbol);
            this._addNewCompany(companyData);

            if (!stock) {

                return {
                    data: companyData,
                    inList: false,
                }

            } else {
                return {
                    data: companyData,
                    inList: true,
                }
            }

        } catch (error) {
            console.log("error", error)
            return undefined;
        }

    }

    async removeFromList(symbol) {

        const index = stocks.findIndex(stock => stock.symbol.toLowerCase() === symbol.toLowerCase());

        if (index === -1) {
            return { notFound: true, }
        }

        stocks.splice(index, 1);

        this._writeDataToFile('./utils/data/data.json', stocks);

        return { notFound: false, }

    }

    async updateData(data) {

        const index = stocks.findIndex(
            stock => stock.symbol.toLowerCase() === data.symbol.toLowerCase()
        );

        stocks[index] = data;

        this._writeDataToFile('./utils/data/data.json', stocks);

    }

    _getStockFromList(symbol) {
        return stocks.find(stock => stock.symbol.toLowerCase() === symbol.toLowerCase());
    }

    _addNewCompany(data) {
        if (!data) { throw new Error('Data is required') }
        const { name } = data

        const foundedCompany = stocks.find(company => company.name === name);
        if (foundedCompany) return;

        stocks.push(data);

        this._writeDataToFile('./utils/data/data.json', stocks);
    }

    _writeDataToFile(fileName, data) {

        fs.writeFileSync(
            fileName,
            JSON.stringify(data),
            'utf8',
            (err) => { err && console.log(err) }
        )

    }

}