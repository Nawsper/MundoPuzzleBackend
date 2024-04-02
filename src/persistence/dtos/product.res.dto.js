export default class ProductResDTO {
    constructor(product) {
        this.nombre = product.title
        this.descripcion = product.description
        this.codigo = product.code
        this.precio = product.price
        this.disponibilidad = product.stock
    }
}