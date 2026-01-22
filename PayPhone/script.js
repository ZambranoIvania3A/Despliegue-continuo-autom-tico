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

const storeId = "bwIQRyykLUunE09RbMftw";
const token = "Gn5YG2pfiMOwxcY-l58PQqLaqi_J82as0-MrVhjhn2WjA8XTEULcV_KpHp5bZLi5RL-dYT3vgP75GfhG4pEoFxG7tqzsTM097OEfomyKO-pKmwvklVeGvVl8yQnTZlZl0e2Wvbb8XYglh1JLYeR2n1NOZbSS6A8tjJSrZK0kUdVnBzIgcnRYWwwRtXp7hlH-UjzUH70syji-4ePx_2u8n4DxxmKqG1m3t-PRDvSrUFmqoQNhxDLFojxTXaa4R6doUxqYmtgC8VPwAXgDGES2G3Q0a3bG6X3aH4wjzA95XdTBgXUJcqLBOZUKSqrh2gqsezSTRVEa-BW4y3_fCLROCMSAE7o#";
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

