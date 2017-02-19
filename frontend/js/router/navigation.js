let allMenuItems = {
    main: {
        "uri": "/", "icon": "home", "name": "Главная"
    },
    store: {
        "uri": "/store", "icon": "star", "name": "Магазин"
    },
    contacts: {
        "uri": "/addProduct", "icon": "info", "name": "Контакты"
    },
    payment: {
        "uri": "/", "icon": "credit-card", "name": "Оплата и доставка"
    },
    feedback: {
        "uri": "/", "icon": "happy", "name": "Отзывы"
    },
    cart: {
        "uri": "/", "icon": "cart", "name": "Корзина"
    }
};

export default {
    main: [
        allMenuItems.main,
        allMenuItems.store,
        allMenuItems.contacts,
        allMenuItems.payment,
        allMenuItems.feedback,
        allMenuItems.cart
    ],
    footer: [
        allMenuItems.contacts,
        allMenuItems.payment,
        allMenuItems.feedback
    ]
};