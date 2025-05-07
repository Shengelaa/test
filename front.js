fetch("http://localhost:5000/posts")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".mainDiv");

    function displayProducts(products) {
      container.innerHTML = ""; // Clear current products
      products.forEach((product) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.className = "containerImg";
        img.src = product.image;
        div.className = "containerDiv";
        const p = document.createElement("p");
        p.textContent = `${product.name} - $${product.price}`;
        p.className = "containerP";
        div.appendChild(p);
        div.appendChild(img);
        container.appendChild(div);
      });
    }

    // Initial render
    displayProducts(data);

    const allProduct = document.querySelector(".all");

    allProduct.addEventListener("click", () => {
      const filtered = data;
      displayProducts(filtered);
    });

    const laptops = document.querySelector(".laptops");
    laptops.addEventListener("click", () => {
      const filtered = data.filter((p) => p.category === "Laptop");
      displayProducts(filtered);
    });

    // Filter phones on click
    const phones = document.querySelector(".phones");
    if (phones) {
      phones.addEventListener("click", () => {
        const filtered = data.filter((p) => p.category === "Phone");
        displayProducts(filtered);
      });
    } else {
      console.warn("No element with class 'phones' found.");
    }
  })
  .catch((err) => {
    console.error("Fetch error:", err);
  });
