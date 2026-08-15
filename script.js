
// ============================================================
// GOLJU MART PRODUCTS
// ============================================================

const products = [

{
id:1,
name:"Premium Cotton Shirt",
category:"Fashion",
price:799,
oldPrice:1299,
icon:"👕",
badge:"NEW"
},

{
id:2,
name:"Wireless Headphones",
category:"Electronics",
price:1499,
oldPrice:2499,
icon:"🎧",
badge:"SALE"
},

{
id:3,
name:"Premium Smart Watch",
category:"Accessories",
price:2199,
oldPrice:3999,
icon:"⌚",
badge:"HOT"
},

{
id:4,
name:"Luxury Hand Bag",
category:"Fashion",
price:1299,
oldPrice:2099,
icon:"👜",
badge:"NEW"
}

];



function renderProducts(list=products){

    const grid =
    document.getElementById("productGrid");

    if(!grid) return;

    grid.innerHTML="";

    list.forEach(product=>{

        grid.innerHTML += `

        <div class="product-card">

            <div class="product-badge">
                ${product.badge}
            </div>

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-category">
                ${product.category}
            </div>

            <h3>
                ${product.name}
            </h3>

            <div class="product-price">

                ₹${product.price}

                <span class="product-old">
                    ₹${product.oldPrice}
                </span>

            </div>

            <button
            class="add-cart"
            onclick="addToCart(${product.id})">

                ADD TO CART

            </button>

        </div>

        `;

    });

}

document.addEventListener(
"DOMContentLoaded",
function(){

    renderProducts();

});



function searchProducts(){

    const text =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    const result =
    products.filter(product=>

        product.name
        .toLowerCase()
        .includes(text)

    );

    renderProducts(result);

}



function filterProducts(){

    const category =
    document
    .getElementById("categoryFilter")
    .value;

    if(category==="all"){

        renderProducts(products);

        return;
    }

    const result =
    products.filter(product=>
        product.category===category
    );

    renderProducts(result);

}



let cart=[];

function addToCart(id){

    const product =
    products.find(p=>p.id===id);

    if(!product) return;

    cart.push(product);

    updateCart();

    alert(
        product.name +
        " added to cart 🛒"
    );

}

function updateCart(){

    const count =
    document.getElementById("cartCount");

    if(count){
        count.innerText=cart.length;
    }

}

function openCart(){

    alert(
        "Cart items: " +
        cart.length
    );

}

