// ============================================
// CARRITO DE NEHNEH
// ============================================

let cart = [];


// ============================================
// ELEMENTOS DEL DOM
// ============================================

const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cart-overlay");

const openCartButton = document.getElementById("open-cart");
const closeCartButton = document.getElementById("close-cart");

const cartItemsElement = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");


// ============================================
// ABRIR CARRITO
// ============================================

openCartButton.addEventListener("click", () => {

    cartElement.classList.add("active");
    cartOverlay.classList.add("active");

});


// ============================================
// CERRAR CARRITO
// ============================================

function closeCart() {

    cartElement.classList.remove("active");
    cartOverlay.classList.remove("active");

}

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// ============================================
// BOTONES "AGREGAR"
// ============================================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);

    });

});


// ============================================
// AGREGAR PRODUCTO
// ============================================

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }


    updateCart();

    cartElement.classList.add("active");
    cartOverlay.classList.add("active");

}


// ============================================
// ELIMINAR PRODUCTO
// ============================================

function removeFromCart(name) {

    cart = cart.filter(
        product => product.name !== name
    );

    updateCart();

}


// ============================================
// CAMBIAR CANTIDAD
// ============================================

function changeQuantity(name, amount) {

    const product = cart.find(
        product => product.name === name
    );

    if (!product) {
        return;
    }


    product.quantity += amount;


    if (product.quantity <= 0) {

        removeFromCart(name);

        return;

    }


    updateCart();

}


// ============================================
// ACTUALIZAR CARRITO
// ============================================

function updateCart() {

    cartItemsElement.innerHTML = "";


    if (cart.length === 0) {

        cartItemsElement.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

        cartTotalElement.textContent = "USD 0";

        cartCountElement.textContent = "0";

        checkoutButton.disabled = true;

        return;

    }


    let total = 0;
    let itemCount = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;

        itemCount += product.quantity;


        const item = document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <span>
                    USD ${product.price}
                </span>

            </div>


            <div class="cart-item-controls">

                <button
                    onclick="changeQuantity('${product.name}', -1)">
                    −
                </button>


                <span>
                    ${product.quantity}
                </span>


                <button
                    onclick="changeQuantity('${product.name}', 1)">
                    +
                </button>

            </div>


            <strong>
                USD ${productTotal}
            </strong>


            <button
                class="remove-item"
                onclick="removeFromCart('${product.name}')">

                ✕

            </button>

        `;


        cartItemsElement.appendChild(item);

    });


    cartTotalElement.textContent =
        `USD ${total}`;


    cartCountElement.textContent =
        itemCount;


    checkoutButton.disabled = false;

}


// ============================================
// CHECKOUT
// ============================================

const checkoutOverlay =
    document.getElementById("checkout-overlay");

const closeCheckoutButton =
    document.getElementById("close-checkout");

const checkoutItemsElement =
    document.getElementById("checkout-items");

const checkoutTotalElement =
    document.getElementById("checkout-total");

const paypalOption =
    document.getElementById("paypal-option");

const cardOption =
    document.getElementById("card-option");

const paypalContainer =
    document.getElementById("paypal-container");

const cardContainer =
    document.getElementById("card-container");


// ============================================
// ABRIR CHECKOUT
// ============================================

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        return;
    }

    updateCheckout();

    checkoutOverlay.classList.add("active");

});


// ============================================
// CERRAR CHECKOUT
// ============================================

closeCheckoutButton.addEventListener("click", () => {

    checkoutOverlay.classList.remove("active");

});


// ============================================
// ACTUALIZAR CHECKOUT
// ============================================

function updateCheckout() {

    checkoutItemsElement.innerHTML = "";


    cart.forEach(product => {

        const item = document.createElement("div");

        item.classList.add("checkout-item");


        const total =
            product.price * product.quantity;


        item.innerHTML = `

            <span>
                ${product.name} × ${product.quantity}
            </span>

            <strong>
                USD ${total}
            </strong>

        `;


        checkoutItemsElement.appendChild(item);

    });


    checkoutTotalElement.textContent =
        `USD ${calculateTotal()}`;

}


// ============================================
// CAMBIAR MÉTODO DE PAGO
// ============================================

paypalOption.addEventListener("click", () => {

    paypalOption.classList.add("active");

    cardOption.classList.remove("active");

    paypalContainer.classList.remove("hidden");

    cardContainer.classList.add("hidden");

});


cardOption.addEventListener("click", () => {

    cardOption.classList.add("active");

    paypalOption.classList.remove("active");

    cardContainer.classList.remove("hidden");

    paypalContainer.classList.add("hidden");

});


// ============================================
// CALCULAR TOTAL
// ============================================

function calculateTotal() {

    return cart.reduce(

        (total, product) => {

            return total +
                product.price *
                product.quantity;

        },

        0

    );

}