document.addEventListener('DOMContentLoaded', function() {
    const produtoDetalhes = sessionStorage.getItem('produtoDetalhes');
    if (produtoDetalhes) {
        const produto = JSON.parse(produtoDetalhes);
        const nomeProdutoElement = document.getElementById('nomeProduto');
        const descricaoProdutoElement = document.getElementById('descricaoProduto');
        const valorProdutoElement = document.getElementById('valorProduto');
        const imgProdutoElement = document.getElementById('imgProduto');
        const descProdutoElement = document.getElementById('descProduto');

        console.log('Dados do produto encontrados na sessionStorage:', produto);

        nomeProdutoElement.textContent = produto.nomeProduto;
        descricaoProdutoElement.textContent = produto.descricaoProduto;
        valorProdutoElement.textContent = `R$ ${produto.valorProduto.toFixed(2)}`;
        imgProdutoElement.src = produto.img;
        descProdutoElement.textContent = produto.descricaoDetalhada;
        
    } else {
        console.error('Dados do produto não encontrados na sessionStorage.');
    }
});

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

            sessionStorage.setItem('produtoDetalhes', JSON.stringify(data));

            console.log('Redirecionando para product-details.html');
            window.location.href = `./product-details.html`;
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do produto:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const linksProduto = document.querySelectorAll('.product-link, .product-name');
    linksProduto.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = new URL(this.href).searchParams.get('id');
            console.log('ID do Produto:', productId);
            if (productId) {
                buscarDetalhesProduto(productId);
            } else {
                console.error('ID do produto não encontrado no link:', this.href);
            }
        });
    });

    // Adicionando fetch para todos os produtos
    const produtoIds = [3, 8, 22, 23, 24];
    produtoIds.forEach(id => {
        fetch(`http://localhost:8080/api/Produtos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o produto');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Dados do Produto ID ${id}:`, data);

                const slide = document.querySelector(`a[href="product-details.html?id=${id}"]`).closest('.swiper-slide');
                if (slide) {
                    slide.querySelector('.text-light-black.product-name').textContent = data.nomeProduto;
                    slide.querySelector('.text-light-black.product-name').href = `product-details.html?id=${data.id}`;
                    slide.querySelector('.img-fluid.product-image').src = data.img;
                    slide.querySelector('.img-fluid.product-image').alt = data.nomeProduto;
                    slide.querySelector('.food-description .text-light-black.product-price').textContent = `R$ ${data.valorProduto.toFixed(2)}`;
                } else {
                    console.error(`Slide não encontrado para o produto ID ${id}`);
                }
            })
            .catch(error => console.error('Erro ao buscar o produto ID', id, ':', error));
    });
});