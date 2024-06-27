document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/Produtos/')
        .then(response => response.json())
        .then(data => {
            const produtosList = document.getElementById('produtosList');
            data.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nomeProduto} - ${produto.descricaoProduto} - R$${produto.valorProduto}`;
                produtosList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Aqui você pode adicionar uma lógica para informar o usuário que ocorreu um erro
        });
});
