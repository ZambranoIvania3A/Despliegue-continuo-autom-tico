const products = [
    { name: "Labial Mate", price: 8.00, image: "img/Labial-mate.jpg" },
    { name: "Base Líquida", price: 15.00, image: "img/Base-liquido.jpg" },
    { name: "Paleta de Sombras", price: 18.00, image: "img/Paleta de sobra.jpg" },
    { name: "Gel de Cejas", price: 6.00, image: "img/gel de cejas.jpg" },
    { name: "Set de Brochas", price: 20.00, image: "img/brochas.jpg" },
    { name: "Gloss Labial", price: 7.00, image: "img/gloss.jpg" }
];

let cart = [];

const productContainer = document.getElementById("product-list");
products.forEach((p, index) => {
    productContainer.innerHTML += `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button onclick="agregarProducto(${index})">Agregar al Carrito</button>
        </div>
    `;
});

function agregarProducto(index) {
    cart.push(products[index]);
    actualizarInterfaz();
}

function vaciarCarrito() {
    cart = [];
    const pp = document.getElementById("pp-button");
    if (pp) pp.innerHTML = "";
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const lista = document.getElementById("listaCarrito");
    const subtotalEl = document.getElementById("subtotal");
    const ivaEl = document.getElementById("iva");
    const totalEl = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
        subtotal += item.price;
        lista.innerHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });

    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    subtotalEl.textContent = subtotal.toFixed(2);
    ivaEl.textContent = iva.toFixed(2);
    totalEl.textContent = total.toFixed(2);
    if (contador) contador.textContent = cart.length;
}

function toggleCarrito() {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("active");
}

// INTEGRACIÓN PAYPHONE 
document.getElementById("payButton").addEventListener("click", () => {
    const subtotalVal = Number(document.getElementById("subtotal").textContent);
    const ivaVal = Number(document.getElementById("iva").textContent);
    const totalVal = Number(document.getElementById("total").textContent);

    if (!totalVal || totalVal <= 0) {
        alert("Agrega productos para pagar");
        return;
    }

const storeId = "2de59cc3-93f8-49d6-a3fd-d467ced314e0";
const token = "iGeBjqW1-YGkXcdSZnXer7oOcCt5zgdWtvbd4WsZL1GNAoqui814eJnMq-tc4Z-vzCArdEtAXA6g0eA4gmeYT-YyIPJAm4X7ImBMOVHdrYeHQPLqxSGItG5r6lGi0zLRpZMhNloDysu07ZFLgZObTIMP9ECwVYvkbY6eO1i82PH9vxjs_3-ln8z-OkQLHiY40bqbAIEIbHUmXF_oKX1p5Zvpg1QGWaJUxNtd0_navM6fMj9pueaL-qAo_lc3oep0XmTxiN1KYBisxk5VTbydBBG4G_a4vP_AVpz0BBM4A3-sSCKaVG1akC7cLrIfrvkByCPEcg";
    // Conversión a centavos
    const amountWithTax = Math.round(subtotalVal * 100);   // base gravada
    const tax = Math.round(ivaVal * 100);                  // IVA
    const amountWithoutTax = 0;                            // productos sin IVA
    const service = 0;
    const tip = 0;
    const amount = amountWithTax + amountWithoutTax + tax + service + tip; // total

    document.getElementById("pp-button").innerHTML = "";

    const payButton = new PPaymentButtonBox({
        token,
        amount,
        amountWithTax,
        amountWithoutTax,
        tax,
        service,
        tip,
        clientTransactionId: Date.now().toString(),
        storeId,
        reference: "Compra Beauty Manta",
        currency: "USD",
        email: "ivaniazs1999@gmail.com",
        userId: "0983069426",

        onConfirm: (response) => {
            alert("¡Pago exitoso! ID de transacción: " + response.transactionId);
            vaciarCarrito();
        },
        onCancel: () => {
            alert("Pago cancelado por el usuario");
        }
    });

    payButton.render("pp-button");
});

