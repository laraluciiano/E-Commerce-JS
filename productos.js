const productosList = [
    {
        id: "zapatillas-01",
        titulo: "ZAPATILLAS FORUM LOW VEGAN",
        imagen: "./img/zapatillas/zapa 1.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 32100,
    },
    {
        id: "zapatillas-02",
        titulo: "ZAPATILLAS OZNOVA",
        imagen: "./img/zapatillas/zapa 2.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 40000,
    },
    {
        id: "zapatillas-03",
        titulo: "ZAPATILLAS FORUM BOLD",
        imagen: "./img/zapatillas/zapa 3.jpg",
        categoria: {
            nombre: "zapatillas",
            id: "zapatillas"
        },
        precio: 37600,
    },
    {
        id: "zapatillas-04",
        titulo: "ZAPATILLAS OZELIA",
        imagen: "./img/zapatillas/zapa 4.jpg",
        categoria: {
            nombre: "zapatillas",
            id: "zapatillas"
        },
        precio: 25999,
    },
    {
        id: "zapatillas-05",
        titulo: "Zapatillas ZX 22 BOOST",
        imagen: "./img/zapatillas/zapa 5.jpg",
        categoria: {
            nombre: "zapatillas",
            id: "zapatillas"
        },
        precio: 30500,
    },
    {
        id: "zapatillas-06",
        titulo: "Zapatillas ZX 22 BOOST",
        imagen: "./img/zapatillas/zapa 6.jpg",
        categoria: {
            nombre: "zapatillas",
            id: "zapatillas"
        },
        precio: 30500,
    },
    {
        id: "camisa-01",
        titulo: "CAMISA CLIMAX [ PRINT J8 ]",
        imagen: "./img/camisas/camisa 1.jpg",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 11500,
    },
    {
        id: "camisa-02",
        titulo: "CAMISA THE GANG [ NEGRO ]",
        imagen: "./img/camisas/camisa 2.jpg",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 12000,
    },
    {
        id: "camisa-03",
        titulo: "CAMISA CLIMAX [ PRINT J19 ]",
        imagen: "./img/camisas/camisa 3.jpg",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 10660,
    },
    {
        id: "camisa-04",
        titulo: "CAMISA CLIMAX [ PRINT J20 ]",
        imagen: "./img/camisas/camisa 4.jpg",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 10660,
    },
    {
        id: "camisa-05",
        titulo: "CAMISA AFRO [ OLIVA ]",
        imagen: "./img/camisas/camisa 5.jpg",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 17000,
    },
    {
        id: "remera-01",
        titulo: "REMERA META ART GALLERY FABA 04 [ BLANCO ]",
        imagen: "./img/remeras/remera 1.jpg",
        categoria: {
            nombre: "remeras",
            id: "remeras"
        },
        precio: 8200,
    },
    {
        id: "remera-02",
        titulo: "REMERA META ART GALLERY FABA 02 [ BLANCO ]",
        imagen: "./img/remeras/remera 2.jpg",
        categoria: {
            nombre: "remeras",
            id: "remeras"
        },
        precio: 17000,
    },
]

// RENDERIZAR PRODUCTOS
const cardTemplate = (productos) => {
    return `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <div class="details__product-quantity">
        <div class="input">
          <img class="input__minus" src="./images/icon-minus.svg" alt="minus" data-id=${id}>
          <input class="input__number" type="text" value="0">${quantity}
          <img class="input__plus" src="./images/icon-plus.svg" alt="plus" data-id=${id}>
        </div>
        </div>
        </div>
    `;
  };
  const productosTodos = productosList.map(cardTemplate);