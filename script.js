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
    let cart = document.querySelector('.cart')
    let closeCart = document.querySelector('#close-cart')
    
    cartIcon.onclick = () => {
        cart.classList.add("active");
    }
    
    //Cerrar carrito
    closeCart.onclick = () => {
        cart.classList.remove("active");
    }
    
    //cart working js
    if(document.readyState == 'loading'){
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready ();
    }
    
    
    //FUNCIONES
    
    function ready(){
        //Quitar items del carrito
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
    
    
    //Cambios en cantidad
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i< quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //Agregar al carrito
    var addCart = document.getElementsByClassName('fa-cart-shopping');
    for (var i = 0; i< addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }
    //Hacer que el boton funcione
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
    }
    
    //Boton de compra
    function buyButtonClicked(){
        alert('Tu compra esta')
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }
    
    //Quitar items del carrito
    function removeCartItem (event){
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateTotal();
    }
    
    //Cantidad cambiada
    function quantityChanged(event){
        var input = event.target
        if (isNaN(input.value) || input.value <=0) {
            input.value = 1
        }
        updateTotal();
    }
    
    //Añadir al carrito
    function addCartClicked(event){
        var button = event.target
        var shopProducts = button.parentElement
        var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
        var price = shopProducts.getElementsByClassName("price")[0].innerText;
        let productImg = shopProducts.getElementsByClassName("product-image")[0].src;
        addProductToCart(title,price, productImg);
        updateTotal();
    }
    function addProductToCart(title, price, productImg){
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems = document.getElementsByClassName("cart-content")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i = 0; i< cartItemsNames.length; i++){
            alert('Ya has añadido este articulo al carrito');
            return;
    }
    }
    
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail.box">
                           <div class="cart-product-title">${title}</div>
                           <div class="cart-price">${price}</div>
                           <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remove cart-->
                        <i class="fa-regular fa-trash-can cart-remove"></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener("click", removeCartItem);
    cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener("change", quantityChanged);
    
    //Actualizar total
    function updateTotal(){
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var total = 0;
        for (var i = 0; i< cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('cart-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace('$', ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
            document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    }