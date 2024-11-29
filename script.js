// JavaScript Kodları

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".menu-link");
    const menuItems = document.querySelectorAll(".menu-item");
    const cartContainer = document.querySelector(".cart-container");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const viewCartButton = document.getElementById("view-cart");

    let cart = [];

    // Menü Linklerini Tıklama Olayı
    menuLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const category = event.target.dataset.category;

            menuItems.forEach(item => {
                if (item.dataset.category === category || category === "all") {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            cartContainer.classList.add("hidden");
        });
    });

    // Sepete Ekleme
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantity = parseInt(button.previousElementSibling.value);

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            alert(`${name} sepete eklendi.`);
        });
    });

    // Sepeti Görüntüleme
    viewCartButton.addEventListener("click", () => {
        cartContainer.classList.remove("hidden");

        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price} ₺</td>
                <td>${item.price * item.quantity} ₺</td>
                <td><button class="remove-item" data-name="${item.name}">Sil</button></td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Toplam: ${total} ₺`;

        // Ürün Silme
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.dataset.name;
                cart = cart.filter(item => item.name !== name);
                viewCartButton.click();
            });
        });
    });

    // Satın Alma
    document.getElementById("checkout").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Sepetiniz boş!");
        } else {
            alert("Satın alma işlemi tamamlandı!");
            cart = [];
            viewCartButton.click();
        }
    });
});
