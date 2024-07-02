document.addEventListener("DOMContentLoaded", function() {
    const template = document.getElementById("produto-template");
    const container = document.getElementById("smoothie-container");

    fetch('http://localhost:8080/api/Produtos/')
        .then(response => response.json())
        .then(data => {
            data.forEach(produto => {
                const clone = document.importNode(template.content, true);

                // Preenche os dados do produto no clone
                clone.querySelector(".product-link").href = "product-details.html?id=" + produto.id;
                clone.querySelector(".smoothie-img").src = produto.img;
                clone.querySelector(".product-name").textContent = produto.nomeProduto;
                clone.querySelector(".product-name").href = "product-details.html?id=" + produto.id; // Adiciona o href no nome do produto
                clone.querySelector(".product-description").textContent = produto.descricaoProduto;
                clone.querySelector(".product-price").textContent = produto.valorProduto.toFixed(2);

                const addToCartButton = clone.querySelector(".add-to-cart");
                addToCartButton.onclick = function() {
                    addToCart(produto.id);
                };

                // Adiciona o item clonado ao container principal
                container.appendChild(clone);
            });

            // Adiciona evento de clique aos links de produto
            const linksProduto = document.querySelectorAll('h4 a');
            linksProduto.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const productId = event.target.getAttribute('href').split('=')[1];
                    console.log('ID do Produto:', productId);
                    buscarDetalhesProduto(productId);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Aqui você pode adicionar uma lógica para informar o usuário que ocorreu um erro
        });
});

// Função de exemplo para adicionar ao carrinho
function addToCart(button, productId) {
    addToCart(this,productId)
}

function buscarDetalhesProduto(id) {
    const endpoint = `http://localhost:8080/api/Produtos/${id}`;

    console.log('Buscando detalhes do produto com ID:', id);

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar detalhes do produto');
            }
            return response.json();
        })
        .then(data => {
            console.log('Detalhes do Produto:', data);

            // Inclui o ID do produto nos dados armazenados
            const produtoDetalhes = {
                ...data,
                idProduto: id
            };
            sessionStorage.setItem('produtoDetalhes', JSON.stringify(produtoDetalhes));

            console.log('Redirecionando para product-details.html');
            window.location.href = `./product-details.html?id=${id}`;
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do produto:', error);
        });
}


