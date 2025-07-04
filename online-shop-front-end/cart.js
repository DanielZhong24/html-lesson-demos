let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);


function displayCart(){
    const cartContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartContainer.innerHTML="";

    let price = 0;

    cart.forEach((item,index)=>{
        let itemTotal = item.price*item.quantity;
        price+= itemTotal;

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML=`
            <img src=${item.image} class="cart-image">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x 
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                = $<span class="item-total">${itemTotal}</span>
                </p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>

        `;
        cartContainer.appendChild(itemDiv);
    });

    totalPrice.textContent = price.toFixed(2);
    document.querySelectorAll(".quantity-input").forEach(input=>{
        input.addEventListener("change", updateQuantity);
    });

    document.querySelectorAll(".remove-btn").forEach(btn=>{
        btn.addEventListener("click",removeItem);
    });

}

function updateQuantity(event){
    let index = event.target.getAttribute("data-index");
    let newQuantity = parseInt(event.target.value);
    if(newQuantity<1){
        newQuantity = 1;
    }
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function removeItem(event){
    let index = event.target.getAttribute("data-index");
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function clearCart(){
    cart = []
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function checkout(){
    if(cart.length === 0){
        alert("your cart is empty!");
        return
    }

    alert("Thank you for purchasing! Your order has been placed");
    clearCart()
}

document.getElementById("clear-cart").addEventListener("click",clearCart);
document.getElementById("checkout-btn").addEventListener("click",checkout);

displayCart();