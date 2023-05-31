// Contenedor de productos
const products = document.querySelector(".products-container");
// El contenedor de las categorías
const categories = document.querySelector(".filter-btns");
// Un htmlCollection de botones de todas las categorías (mostrar el dataset)
const allFilterItems = document.querySelectorAll(".products");
const allFilterBtns = document.querySelectorAll(".filter-btn-singular");
// Botón para abrir y cerrar menú (hamburguesa)
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
// Botón para abrir y cerrar carrito
const cartIcon = document.querySelector('#cart-icon')
const cartMenu = document.querySelector('.cart')
const closeCart = document.querySelector('#close-cart')
// Carrito y Botón de comprar
const addBtn = document.querySelector(".add");
const buyBtn = document.querySelector(".btn-buy")
const emptyBtn = document.querySelector(".btn-empty")
// Contenedor de productos del carrito
const productsCart = document.querySelector(".cart-content");
//El total en precio del carrito
const totalPrice = document.querySelector(".total-price");
//  Modal de agregado al carrito.
const deleteBtn = document.querySelector(".btn-delete");



//GUARDAR EN EL LOCALSTORAGE
let cart = JSON.parse (localStorage.getItem("cart")) || [];
const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
};

//ABRIR Y CERRAR MENU
if (bar) {
bar.addEventListener('click', () => {
nav.classList.add('active');
})
}
    
if (close) {
close.addEventListener('click', () => {
nav.classList.remove('active');
})
} 

//ABRIR Y CERRAR CARRITO
cartIcon.onclick = () => {
    cartMenu.classList.add("active");
}
closeCart.onclick = () => {
    cartMenu.classList.remove("active");
}

//CERRAR AL SCROLLEAR
const closeOnScroll = () =>{
    if (!nav.classList.contains("active") && !cartMenu.classList.contains("active")) {
        return
    }
    nav.classList.remove("active")
    cartMenu.classList.remove("active")
}

//FILTRAR PRODUCTOS
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

//RENDERIZAR PRODUCTOS
const renderProduct = (product) => {
    const { id, name, price, cardImg } = product;
    return `
    <div class="products todo zapatillas"> 
        <img src="${cardImg}" alt="zapatillas nike" class="product-image">
        <div class="product-description">
            <span>nike</span>
            <h5 class="product-title">${name}</h5>
            <h4 class="price">$${price}</h4>
        </div>
        <i class="fa-solid fa-cart-shopping add-cart" id="add" data-id="${id}" data-name="${name}" data-price="${price}" data-img="${cardImg}"></i>
    </div>
    `;
}

//RENDERIZAR PRODUCTOS AL CARRITO
const renderCartProduct = (cartProduct) => {
    const {id, name, price, img, quantity} = cartProduct;
    return `
        <img src="${img}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${name}</div>
            <div class="cart-price">${price}</div>
            <div class="details__product-quantity">
                <div class="input">
                    <img class="input__minus" src="./images/icon-minus.svg" alt="minus" data-id=${id}>
                    <input class="input__number" type="text" value="${quantity}">
                    <img class="input__plus" src="./images/icon-plus.svg" alt="plus" data-id=${id}>
                </div>
            </div>
        </div>
    `;  
}


const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML= `<p class="empty-msg"> No hay productos en el carrito.</p>`
        return
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("")
}

const getCartTotal = () => {
    return cart.reduce((acc, cur) => {
      return acc + parseFloat(cur.price) * cur.quantity;
    }, 0);
  };

const showTotal = () => {
    totalPrice.textContent = `$${getCartTotal().toFixed(2)}`;
  };

//DESHABILITAR BOTONES
const disableBtn = (btn) =>{
    if (!cart.length) {
        btn.classList.add("disabled")
    } else {
        btn.classList.remove("disabled")
    }
}

//CHEQUEO Y ACTUALIZACION DEL CARRO
const checkCartState = () =>{
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    disableBtn(buyBtn);
    disableBtn(emptyBtn);
};

//AÑADIR AL CARRITO
const addProduct = (e) => {
    if (!e.target.classList.contains("fa-cart-shopping")) {
      return;
    }
  
    const {id, name, price, img} = e.target.dataset

    const product = productData(id, name, price, img);

    if (isExistingCartProduct(product)){
        addUnitToProduct(product)
        alert("Se agregó una unidad del producto al carrito")
    } else {
        createCartProduct(product)
        alert("El producto se ha agregado al carrito")
    }

    checkCartState();
};

const productData = (id,name,price,img) =>{
    return { id, name, price, img };
};

const isExistingCartProduct = (product) => {
    return cart.find( (item) =>{
        return item.id === product.id
    });
};

const addUnitToProduct = (product) =>{
    cart = cart.map( (cartProduct) => {
        return cartProduct.id === product.id ? {...cartProduct, quantity: cartProduct.quantity +1} : cartProduct
    });
};

const createCartProduct = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        },
    ];
};

//MANEJO DE BOTONES MAS Y MENOS (cantidades)
//Disminuir cantidad
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => {
        return item.id === id
    })

    if(existingCartProduct.quantity === 1){
        if (window.confirm("¿Desea eliminar el producto del carrito?")){
            removeProductFromCart(existingCartProduct)
        }
        return;
    }
    substractProductUnit(existingCartProduct)
}

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    checkCartState();
};

const substractProductUnit = (existingProduct) => {
    cart = cart.map ((product) => {
        return product.id === existingProduct.id ? {...product, quantity: Number(product.quantity) -1} : product;
    })
}

//Sumar cantidad
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => {
        return item.id === id
    })
    addUnitToProduct(existingCartProduct)
}

const handleQuantity = (e) => {
    if (e.target.classList.contains("input__minus")) {
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains("input__plus")){
        handlePlusBtnEvent(e.target.dataset.id)
    }
    checkCartState();
}



const init = () => {
    window.addEventListener("scroll",closeOnScroll);
    document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showTotal);
    products.addEventListener("click", addProduct);
    productsCart.addEventListener("click",handleQuantity);
    disableBtn(buyBtn);
    disableBtn(emptyBtn);
}

init();
