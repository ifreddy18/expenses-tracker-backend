import { Currency } from "../../db/models";

export interface CurrencyInterface {
    code: string;
    name: string;
    subdivision: number;
}

export class CurrencyService  {

    private currencies: CurrencyInterface[] = [];

    constructor(){
        this.getCurrencies();
    }

    public async getCurrencies(): Promise<CurrencyInterface[]> {
        const currencies = await Currency.findAll({ where: { status: 1 }})
        this.currencies = currencies.map( currency => ({
            code: currency.code,
            name: currency.name,
            subdivision: Number(currency.subdivision),
        }));
        return this.currencies;
    }

    public async isValidCurrencyCode(code: string): Promise<boolean> {
        await this.getCurrencies();
        return this.currencies.some( currency => currency.code === code);
    }

}
