document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');

    // Mapeamento de chaves para nomes corretos
    const fieldMapping = {
        name: 'nome',
        birthday: 'dt_nascimento',
        gender: 'genero',
        email: 'usuario',
        password: 'senha',
        confirmPassword: 'confirmPassword',
        res_code: 'cep',
        NumeroCasa: 'numero_casa'
    };

    // Mapeamento de chaves para mensagens de erro personalizadas
    const errorMessages = {
        name: 'Por favor, preencha o campo Nome.',
        birthday: 'Por favor, selecione uma Data de Nascimento.',
        gender: 'Por favor, selecione o Gênero.',
        email: 'Por favor, preencha o campo E-mail.',
        password: 'Por favor, preencha o campo Senha.',
        confirmPassword: 'Por favor, confirme sua Senha.',
        res_code: 'Por favor, preencha o campo CEP.',
        NumeroCasa: 'Por favor, preencha o campo Número da Casa.',
        nameInvalid: 'O nome deve conter apenas letras.',
        passwordInvalid: 'A senha deve ter no mínimo 6 caracteres e conter números e letras.',
        cepInvalid: 'O CEP deve estar no formato de 8 caracteres',
        ageInvalid: 'É necessário ter no mínimo 14 anos para se cadastrar.',
        houseNumberInvalid: 'O número da casa deve conter no máximo 5 caracteres numéricos.'
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
                if (key === 'email') {
                    const emailField = form.querySelector('[name="email"]');
                    emailField.parentNode.insertBefore(errorContainer, emailField.nextSibling);
                } else {
                    inputField.parentNode.insertBefore(errorContainer, inputField.nextSibling);
                }
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
                    window.location.href = "../Pages/Login/Login.html";
                } else if (response.status === 409) {
                    alert.apply('OLA')
                    response.json().then(data => {
                        const emailField = form.querySelector('[name="email"]');
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = data.message; // Assumindo que a mensagem de erro é retornada no corpo da resposta JSON

                        const errorContainer = document.createElement('div');
                        errorContainer.classList.add('error-container');
                        errorContainer.appendChild(errorMessage);

                        // Remove mensagens de erro anteriores do campo de e-mail
                        const existingErrorContainer = form.querySelector('.email-error-container');
                        if (existingErrorContainer) {
                            existingErrorContainer.remove();
                        }

                        // Insere o contêiner com o erro abaixo do campo de e-mail
                        emailField.parentNode.insertBefore(errorContainer, emailField.nextSibling);
                        errorContainer.classList.add('email-error-container');
                    });
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
