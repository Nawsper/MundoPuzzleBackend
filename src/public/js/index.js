const socket = io()

socket.on('arrayProducts', (array) => {
    let products = '';
    array.forEach(product => {
        products += `Producto: ${product.title}
        <br>Descripción: ${product.description}
        <br>Código: ${product.code}
        <br>Precio: ${product.price}
        <br>Stock: ${product.stock}
        <br>Categoría: ${product.category}
        <br>Imágnes: ${product.thumbnails}
        <br><br>`;
    });
    document.getElementById("products").innerHTML = products;
});


const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');

form.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.valuem,
        thumbnails: thumbnails.value
    }
    socket.emit('newProduct', newProduct);
}