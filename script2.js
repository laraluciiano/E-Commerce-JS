const cartBtn = document.querySelector("cart-icon");
//const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".header-cart");
//const barsMenu = document.querySelector(".navbar-list");
const successModal = document.querySelector(".add-modal");
const cartBubble = document.querySelector(".cart-bubble");

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

//Variable para obtener el producto del localstorage
let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

//Función para guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// creamos funcion toggleMenu y toggleCart para mostrar y ocultar los menus
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
      cartMenu.classList.remove("open-cart");
      return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
    }
    overlay.classList.toggle("show-overlay");
  };
  
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
    }
    overlay.classList.toggle("show-overlay");
};

//Funcion para renderizar un producto en el carrito
const renderCartProduct = (cartProduct) => {
    const { title, img, price } = cartProduct;
    return `
    <img src="${img}" alt="" class="cart-img">
    <div class="detail.box">
       <div class="cart-product-title">${title}</div>
       <div class="cart-price">${price}</div>
       <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove cart-->
    <i class="fa-regular fa-trash-can cart-remove"></i>`;
  };


  // si el carrito está vacio mostramos el mensaje de carrito vacio
// si hay productos en el carrito, lo renderiza
  const renderCart = () => {
    if (cart.length === 0) {
      productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    } else {
      productsCart.innerHTML = cart.map(renderCartProduct).join("");
    }
  };

  // si el carrito está vacio desactivar botones de comprar y eliminar
// si hay productos en el carrito activar botones de comprar y eliminar
const buyBtn = document.querySelector(".btn-buy");

const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };

  //Función para obtener el precio total de compra
const getCartTotal = () =>
cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);

//Función para renderizar el precio total de compra
//Usamos toFixed para que el precio total tenga solo 2 decimales.
const showTotal = () => {
total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};

// funcion para añadir un producto del fetchData al carrito
// al hacer click en el "btn-add" se añade el producto al carrito

const deleteBtn = document.querySelector(".btn-delete");

const addProduct = (e) => {
    if (!e.target.classList.contains("add")) return;
    const productToAdd = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      bid: e.target.dataset.bid,
      img: e.target.dataset.img,
      quantity: 1,
    };
    const productInCart = cart.find((product) => product.id === productToAdd.id);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.push(productToAdd);
    }
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    showSuccessModal("Producto añadido al carrito");
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    showCartBubble();
  }
  
  // funcion para comprar productos del carrito
// escuchar el evento click en el boton de comprar
// al hacer click en comprar lanzar una alerta con el precio total de compra
// una vez comprado, vaciar el carrito y resetear todo
const buyCart = () => {
    if (!cart.length) return;
    alert(`Has comprado ${getCartTotal()} ETH`);
    cart = [];
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    showSuccessModal("Compra realizada");
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    showCartBubble();
  };

  // creamos la funcion encargada de inizializar todo
const initCart = () => {
    cartBtn.addEventListener("click", toggleCart);
    barsBtn.addEventListener("click", toggleMenu);
    document.addEventListener("click", addProduct);
    document.addEventListener("click", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    deleteBtn.addEventListener("click", deleteCart);
    document.addEventListener("click", changeQuantity);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartBubble);
    buyBtn.addEventListener("click", buyCart);
    // mostrar botones desactivados
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

initCart();