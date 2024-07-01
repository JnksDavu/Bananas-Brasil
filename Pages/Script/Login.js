$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        
        // Captura os dados do formulário
        var usuario = $('#usuario').val();
        var senha = $('#senha').val();

        // Monta o objeto de dados a ser enviado
        var loginData = {
            usuario: usuario,
            senha: senha
        };

        // Envia os dados para o backend
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/clientes/login",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function(response) {
                // Se login bem-sucedido, você pode armazenar o token JWT ou redirecionar para outra página
                console.log("Login bem-sucedido! Token JWT: " + response);
                // Exemplo de redirecionamento
                localStorage.setItem('jwtToken', response);
                window.location.href = "../index.html";
            },
            error: function(xhr, status, error) {
                // Trata erros de login
                console.error("Erro ao fazer login: " + error);
                alert("Credenciais inválidas!");
            }
        });
    });
});


$(document).ready(function() {
    $('#signup').click(function() {
        window.location.href = "../cadastro.html";
    });
});
