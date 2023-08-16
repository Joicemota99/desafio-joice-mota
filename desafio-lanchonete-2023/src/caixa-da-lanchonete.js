import { cardapio } from "./banco-de-dados/cardapio.js"

class CaixaDaLanchonete {
    valorTotal = 0    
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!"
        }
        this.somar(itens)
      
        let temChantily = false
        let temQueijo = false
        let temCafe = false
        let temSanduiche = false
        for (const item of itens) {
            const [codigo] = item.split(',')
            if (!cardapio[codigo]) {
                return "Item inválido!"
            }
            if (codigo === 'chantily') {
                temChantily = true
            }
            if (codigo === 'queijo') {
                temQueijo = true
            }
            if (codigo === 'cafe'){
                temCafe = true
            }
            if (codigo === 'sanduiche'){
                temSanduiche = true
            }
        }    
        if(metodoDePagamento !== 'dinheiro'&& metodoDePagamento !== 'credito' && metodoDePagamento !== 'debito'){
            return "Forma de pagamento inválida!"
        }
        if (metodoDePagamento === 'dinheiro') {
            if(temChantily && itens.length === 1){
                return "Item extra não pode ser pedido sem o principal"
            }
            const desconto = this.valorTotal * 0.05
            this.valorTotal -= desconto
        } else if (metodoDePagamento === 'credito') {
            if ((temChantily && !temCafe) || (temQueijo && itens.length === 1) ){
                return "Item extra não pode ser pedido sem o principal"
            }
            const acrescimo = this.valorTotal * 0.03
            this.valorTotal += acrescimo
        } else{
            if(temQueijo && !temSanduiche){
                return "Item extra não pode ser pedido sem o principal"
            }
        }

        if(this.valorTotal === 0){
            return "Quantidade inválida!"
        }
        const valorFormatado = (this.valorTotal/100).toFixed(2)
        return `R$ ${valorFormatado.toString().replace('.',',')}`
    }
    somar(itens){
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',')
            if (!cardapio[codigo]) {
                return "Item inválido!"
            }
            const valorItem = cardapio[codigo].valor * parseInt(quantidade)
            this.valorTotal += valorItem
        }
    }
}
export { CaixaDaLanchonete };
        
