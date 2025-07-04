let products = []
let cart = JSON.parse(localStorage.getItem("cart"))||[];
async function fetchProducts(){
    const response = await fetch("products.json");
    products = await response.json();
    displayProducts(products);
}

function displayProducts(filteredProducts){
    const productList = document.getElementById("product-list");
    productList.innerHTML="";

    filteredProducts.forEach(product=>{
        const productDiv= document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML=`
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(id){
    const product = products.find(p => p.id === id);
    
    if (!product) return; 

    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;  
    } else {
        cart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount(){

    let sum = 0;
    cart.forEach(item=>{
        sum += item.quantity;
    });
    document.getElementById("cart-count").textContent = sum;
}

function applyFilters(){
    let searchQuery= document.getElementById("search-bar").value.toLowerCase();
    let category = document.getElementById("category-filter").value;
    let sortedProducts = [...products];

    if(category!=="all"){
        sortedProducts=sortedProducts.filter(p=>p.category===category);
    }

    let sortOption = document.getElementById("sort-price").value;

    //use the .sort()
    if(sortOption==="low-high"){
        sortedProducts.sort((a,b)=>a.price-b.price);
    }else if(sortOption === "high-low"){
        
    }
    let filteredProducts = sortedProducts.filter(p=> p.name.toLowerCase().includes(searchQuery));
    displayProducts(filteredProducts);
}


document.getElementById("search-bar").addEventListener("input",applyFilters);
document.getElementById("category-filter").addEventListener("change",applyFilters);
document.getElementById("sort-price").addEventListener("change",applyFilters);

fetchProducts();
updateCartCount();