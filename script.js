// =========================
// CART
// =========================

let cart = [];


// زیادکردنی خواردن بۆ سەبەتە

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    showCart();
}


// =========================
// پیشاندانی سەبەتە
// =========================

function showCart() {

    const cartElement = document.getElementById("cart");

    cartElement.innerHTML = "";

    if (cart.length === 0) {

        cartElement.innerHTML = `
            <p class="empty">
                هێشتا هیچ خواردنێکت هەڵنەبژاردووە.
            </p>
        `;

        document.getElementById("total").textContent =
            "کۆی گشتی: $0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;


        cartElement.innerHTML += `

            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <br>
                    $${item.price} × ${item.quantity}
                </div>

                <div class="cart-buttons">

                    <button onclick="increaseItem(${index})">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="decreaseItem(${index})">
                        -
                    </button>

                </div>

            </div>

        `;

    });


    document.getElementById("total").textContent =
        `کۆی گشتی: $${total}`;
}


// =========================
// زیادکردنی ژمارە
// =========================

function increaseItem(index) {

    cart[index].quantity++;

    showCart();
}


// =========================
// کەمکردنەوەی ژمارە
// =========================

function decreaseItem(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    showCart();
}


// =========================
// ناردنی داواکاری
// =========================

document.getElementById("orderForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ئەگەر سەبەتە بەتاڵ بێت

        if (cart.length === 0) {

            alert("تکایە سەرەتا خواردنێک هەڵبژێرە.");

            return;
        }


        // زانیاری کڕیار

        const name =
            document.getElementById("customerName").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;


        // دروستکردنی لیستی خواردنەکان

        let orderText = "";

        let total = 0;


        cart.forEach(item => {

            let itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            orderText +=
                `🍽️ ${item.name} × ${item.quantity} = $${itemTotal}%0A`;

        });


        // ژمارەی WhatsApp ـی خاوەن کار

        const restaurantNumber = "7501190620";


        // نامەی WhatsApp

        const message =
            `🛒 داواکاری نوێ%0A%0A` +

            `👤 ناو: ${name}%0A` +

            `📞 ژمارە: ${phone}%0A%0A` +

            `🍽️ خواردن:%0A` +

            `${orderText}%0A` +

            `💰 کۆی گشتی: $${total}%0A%0A` +

            `📍 ناونیشان:%0A${address}`;


        // کردنەوەی WhatsApp

        const whatsappURL =
            `https://wa.me/${restaurantNumber}?text=${message}`;


        window.open(whatsappURL, "_blank");

    }
);