document.addEventListener("DOMContentLoaded", function() {
    const template = document.getElementById("produto-template");
    const container = document.getElementById("smoothie-container");

    fetch('http://localhost:8080/api/Produtos/')
        .then(response => response.json())
        .then(data => {
            const produtos = document.getElementById('produtosList');
            data.forEach(produto => {
                const clone = document.importNode(template.content, true);

                // Preenche os dados do produto no clone
                clone.querySelector(".product-link").href = "product-details.html?id=" + produto.id;
                clone.querySelector(".smoothie-img").src = produto.img;
                clone.querySelector(".product-name").textContent = produto.nomeProduto;
                clone.querySelector(".product-description").textContent = produto.descricaoProduto;
                clone.querySelector(".product-price").textContent = produto.valorProduto.toFixed(2);
        
                const addToCartButton = clone.querySelector(".add-to-cart");
                addToCartButton.onclick = function() {
                    addToCart(this, produto.id);
                };

                // Adiciona o item clonado ao container principal
                container.appendChild(clone);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Aqui você pode adicionar uma lógica para informar o usuário que ocorreu um erro
        })
    });

// Função de exemplo para adicionar ao carrinho
function addToCart(button, productId) {
    addToCart(this,productId)
}