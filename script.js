//Abrir y cerrar Menu de Hamburguesa
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
bar.addEventListener('click', () => {
console.log('abrir modal');
nav.classList.add('active');
})
}

if (close) {
close.addEventListener('click', () => {
console.log('cerrar modal');
nav.classList.remove('active');
})
}  
//Filtrar productos
const allFilterItems = document.querySelectorAll('.products');
const allFilterBtns = document.querySelectorAll('.filter-btn-singular');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[0].classList.add('active-btn-singular');
});

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn-singular');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn-singular');
    });
}

//Abrir carrito
let cartIcon = document.querySelector('#cart-icon')
let cartMenu = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
    cartMenu.classList.add("active");
}

//Cerrar carrito
closeCart.onclick = () => {
    cartMenu.classList.remove("active");
}

//cart working js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready ();
}

//Variable para obtener el producto del localstorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
localStorage.setItem("cart", JSON.stringify(cartList));
};



function ready() {
//Agregar al carrito
let addCart = document.getElementsByClassName("fa-cart-shopping");
for (let i = 0; i < addCart.length; i++) {
  let button = addCart[i];
  button.addEventListener("click", addCartClicked);
}

//Añadir al carrito
function addCartClicked(event) {
let button = event.target;
let shopProducts = button.parentElement;
let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-image")[0].src;
    addProductToCart(title,price, productImg);
    updateTotal();
}
function addProductToCart(title, price, productImg) {
let cartItems = document.getElementsByClassName("cart-content")[0];
let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
        alert('Ya has añadido este articulo al carrito');
        return;
    }
}

let cartShopBox = document.createElement("div");
cartShopBox.classList.add("cart-box");
let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <div class="details__product-quantity">
        <div class="input">
          <img class="input__minus" src="./images/icon-minus.svg" alt="minus">
          <input class="input__number" type="text" value="0">
          <img class="input__plus" src="./images/icon-plus.svg" alt="plus">
        </div>
        </div>
        </div>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
}

//Hacer que el boton funcione
document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);





// Seleccionar el elemento de precio total
const totalElement = document.querySelector('.total-price');

// Función para calcular el precio total
function updateTotal() {
  let precioTotal = 0;

  // Seleccionar todos los elementos de precio individuales
  const preciosIndividuales = document.querySelectorAll('.cart-price');

  // Recorrer los elementos de precio y sumarlos
  for (let i = 0; i < preciosIndividuales.length; i++) {
    const precio = parseFloat(preciosIndividuales[i].innerText.replace('$', ''));
    precioTotal += precio;
  }

  // Actualizar la etiqueta del precio total
  totalElement.innerText = '$' + precioTotal.toFixed(2);
}

// Llamar a la función de cálculo de precio total
updateTotal();

 //Boton de compra
 function buyButtonClicked() {
    alert("Tu compra esta realizada");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
  }

  

  // Seleccionar el botón "vaciar carrito"
const clearCartButton = document.querySelector(".btn-empty");

// Agregar listener al botón "vaciar carrito"
clearCartButton.addEventListener("click", clearCart);

// Función para vaciar el carrito
function clearCart() {
  // Seleccionar todos los elementos del carrito
  const cartItems = document.querySelectorAll(".cart-box");

  // Eliminar cada elemento del carrito uno por uno
  cartItems.forEach((cartItem) => {
    cartItem.remove();
  });

  // Actualizar el precio total a 0
  const totalElement = document.querySelector(".total-price");
  totalElement.innerText = "$0.00";
}
}
