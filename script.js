// ============================================================
// GOLJU MART — FIREBASE + PRODUCTS + SEARCH + CART
// ============================================================

// Firebase Firestore
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================================================
// DEMO PRODUCTS
// Firebase se products na milne par ye products dikhenge
// ============================================================

const demoProducts = [

    {
        id: 1,
        name: "Premium Cotton Shirt",
        category: "Fashion",
        price: 799,
        oldPrice: 1299,
        icon: "👕",
        badge: "NEW"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        oldPrice: 2499,
        icon: "🎧",
        badge: "SALE"
    },

    {
        id: 3,
        name: "Premium Smart Watch",
        category: "Accessories",
        price: 2199,
        oldPrice: 3999,
        icon: "⌚",
        badge: "HOT"
    },

    {
        id: 4,
        name: "Luxury Hand Bag",
        category: "Fashion",
        price: 1299,
        oldPrice: 2099,
        icon: "👜",
        badge: "NEW"
    }

];


// ============================================================
// PRODUCTS ARRAY
// ============================================================

let products = [];


// ============================================================
// FIREBASE PRODUCTS LOAD
// ============================================================

async function loadProductsFromFirebase() {

    try {

        // Firebase database
        const db = window.firebaseDB;

        if (!db) {

            console.warn(
                "Firebase DB not available. Using demo products."
            );

            products = demoProducts;

            renderProducts();

            return;
        }


        // products collection
        const snapshot =
            await getDocs(
                collection(db, "products")
            );


        const firebaseProducts = [];


        snapshot.forEach((doc) => {

            const data = doc.data();

            firebaseProducts.push({

                id: doc.id,

                name:
                    data.name || "Product",

                category:
                    data.category || "Other",

                price:
                    Number(data.price) || 0,

                oldPrice:
                    Number(data.oldPrice) || 0,

                icon:
                    data.icon || "🛍️",

                badge:
                    data.badge || "NEW"

            });

        });


        // Firebase me products hain
        if (firebaseProducts.length > 0) {

            products = firebaseProducts;

            console.log(
                "🔥 Products loaded from Firebase:",
                products.length
            );

        }

        // Firebase empty hai
        else {

            products = demoProducts;

            console.log(
                "Firebase products empty. Demo products loaded."
            );

        }


        renderProducts();

    }

    catch (error) {

        console.error(
            "Firebase Products Error:",
            error
        );


        // Error hone par demo products
        products = demoProducts;

        renderProducts();

    }

}


// ============================================================
// RENDER PRODUCTS
// ============================================================

function renderProducts(list = products) {

    const grid =
        document.getElementById("productGrid");


    if (!grid) return;


    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `

            <div class="no-products">

                <h3>
                    No Products Found
                </h3>

                <p>
                    Please try another search or category.
                </p>

            </div>

        `;

        return;
    }


    list.forEach((product) => {

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

                    ${
                        product.oldPrice
                        ? `
                            <span class="product-old">
                                ₹${product.oldPrice}
                            </span>
                        `
                        : ""
                    }

                </div>


                <button
                    class="add-cart"
                    onclick="addToCart('${product.id}')">

                    ADD TO CART

                </button>

            </div>

        `;

    });

}


// ============================================================
// SEARCH PRODUCTS
// ============================================================

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const text =
        input.value
        .toLowerCase()
        .trim();


    const result =
        products.filter((product) =>

            product.name
                .toLowerCase()
                .includes(text)

        );


    renderProducts(result);

}


// ============================================================
// FILTER PRODUCTS
// ============================================================

function filterProducts() {

    const select =
        document.getElementById(
            "categoryFilter"
        );


    if (!select) return;


    const category =
        select.value;


    if (category === "all") {

        renderProducts(products);

        return;
    }


    const result =
        products.filter(
            (product) =>
                product.category === category
        );


    renderProducts(result);

}


// ============================================================
// CART
// ============================================================

let cart = [];


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(id) {

    const product =
        products.find(
            (p) => String(p.id) === String(id)
        );


    if (!product) return;


    cart.push(product);


    updateCart();


    alert(
        product.name +
        " added to cart 🛒"
    );

}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCart() {

    const count =
        document.getElementById(
            "cartCount"
        );


    if (count) {

        count.innerText =
            cart.length;

    }

}


// ============================================================
// OPEN CART
// ============================================================

function openCart() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty 🛒"
        );

        return;
    }


    alert(
        "Cart items: " +
        cart.length
    );

}


// ============================================================
// SEARCH BUTTON
// ============================================================

function openSearch() {

    const search =
        document.getElementById(
            "searchInput"
        );


    if (!search) return;


    search.focus();


    document
        .getElementById("products")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


// ============================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ============================================================

window.searchProducts =
    searchProducts;

window.filterProducts =
    filterProducts;

window.addToCart =
    addToCart;

window.openCart =
    openCart;

window.openSearch =
    openSearch;


// ============================================================
// START WEBSITE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProductsFromFirebase();

    }
);
