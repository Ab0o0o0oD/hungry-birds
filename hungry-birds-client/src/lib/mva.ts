

type Vat = {
    priceWithOutVat: string,
    vat: string,

}
export const calculateVat = (price: number): Vat => {
    const vatRate = 15;
    const priceWithOutVat = (price / (1 + vatRate / 100));
    const vat = (price - priceWithOutVat)

    return {
        priceWithOutVat: priceWithOutVat.toFixed(2),
        vat: vat.toFixed(2)
    }
} 