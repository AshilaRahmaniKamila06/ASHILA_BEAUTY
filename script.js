const ashilaProducts = [
    {
        id: 1,
        name: "Dewy Hydration Serum",
        category: "Skincare",
        price: 129000,
        desc: "Serum ringan untuk membantu menjaga kelembapan kulit dan membuat wajah terasa segar.",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85",
        tag: "BEST SELLER"
    },
    {
        id: 2,
        name: "Daily Gentle Cleanser",
        category: "Skincare",
        price: 89000,
        desc: "Pembersih wajah lembut untuk rutinitas pagi dan malam.",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85",
        tag: "DAILY CARE"
    },
    {
        id: 3,
        name: "Soft Matte Lip Cream",
        category: "Makeup",
        price: 99000,
        desc: "Lip cream dengan warna lembut untuk melengkapi tampilan sehari-hari.",
        image: "https://images.unsplash.com/photo-1586942593568-293f4b8b7f3b?auto=format&fit=crop&w=800&q=85",
        tag: "NEW"
    },
    {
        id: 4,
        name: "Rosy Cheek Blush",
        category: "Makeup",
        price: 79000,
        desc: "Blush bernuansa rosy untuk tampilan segar dan natural.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85",
        tag: "FAVORITE"
    },
    {
        id: 5,
        name: "Silky Body Lotion",
        category: "Bodycare",
        price: 105000,
        desc: "Lotion harian dengan tekstur lembut untuk membantu menjaga kulit tetap terasa nyaman.",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85",
        tag: "SOFT SKIN"
    },
    {
        id: 6,
        name: "Daily Sun Protection",
        category: "Skincare",
        price: 119000,
        desc: "Pelindung kulit untuk melengkapi rutinitas pagi. Gunakan sesuai petunjuk produk.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85",
        tag: "ESSENTIAL"
    },
    {
        id: 7,
        name: "Nourishing Hand Cream",
        category: "Bodycare",
        price: 65000,
        desc: "Krim tangan praktis untuk menjaga tangan terasa lembut sepanjang hari.",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85",
        tag: "ON THE GO"
    },
    {
        id: 8,
        name: "Everyday Glow Palette",
        category: "Makeup",
        price: 149000,
        desc: "Palet warna netral untuk kreasi makeup natural maupun glam.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85",
        tag: "EDITOR PICK"
    }
];

const ashilaFormat = n =>
    "Rp" + n.toLocaleString("id-ID");


function ashilaCartCount() {
    let n = Number(localStorage.getItem("ashilaCart") || 0);

    document.querySelectorAll(".ashila_cart_count")
        .forEach(x => x.textContent = n);
}


function ashilaCard(p) {
    return `
        <article class="ashila_product_card">

            <a href="product-detail.html?id=${p.id}">

                <div class="ashila_product_image"
                    style="background-image:url('${p.image}')">

                    <span>${p.tag}</span>

                </div>

                <h3>${p.name}</h3>

            </a>

            <p>${p.category}</p>

            <div class="ashila_product_price">

                ${ashilaFormat(p.price)}

                <button class="ashila_add"
                    data-add="${p.id}">
                    + Add
                </button>

            </div>

        </article>
    `;
}


function ashilaRenderProducts() {

    const root = document.getElementById("ashila_products");

    if (!root) return;

    const search = (
        document.getElementById("ashila_search")?.value || ""
    ).toLowerCase();

    const active =
        document.querySelector(".ashila_filter.active")?.dataset.filter ||
        new URLSearchParams(location.search).get("category") ||
        "All";

    const list = ashilaProducts.filter(p =>
        (active === "All" || p.category === active) &&
        (
            p.name.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
        )
    );

    root.innerHTML = list.map(ashilaCard).join("");

    const empty = document.getElementById("ashila_empty");

    if (empty) {
        empty.hidden = list.length > 0;
    }

    root.querySelectorAll("[data-add]").forEach(b =>
        b.addEventListener("click", () =>
            ashilaAdd(Number(b.dataset.add))
        )
    );
}


function ashilaAdd(id) {

    let n = Number(localStorage.getItem("ashilaCart") || 0) + 1;

    localStorage.setItem("ashilaCart", n);

    ashilaCartCount();

    const p = ashilaProducts.find(x => x.id === id);

    alert(p.name + " ditambahkan ke bag (simulasi project).");
}


function ashilaRenderDetail() {

    const root = document.getElementById("ashila_detail");

    if (!root) return;

    const id = Number(
        new URLSearchParams(location.search).get("id") || 1
    );

    const p = ashilaProducts.find(x => x.id === id) || ashilaProducts[0];

    root.innerHTML = `

        <div class="ashila_detail_image"
            style="background-image:url('${p.image}')">
        </div>

        <div class="ashila_detail_copy">

            <p class="eyebrow">
                ${p.category} / ${p.tag}
            </p>

            <h1>${p.name}</h1>

            <h3>${ashilaFormat(p.price)}</h3>

            <p>${p.desc}</p>

            <p>
                Produk ini merupakan contoh katalog untuk demonstrasi
                website ASHILA BEAUTY. Periksa informasi dan kecocokan
                produk sebelum membeli produk kecantikan apa pun.
            </p>

            <button class="ashila_btn" id="ashila_detail_add">
                Add to bag ↗️
            </button>

        </div>
    `;

    document.getElementById("ashila_detail_add")
        .addEventListener("click", () => ashilaAdd(p.id));
}


document.addEventListener("DOMContentLoaded", () => {

    ashilaCartCount();

    const toggle = document.querySelector(".ashila_menu_toggle");

    toggle?.addEventListener("click", () =>
        document.querySelector(".ashila_menu")?.classList.toggle("open")
    );

    const featured = document.getElementById("ashila_featured");

    if (featured) {
        featured.innerHTML = ashilaProducts
            .slice(0, 4)
            .map(ashilaCard)
            .join("");
    }

    document.querySelectorAll("[data-add]").forEach(b =>
        b.addEventListener("click", () =>
            ashilaAdd(Number(b.dataset.add))
        )
    );

    document.querySelectorAll(".ashila_filter").forEach(b => {

        b.addEventListener("click", () => {

            document.querySelectorAll(".ashila_filter")
                .forEach(x => x.classList.remove("active"));

            b.classList.add("active");

            ashilaRenderProducts();

        });

    });

    document.getElementById("ashila_search")
        ?.addEventListener("input", ashilaRenderProducts);

    ashilaRenderProducts();

    ashilaRenderDetail();

    document.getElementById("ashila_contact_form")
        ?.addEventListener("submit", e => {

            e.preventDefault();

            document.getElementById("ashila_form_feedback")
                .textContent =
                "Terima kasih! Pesan berhasil divalidasi pada demo website. Form ini belum terhubung ke email/server.";

            e.target.reset();

        });

});