document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');

    // Mapeamento de chaves para mensagens de erro personalizadas
    const errorMessages = {
        name: 'Por favor, preencha o campo Nome.',
        birthday: 'Por favor, selecione uma Data de Nascimento.',
        gender: 'Por favor, selecione o Gênero.',
        email: 'Por favor, preencha o campo E-mail.',
        password: 'Por favor, preencha o campo Senha.',
        confirmPassword: 'Por favor, confirme sua Senha.',
        res_code: 'Por favor, preencha o campo CEP.',
        NumeroCasa: 'Por favor, preencha o campo Número da Casa.'
        // Adicione aqui conforme necessário para outros campos do formulário
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
            data[key] = value.trim(); // Remove espaços em branco desnecessários
            const inputField = form.querySelector(`[name="${key}"]`);

            if (!data[key]) {
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

        // Verifica se as senhas coincidem
        if (data.password !== data.confirmPassword) {
            formIsValid = false;
            const passwordField = form.querySelector('[name="password"]');
            const confirmPasswordField = form.querySelector('[name="confirmPassword"]');

            passwordField.classList.add('error-input');
            confirmPasswordField.classList.add('error-input');

            const passwordError = document.createElement('div');
            passwordError.classList.add('error-message');
            passwordError.textContent = 'As senhas não coincidem.';

            // Cria um contêiner para a mensagem de erro e insere abaixo dos campos de senha
            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(passwordError);

            // Insere o contêiner abaixo dos campos de senha
            passwordField.parentNode.insertBefore(errorContainer, passwordField.nextSibling);
            confirmPasswordField.parentNode.insertBefore(errorContainer.cloneNode(true), confirmPasswordField.nextSibling);
        } else {
            const passwordField = form.querySelector('[name="password"]');
            const confirmPasswordField = form.querySelector('[name="confirmPassword"]');
            passwordField.classList.remove('error-input');
            confirmPasswordField.classList.remove('error-input');
        }

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
