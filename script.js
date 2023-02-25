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
  
    //Hacer que el boton funcione
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
  
    //Agregar listeners para los botones de sumar y restar
    let inputNumber = document.querySelectorAll(".input__number");
    for (let i = 0; i < inputNumber.length; i++) {
      let input = inputNumber[i];
      input.addEventListener("change", quantityChanged);
    }
  
    let inputMinus = document.querySelectorAll(".input__minus");
    for (let i = 0; i < inputMinus.length; i++) {
      let minus = inputMinus[i];
      minus.addEventListener("click", minusClicked);
    }
  
    let inputPlus = document.querySelectorAll(".input__plus");
    for (let i = 0; i < inputPlus.length; i++) {
      let plus = inputPlus[i];
      plus.addEventListener("click", plusClicked);
    }
  }
  
  //Función para actualizar el precio total
  function updateTotal() {
    let totalPrice = 0;
    let cartItems = document.querySelectorAll(".cart-box");
  
    cartItems.forEach((cartItem) => {
      let priceElement = cartItem.querySelector(".cart-price");
      if (priceElement) {
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = cartItem.querySelector(".input__number").value;
        totalPrice += price * quantity;
      }
    });
  
    let totalElement = document.querySelector(".total-price");
    if (totalElement) {
      totalElement.innerText = "$" + totalPrice.toFixed(2);
    }
  }
  
  //Función para cambiar la cantidad de productos
  function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }
  
  //Función para restar productos
  function minusClicked(event) {
    let button = event.target;
    let input = button.parentElement.querySelector(".input__number");
    let value = parseInt(input.value);
    if (value > 1) {
      input.value = value - 1;
      updateTotal();
    }
  }
  
  //Función para sumar productos
  function plusClicked(event) {
    let button = event.target;
    let input = button.parentElement.querySelector(".input__number");
    let value = parseInt(input.value);
    input.value = value + 1;
    updateTotal();
  }
  
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