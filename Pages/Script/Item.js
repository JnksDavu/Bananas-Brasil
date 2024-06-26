document.addEventListener('DOMContentLoaded', function() {
    const produtoDetalhes = sessionStorage.getItem('produtoDetalhes');
    if (produtoDetalhes) {
        const produto = JSON.parse(produtoDetalhes);
        const nomeProdutoElement = document.getElementById('nomeProduto');
        const descricaoProdutoElement = document.getElementById('descricaoProduto');
        const valorProdutoElement = document.getElementById('valorProduto');
        const imgProdutoElement = document.getElementById('imgProduto');

        console.log('Dados do produto encontrados na sessionStorage:', produto);

        nomeProdutoElement.textContent = produto.nomeProduto;
        descricaoProdutoElement.textContent = produto.descricaoProduto;
        valorProdutoElement.textContent = `R$ ${produto.valorProduto.toFixed(2)}`;
        imgProdutoElement.src = produto.img;
        
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

            // Inclui o ID do produto nos dados armazenados
            const produtoDetalhes = {
                ...data,
                idProduto: id
            };
            sessionStorage.setItem('produtoDetalhes', JSON.stringify(produtoDetalhes));

            console.log('Redirecionando para product-details.html');
            window.location.href = `./product-details.html`;
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do produto:', error);
        });
}


const linksProduto = document.querySelectorAll('h4 a');
linksProduto.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = event.target.getAttribute('href').split('=')[1];
        console.log('ID do Produto:', productId);
        buscarDetalhesProduto(productId);
    });
});
