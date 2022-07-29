import test from 'node:test'
import assert from 'assert';
import { StocksService } from '../services/stocks.service.js';
import { HttpService } from '../services/http.service.js';

const httpService = new HttpService()
const stockService = new StocksService(httpService)

test('Stocks Service Test', async (t) => {

    const symbol = 'GOOGL'
    await stockService.resetStocks()

    await t.test('Debe guardar la información de la compañia por su symbol y guardarlo en el historial', async () => {

        await stockService.getCompanyData(symbol)
        const stocks = JSON.parse(await stockService.getAllData())

        const foundSymbol = stocks.find(stock => stock.symbol.toLowerCase() === symbol.toLowerCase())

        console.log({ stocks })

        assert.equal(!!foundSymbol, true, `Symbol must be in the list`)

    })

    await t.test('Debe eliminar la compañia de la lista', async () => {

        await stockService.removeFromList(symbol)
        const stocks = JSON.parse(await stockService.getAllData())

        const foundSymbol = stocks.find(stock => stock.symbol.toLowerCase() === symbol.toLowerCase())

        assert.equal(!!foundSymbol, false, `Symbol must not be in the list`)

    })

})