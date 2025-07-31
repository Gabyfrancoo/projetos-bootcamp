// escorpo de um json
// chave é o valor
let invoice = {
    name: "Gaby",
    age: 21,
    products: {
        0: ["mouse", 29.90],
        1: ["teclado", 129.99],
        2: ["monitor", 899.99],
        3: ["TV", 1000.00]
    }
}

console.log(invoice)
console.log(invoice.name)

//proprio para percorrer objetos - lista
for (let i in invoice.products) {
    let [productName, productPrice] = invoice.products[i];
    console.log(` - ${productName} : R$ ${productPrice}`);
}
