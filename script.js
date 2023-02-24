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



    function ready(){
    //Agregar al carrito
    let addCart = document.getElementsByClassName('fa-cart-shopping');
    for (let i = 0; i< addCart.length; i++){
        let button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }

    //Hacer que el boton funcione
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
    }

    function updateTotal() {
  let totalPrice = 0;
  let cartItems = document.querySelectorAll('.cart-box');
  
  cartItems.forEach((cartItem) => {
    let priceElement = cartItem.querySelector('.cart-price');
    if (priceElement) { // Verificar si el elemento de precio existe
      let price = parseFloat(priceElement.innerText.replace('$', ''));
      let quantity = cartItem.querySelector('.cart-quantity').value;
      totalPrice += price * quantity;
    }
  });
  
  let totalElement = document.querySelector('.total-price');
  if (totalElement) {
    totalElement.innerText = '$' + totalPrice.toFixed(2);
  }
}
    
    //Boton de compra
    function buyButtonClicked(){
        alert('Tu compra esta realizada')
        let cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }
    
    //Añadir al carrito
    function addCartClicked(event){
        let button = event.target
        let shopProducts = button.parentElement
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
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove cart-->
        <i class="fa-regular fa-trash-can cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

}

// Seleccionar todos los botones de eliminación del carrito
const removeCartItemButtons = document.querySelectorAll('.cart-remove');

// Iterar sobre cada botón de eliminación y agregar un event listener
removeCartItemButtons.forEach(button => {
  button.addEventListener('click', removeCartItem);
});

// Función que se ejecuta cuando se hace clic en el botón de eliminación
function removeCartItem(event) {
  // Seleccionar el elemento del carrito que se va a eliminar
  const buttonClicked = event.target;
  const cartItem = buttonClicked.closest('.cart-box');
  cartItem.remove();
  updateTotal();
}

// Función para actualizar el total del carrito
function updateCartTotal() {
  // Seleccionar todos los elementos de precio en el carrito
  const cartItems = document.querySelectorAll('.cart-box');
  let total = 0;

  // Iterar sobre cada elemento del carrito y sumar el precio
  cartItems.forEach(cartItem => {
    const priceElement = cartItem.querySelector('.cart-price');
    const quantityElement = cartItem.querySelector('.cart-quantity');
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = quantityElement.value;
    total += price * quantity;
  });

  // Actualizar el total en la página
  const totalElement = document.querySelector('.total-price');
  totalElement.textContent = '$' + total;
}