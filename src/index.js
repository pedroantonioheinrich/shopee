import products from "./services/Catalog.js"
import promptSync from "prompt-sync";
import { itemCalculate, productSelected, payProduct, displayCart } from "./services/Cart.js";


const prompt = promptSync()
const cart = []

console.log("\n 🛍 Welcome to the Shopee Store 🛒 \n")
let question = prompt("Would you like to see our products? [Y/N] ")

question.toLowerCase()


let cartEmpty = true

switch (question){
    case "y":
        console.log(products)
            while (cartEmpty === true){
                let productId = prompt("Choose the product ID: ")
                let quantityProduct = prompt("Choose the quantity: ")
                let prodInCart = await productSelected(productId)

                let productObject = products.find(p => p.id == productId); 
                    if (!productObject) {
                        console.log("❌ Product not found!");
                        break;
                    }
                let newPrice = await itemCalculate(productId, quantityProduct);
                let cartItem = {
                    product: productObject.product,
                    quantity: quantityProduct, 
                    totalPrice: newPrice 
                };

                if( cartItem.totalPrice !== 'Product not available!' ){
                    cart.push(cartItem); 
                }
               
                console.log("Products added to cart: " + prodInCart + "Price: " + newPrice)

                await displayCart(cart)

                let questionIn = prompt("Would you like to Pay or Add more products? [ PAY / ADD MORE ] : ")
                questionIn.toLowerCase()
                if(questionIn == "pay"){
                    let finalValue = await payProduct(cart)
                    await displayCart(cart)
                    console.log("The total price is R$" + finalValue)
                    let paymentQuestion = prompt("Would you like to pay wiht CRYPTO or CASH?: ")
                    paymentQuestion.toLowerCase()
                 
                    switch(paymentQuestion){
                        case "crypto":
                        console.log("\n🤑'BITCOIN'!! ₿ Product paid with success!! 💸")
                        cartEmpty =  false
                        break
                        case "cash":
                        console.log("\n🤑 Pay in Cash is too old School 🧓 Product paid with success!! 💸")
                        cartEmpty =  false
                        break
                    }
                    console.log("\n\n🥳 Thanx for shopping with us!! Your product will be shipping soon! 📬")
                }else if (questionIn == "add more"){
                    cartEmpty = true
                }

            } 
        break
    case "n":
        console.log("Saindo...") 
        break   
}

export default cart;