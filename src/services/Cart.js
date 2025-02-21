import products from "./Catalog.js"



async function itemCalculate(prodId, quantity){

    for(let i = 0; i < products.length; i++){
        if (products[i] == products[prodId]){
            if(products[i].quantity <= 0){
                return "Product not available!"
            }
            products[i].quantity = products[i].quantity - quantity
            return products[i].price * quantity
        }
    }
}

async function productSelected(prodId) {
    for(let i = 0; i < products.length; i++){
        if (products[i] == products[prodId]){
            return products[i].product
        }
    }
    
}


async function payProduct(cart) {
    let total = cart.reduce((acc, item) => acc + item.totalPrice, 0); 
    return total;
}


async function displayCart(userCart) {
    console.log(`Your cart:`);
    console.log("----------------------------------------------");
    
    if (!Array.isArray(userCart) || userCart.length === 0) {
        console.log("Your cart is empty.");
        console.log("----------------------------------------------");
        return;
    }

    let totalFinal = 0;
    for(let i = 0; i < userCart.length; i++){
        console.log(`${i + 1}. ${userCart[i].product} - (Qty): ${userCart[i].quantity}) - R$${userCart[i].totalPrice} `)

        totalFinal += userCart[i].totalPrice 
    }
    console.log(`\n                           Total: $${totalFinal}`);
    console.log("----------------------------------------------");
}


export {
    itemCalculate,
    displayCart,
    productSelected,
    payProduct,
}