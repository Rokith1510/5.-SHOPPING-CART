// ======================================================
// COLORCART STATIONERY STORE
// ======================================================


// ================= PRODUCTS =================

const products = [

    {
        id: 1,
        name: "Classic Ball Pen",
        category: "writing",
        price: 10,
        icon: "🖊️",
        description: "Smooth blue ink ball pen"
    },

    {
        id: 2,
        name: "Premium Gel Pen",
        category: "writing",
        price: 25,
        icon: "🖋️",
        description: "Smooth quick-dry gel ink"
    },

    {
        id: 3,
        name: "HB Pencil",
        category: "writing",
        price: 8,
        icon: "✏️",
        description: "High quality HB graphite pencil"
    },

    {
        id: 4,
        name: "Premium Eraser",
        category: "writing",
        price: 12,
        icon: "◻️",
        description: "Soft dust-free eraser"
    },

    {
        id: 5,
        name: "Pencil Sharpener",
        category: "writing",
        price: 15,
        icon: "🔺",
        description: "Compact double-hole sharpener"
    },

    {
        id: 6,
        name: "A5 Notebook",
        category: "paper",
        price: 75,
        icon: "📓",
        description: "200 pages ruled notebook"
    },

    {
        id: 7,
        name: "Spiral Notebook",
        category: "paper",
        price: 120,
        icon: "📒",
        description: "Premium spiral-bound notebook"
    },

    {
        id: 8,
        name: "Geometry Box",
        category: "school",
        price: 150,
        icon: "📐",
        description: "Complete geometry instrument set"
    },

    {
        id: 9,
        name: "30cm Ruler",
        category: "school",
        price: 20,
        icon: "📏",
        description: "Transparent 30cm ruler"
    },

    {
        id: 10,
        name: "Highlighter Set",
        category: "office",
        price: 90,
        icon: "🖍️",
        description: "Set of 4 colorful highlighters"
    },

    {
        id: 11,
        name: "Sticky Notes",
        category: "office",
        price: 50,
        icon: "🗒️",
        description: "Colorful 100-sheet sticky notes"
    },

    {
        id: 12,
        name: "Glue Stick",
        category: "office",
        price: 35,
        icon: "🧴",
        description: "Strong and clean glue stick"
    }

];


// ================= CART =================

let cart = [];

let selectedPayment = "upi";

let currentOrder = null;


// ================= DISPLAY PRODUCTS =================

function displayProducts(list = products) {

    const grid =
        document.getElementById("productGrid");

    grid.innerHTML = "";

    document.getElementById("productCount").textContent =
        `${list.length} products`;


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})">

                        +

                    </button>

                </div>

            </div>
        `;


        grid.appendChild(card);

    });

}


// ================= FILTER =================

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;

    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);

}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();


    // Small notification

    alert(
        `${product.name} added to cart!`
    );

}


// ================= UPDATE CART =================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    renderCart();

}


// ================= RENDER CART =================

function renderCart() {

    const container =
        document.getElementById("cartItems");

    const empty =
        document.getElementById("emptyCart");

    const summary =
        document.getElementById("cartSummary");


    container.innerHTML = "";


    if (cart.length === 0) {

        empty.style.display = "block";

        summary.style.display = "none";

        return;

    }


    empty.style.display = "none";

    summary.style.display = "block";


    cart.forEach(item => {

        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-icon">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toFixed(2)}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)">

                    −

                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button
                    onclick="changeQuantity(${item.id}, 1)">

                    +

                </button>

            </div>


            <strong>
                ₹${(
                    item.price *
                    item.quantity
                ).toFixed(2)}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">

                🗑️

            </button>
        `;


        container.appendChild(div);

    });


    updateTotals();

}


// ================= QUANTITY =================

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );

    }


    updateCart();

}


// ================= REMOVE =================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    updateCart();

}


// ================= TOTALS =================

function calculateTotals() {

    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    // Free delivery above ₹500

    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 500
                ? 0
                : 40;


    return {

        subtotal,
        delivery,
        total: subtotal + delivery

    };

}


// ================= UPDATE TOTALS =================

function updateTotals() {

    const totals =
        calculateTotals();


    document.getElementById(
        "subtotal"
    ).textContent =
        `₹${totals.subtotal.toFixed(2)}`;


    document.getElementById(
        "delivery"
    ).textContent =
        totals.delivery === 0
            ? "FREE"
            : `₹${totals.delivery.toFixed(2)}`;


    document.getElementById(
        "total"
    ).textContent =
        `₹${totals.total.toFixed(2)}`;

}


// ================= OPEN CART =================

function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "block";


    updateCart();

}


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";

}


// ================= CHECKOUT =================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    closeCart();


    document.querySelector("header").style.display =
        "none";


    document.querySelector(".hero").style.display =
        "none";


    document.querySelector(".categories").style.display =
        "none";


    document.querySelector("main").style.display =
        "none";


    document.querySelector("footer").style.display =
        "none";


    document.getElementById(
        "checkoutPage"
    ).style.display = "block";


    renderCheckout();

}


// ================= CHECKOUT ITEMS =================

function renderCheckout() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    container.innerHTML = "";


    cart.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "order-item";


        div.innerHTML = `

            <span>
                ${item.name}
                × ${item.quantity}
            </span>

            <strong>
                ₹${(
                    item.price *
                    item.quantity
                ).toFixed(2)}
            </strong>

        `;


        container.appendChild(div);

    });


    const totals =
        calculateTotals();


    document.getElementById(
        "checkoutSubtotal"
    ).textContent =
        `₹${totals.subtotal.toFixed(2)}`;


    document.getElementById(
        "checkoutDelivery"
    ).textContent =
        totals.delivery === 0
            ? "FREE"
            : `₹${totals.delivery.toFixed(2)}`;


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        `₹${totals.total.toFixed(2)}`;

}


// ================= BACK TO CART =================

function backToCart() {

    document.getElementById(
        "checkoutPage"
    ).style.display = "none";


    document.querySelector("header").style.display =
        "flex";


    document.querySelector(".hero").style.display =
        "flex";


    document.querySelector(".categories").style.display =
        "flex";


    document.querySelector("main").style.display =
        "block";


    document.querySelector("footer").style.display =
        "block";


    openCart();

}


// ================= PAYMENT SELECTION =================

function selectPayment(method, button) {

    selectedPayment = method;


    const buttons =
        document.querySelectorAll(
            ".payment-option"
        );


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    const forms = [

        "upiPayment",
        "cardPayment",
        "netbankingPayment",
        "walletPayment",
        "codPayment"

    ];


    forms.forEach(id => {

        document.getElementById(
            id
        ).classList.add("hidden");

    });


    const selectedForm =
        document.getElementById(
            method + "Payment"
        );


    selectedForm.classList.remove(
        "hidden"
    );

}


// ================= VALIDATE CUSTOMER =================

function validateCustomer() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const email =
        document.getElementById(
            "customerEmail"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    if (!name) {

        alert("Please enter your name.");

        return false;

    }


    if (!email ||
        !email.includes("@")) {

        alert(
            "Please enter a valid email."
        );

        return false;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return false;

    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return false;

    }


    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        return false;

    }


    return true;

}


// ================= VALIDATE PAYMENT =================

function validatePayment() {

    if (selectedPayment === "cod") {

        return true;

    }


    if (selectedPayment === "upi") {

        const upi =
            document.getElementById(
                "upiId"
            ).value.trim();


        if (!upi || !upi.includes("@")) {

            alert(
                "Please enter a valid UPI ID."
            );

            return false;

        }

    }


    if (selectedPayment === "card") {

        const card =
            document.getElementById(
                "cardNumber"
            ).value.trim();


        const expiry =
            document.getElementById(
                "expiry"
            ).value.trim();


        const cvv =
            document.getElementById(
                "cvv"
            ).value.trim();


        const name =
            document.getElementById(
                "cardName"
            ).value.trim();


        if (
            card.length < 12 ||
            !expiry ||
            cvv.length !== 3 ||
            !name
        ) {

            alert(
                "Please enter complete card details."
            );

            return false;

        }

    }


    if (
        selectedPayment ===
        "netbanking"
    ) {

        const bank =
            document.getElementById(
                "bank"
            ).value;


        if (!bank) {

            alert(
                "Please select your bank."
            );

            return false;

        }

    }


    if (
        selectedPayment ===
        "wallet"
    ) {

        const wallet =
            document.getElementById(
                "wallet"
            ).value;


        if (!wallet) {

            alert(
                "Please select a wallet."
            );

            return false;

        }

    }


    return true;

}


// ================= PLACE ORDER =================

function placeOrder() {

    if (!validateCustomer()) {

        return;

    }


    if (!validatePayment()) {

        return;

    }


    const totals =
        calculateTotals();


    const orderId =
        "CC" +
        Date.now()
            .toString()
            .slice(-8);


    let paymentName = "";


    switch (selectedPayment) {

        case "upi":
            paymentName = "UPI";
            break;

        case "card":
            paymentName =
                "Credit / Debit Card";
            break;

        case "netbanking":
            paymentName =
                "Net Banking";
            break;

        case "wallet":
            paymentName =
                "Digital Wallet";
            break;

        case "cod":
            paymentName =
                "Cash on Delivery";
            break;

    }


    currentOrder = {

        orderId,

        date:
            new Date().toLocaleString(
                "en-IN"
            ),

        customer: {

            name:
                document.getElementById(
                    "customerName"
                ).value.trim(),

            email:
                document.getElementById(
                    "customerEmail"
                ).value.trim(),

            phone:
                document.getElementById(
                    "customerPhone"
                ).value.trim(),

            pincode:
                document.getElementById(
                    "pincode"
                ).value.trim(),

            address:
                document.getElementById(
                    "address"
                ).value.trim()

        },

        items:
            [...cart],

        subtotal:
            totals.subtotal,

        delivery:
            totals.delivery,

        total:
            totals.total,

        payment:
            paymentName

    };


    // Hide checkout

    document.getElementById(
        "checkoutPage"
    ).style.display = "none";


    // Show success

    document.getElementById(
        "successPage"
    ).style.display = "flex";


    document.getElementById(
        "orderId"
    ).textContent =
        orderId;


    document.getElementById(
        "successPayment"
    ).textContent =
        paymentName;


    document.getElementById(
        "successTotal"
    ).textContent =
        `₹${totals.total.toFixed(2)}`;

}


// ================= DOWNLOAD PDF =================

function downloadReceipt() {

    if (!currentOrder) {

        return;

    }


    const {
        jsPDF
    } = window.jspdf;


    const doc =
        new jsPDF();


    const order =
        currentOrder;


    // Header

    doc.setFontSize(24);

    doc.setFont(undefined, "bold");

    doc.text(
        "COLORCART",
        20,
        25
    );


    doc.setFontSize(11);

    doc.setFont(undefined, "normal");

    doc.text(
        "Modern Stationery Store",
        20,
        32
    );


    doc.text(
        `Order ID: ${order.orderId}`,
        140,
        25
    );


    doc.text(
        `Date: ${order.date}`,
        140,
        32
    );


    // Line

    doc.line(
        20,
        40,
        190,
        40
    );


    // Customer

    doc.setFontSize(14);

    doc.setFont(undefined, "bold");

    doc.text(
        "CUSTOMER DETAILS",
        20,
        52
    );


    doc.setFontSize(10);

    doc.setFont(undefined, "normal");

    doc.text(
        `Name: ${order.customer.name}`,
        20,
        61
    );


    doc.text(
        `Email: ${order.customer.email}`,
        20,
        68
    );


    doc.text(
        `Phone: ${order.customer.phone}`,
        20,
        75
    );


    doc.text(
        `Address: ${order.customer.address}`,
        20,
        82
    );


    doc.text(
        `Pincode: ${order.customer.pincode}`,
        20,
        89
    );


    // Products

    doc.setFontSize(14);

    doc.setFont(undefined, "bold");

    doc.text(
        "ORDER DETAILS",
        20,
        103
    );


    let y = 113;


    doc.setFontSize(10);

    doc.setFont(undefined, "bold");

    doc.text(
        "Item",
        20,
        y
    );

    doc.text(
        "Qty",
        125,
        y
    );

    doc.text(
        "Price",
        150,
        y
    );

    doc.text(
        "Total",
        175,
        y
    );


    y += 7;


    doc.setFont(undefined, "normal");


    order.items.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        doc.text(
            item.name,
            20,
            y
        );


        doc.text(
            String(item.quantity),
            127,
            y
        );


        doc.text(
            `Rs. ${item.price.toFixed(2)}`,
            145,
            y
        );


        doc.text(
            `Rs. ${itemTotal.toFixed(2)}`,
            172,
            y
        );


        y += 8;


        // New page if needed

        if (y > 260) {

            doc.addPage();

            y = 20;

        }

    });


    // Totals

    y += 8;

    doc.line(
        120,
        y,
        190,
        y
    );


    y += 10;


    doc.text(
        "Subtotal:",
        135,
        y
    );


    doc.text(
        `Rs. ${order.subtotal.toFixed(2)}`,
        175,
        y
    );


    y += 8;


    doc.text(
        "Delivery:",
        135,
        y
    );


    doc.text(
        order.delivery === 0
            ? "FREE"
            : `Rs. ${order.delivery.toFixed(2)}`,
        175,
        y
    );


    y += 10;


    doc.setFontSize(13);

    doc.setFont(undefined, "bold");


    doc.text(
        "TOTAL:",
        135,
        y
    );


    doc.text(
        `Rs. ${order.total.toFixed(2)}`,
        175,
        y
    );


    y += 12;


    doc.setFontSize(10);

    doc.setFont(undefined, "normal");


    doc.text(
        `Payment Method: ${order.payment}`,
        20,
        y
    );


    y += 15;


    doc.setFontSize(11);

    doc.text(
        "Thank you for shopping with ColorCart!",
        20,
        y
    );


    doc.setFontSize(9);

    doc.text(
        "This is a computer-generated invoice.",
        20,
        y + 8
    );


    // Save PDF

    doc.save(
        `${order.orderId}_Invoice.pdf`
    );

}


// ================= CONTINUE SHOPPING =================

function continueShopping() {

    currentOrder = null;

    cart = [];


    updateCart();


    document.getElementById(
        "successPage"
    ).style.display = "none";


    document.querySelector("header").style.display =
        "flex";


    document.querySelector(".hero").style.display =
        "flex";


    document.querySelector(".categories").style.display =
        "flex";


    document.querySelector("main").style.display =
        "block";


    document.querySelector("footer").style.display =
        "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ================= CLOSE MODAL ON OUTSIDE CLICK =================

window.onclick = function(event) {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (event.target === modal) {

        closeCart();

    }

};


// ================= INITIALIZE =================

displayProducts();

updateCart();