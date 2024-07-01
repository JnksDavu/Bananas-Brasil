let cart = [];
let total = 0;

// Obtém o token JWT do localStorage
var token = localStorage.getItem('jwtToken');

function addToCart(buttonElement, productId) {
    // Obtenha os detalhes do produto (mantido como está)
    const productElement = buttonElement.closest('.detail-product-image');
    const productName = productElement.querySelector('.product-name').innerText;
    const productDescription = productElement.querySelector('.product-description').innerText;
    const productPrice = parseFloat(productElement.querySelector('.product-price').innerText);

    // Crie o objeto do item (mantido como está)
    const item = {
        productName,
        productDescription,
        productPrice,
        orderId: null // Inicialmente, o ID do pedido é nulo
    };

    // Adicione o item ao carrinho (mantido como está)
    cart.push(item);

    // Atualize o total do carrinho (mantido como está)
    total += productPrice;

    // Atualize a interface do carrinho (mantido como está)
    updateCartUI();

    // Salve o pedido no backend (com o token JWT incluído no header)
    saveOrderToBackend(item, productId);
}

function removeFromCart(index) {
    const item = cart[index];

    // Verifique se há um orderId válido para deletar no backend (mantido como está)
    if (!item.orderId) {
        console.error('Não é possível deletar o pedido do backend: ID do pedido não encontrado.');
        return;
    }

    // Remova o item do total (mantido como está)
    total -= item.productPrice;

    // Remova o item do carrinho (mantido como está)
    cart.splice(index, 1);

    // Atualize a interface do carrinho (mantido como está)
    updateCartUI();

    // Remova o pedido do backend (com o token JWT incluído no header)
    deleteOrderFromBackend(item.orderId);
}

function saveOrderToBackend(item, productId) {
    fetch(`http://localhost:8080/api/pedidos/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Adiciona o token JWT no header Authorization
        },
        body: JSON.stringify({
            produto: { id: productId }, // Utiliza o productId recebido
            quantidade: 1 // Quantidade fixa para cada item adicionado ao carrinho
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Salva o ID do pedido retornado no item do carrinho (mantido como está)
        item.orderId = data.id;
        console.log('Pedido salvo:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar o pedido:', error);
    });
}

function deleteOrderFromBackend(orderId) {
    fetch(`http://localhost:8080/api/pedidos/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Adiciona o token JWT no header Authorization
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Pedido deletado do backend.');
    })
    .catch(error => {
        console.error('Erro ao deletar o pedido do backend:', error);
    });
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemHtml = `
            <div class="cat-product" data-index="${index}">
                <div class="cat-name">
                    <a href="#">
                        <p class="text-light-green">${item.productName}</p> <span class="text-light-white">${item.productDescription}</span>
                    </a>
                </div>
                <div class="price">
                    <a href="#" class="text-dark-white fw-500">
                        R$${item.productPrice.toFixed(2)}
                    </a>
                </div>
                <div class="delete-btn">
                    <a href="#" class="text-dark-white"> <i class="far fa-trash-alt"></i> </a>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Atualize o preço total (mantido como está)
    document.getElementById('cart-total').innerText = `R$${total.toFixed(2)}`;

    // Adicione event listeners para os botões de deletar (mantido como está)
    const deleteButtons = cartItemsContainer.querySelectorAll('.delete-btn a');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const itemElement = button.closest('.cat-product');
            const itemIndex = parseInt(itemElement.getAttribute('data-index'));
            removeFromCart(itemIndex);
        });
    });
}

function loadOrdersFromBackend() {
    fetch(`http://localhost:8080/api/pedidos/${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Limpa o carrinho atual
            cart = [];
            total = 0;

            // Função para buscar detalhes do produto pelo ID
            function fetchProductDetails(productId) {
                return fetch(`http://localhost:8080/api/Produtos/${productId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    });
            }

            // Promessas para buscar todos os detalhes dos produtos
            const productPromises = data.map(pedido => {
                const productId = pedido.produto_id; // Supondo que o campo seja produto_id
                return fetchProductDetails(productId)
                    .then(produto => ({
                        NOME_PRODUTO: produto.nome,
                        DESCRICAO_PRODUTO: produto.descricao,
                        VALOR_PRODUTO: pedido.valor_total, // Supondo que "valor_total" é o preço total do pedido
                    }));
            });

            // Executa todas as promessas em paralelo
            Promise.all(productPromises)
                .then(items => {
                    // Adiciona os itens ao carrinho
                    cart = items;
                    // Calcula o total
                    total = items.reduce((acc, item) => acc + item.productPrice, 0);
                    // Atualiza a interface do carrinho
                    updateCartUI();
                })
                .catch(error => {
                    console.error('Erro ao carregar detalhes dos produtos:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao carregar pedidos do backend:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadOrdersFromBackend();
});
