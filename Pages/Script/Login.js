document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('LoginForm');
    const submitButton = document.getElementById('submitButton');
    const signin = document.getElementById('signin');

    // Mapeamento de chaves para nomes corretos
    const fieldMapping = {
        email: 'email',
        password: 'password',
    };

    // Mapeamento de chaves para mensagens de erro personalizadas
    const errorMessages = {
        email: 'Por favor, preencha o campo E-mail.',
        password: 'Por favor, preencha o campo Senha.',
    };

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evita a submissão do formulário

        const formData = new FormData(form);
        const data = {};
        let formIsValid = true;

        // Remove mensagens de erro anteriores
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());

        // Validação de cada campo do formulário
        formData.forEach((value, key) => {
            data[fieldMapping[key]] = value.trim(); // Usa o mapeamento para atribuir o nome correto
            const inputField = form.querySelector(`[name="${key}"]`);

            if (!data[fieldMapping[key]]) {
                formIsValid = false;
                inputField.classList.add('error-input');

                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = errorMessages[key]; // Usa a mensagem de erro mapeada

                // Cria um contêiner para a mensagem de erro e insere abaixo do campo
                const errorContainer = document.createElement('div');
                errorContainer.classList.add('error-container');
                errorContainer.appendChild(errorMessage);

                // Insere o contêiner abaixo do campo de entrada
                inputField.parentNode.insertBefore(errorContainer, inputField.nextSibling);
            } else {
                inputField.classList.remove('error-input');
            }
        });

        // Se o formulário for válido, envia os dados
        if (formIsValid) {
            fetch('http://localhost:8080/api/clientes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                    form.reset();
                    console.log(data)
                } else {
                    alert('Erro ao cadastrar. Tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao cadastrar. Tente novamente.');
            });
        }
    });
});