const sampleCart = [
    {
        product: {
            productId: "123456",
            name: "Apple iphone 14 pro",
            image: "https://m.media-amazon.com/images/I61jLkinn",
            price: 165000,
            labelledPrice: 175000
        },
        qty: 2
    },
    {
        product: {
            productId: "224466",
            name: "Apple Iphone 15",
            image: "https://m.media-amazon.com/images/I61jLkinn",
            price: 187000,
            labelledPrice: 197000
        },
        qty: 1
    }
];


export function getCart() {
    const cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        return [];
    }

    const cart = JSON.parse(cartString);
    return cart;
}


export function addToCart(product, qty) {
    const cart = getCart();

    const existingProductIndex = cart.findIndex(
        (item) => {
            return item.product.productId == product.productId;
        }
    );

    // Product doesn't exist in cart
    if (existingProductIndex == -1 && qty > 0) {
        cart.push({
            product: {
                productId: product.productId,
                name: product.name,
                image: product.images[0],
                price: product.price,
                labelledPrice: product.labelledprice
            },
            qty: qty
        });
    }

    // Product already exists in cart
    else if (existingProductIndex != -1) {
        cart[existingProductIndex].qty += qty;

        // Remove product if quantity becomes 0 or less
        if (cart[existingProductIndex].qty < 1) {
            cart.splice(existingProductIndex, 1);
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}


export function getTotal() {
    const cart = getCart();

    let total = 0;

    cart.forEach((item) => {
        total += item.product.price * item.qty;
    });

    return total;
}