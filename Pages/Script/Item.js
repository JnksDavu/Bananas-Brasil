// Função para buscar os detalhes do produto por ID
function buscarDetalhesProduto(id) {
    // Endpoint do seu backend Spring Boot
    const endpoint = `http://localhost:8080/api/produtos/${id}`;

    // Fazendo uma requisição GET para o endpoint
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar detalhes do produto');
            }
            return response.json();
        })
        .then(data => {
            // Manipular os dados recebidos (data) aqui
            console.log('Detalhes do Produto:', data);

            // Exemplo de como você pode acessar os campos retornados
            const nomeProduto = data.nomeProduto;
            const descricaoProduto = data.descricaoProduto;
            const valorProduto = data.valorProduto;
            const img = data.img;

            // Redirecionar para a página de detalhes do produto com os dados recebidos
            window.location.href = `produtosdetalhados.html?id=${id}`;
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do produto:', error);
            // Tratar o erro de forma adequada, por exemplo, exibindo uma mensagem para o usuário
        });
}

// Exemplo de uso: chamar a função quando clicar no link do produto
const linkProduto = document.querySelector('h4 a');
linkProduto.addEventListener('click', function(event) {
    event.preventDefault();
    const productId = event.target.getAttribute('href').split('=')[1];
    buscarDetalhesProduto(productId);
});
