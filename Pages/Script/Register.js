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
                inputField.parentNode.insertBefore(errorContainer, inputField.nextSibling);
            } else {
                inputField.classList.remove('error-input');
            }
        });

        // Validação do nome (apenas letras)
        if (!/^[A-Za-z\s]+$/.test(data.nome)) {
            formIsValid = false;
            const nameField = form.querySelector('[name="name"]');
            nameField.classList.add('error-input');

            const nameError = document.createElement('div');
            nameError.classList.add('error-message');
            nameError.textContent = errorMessages.nameInvalid;

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(nameError);

            nameField.parentNode.insertBefore(errorContainer, nameField.nextSibling);
        } else {
            const nameField = form.querySelector('[name="name"]');
            nameField.classList.remove('error-input');
        }

        // Validação da senha (mínimo 6 caracteres, números e letras)
        if (data.senha.length < 6 || !/[a-zA-Z]/.test(data.senha) || !/[0-9]/.test(data.senha)) {
            formIsValid = false;
            const passwordField = form.querySelector('[name="password"]');
            passwordField.classList.add('error-input');

            const passwordError = document.createElement('div');
            passwordError.classList.add('error-message');
            passwordError.textContent = errorMessages.passwordInvalid;

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(passwordError);

            passwordField.parentNode.insertBefore(errorContainer, passwordField.nextSibling);
        } else {
            const passwordField = form.querySelector('[name="password"]');
            passwordField.classList.remove('error-input');
        }

        // Validação do CEP (formato XXXXX-XXX)
        if (data.cep.length !== 8) {
            formIsValid = false;
            const cepField = form.querySelector('[name="res_code"]');
            cepField.classList.add('error-input');

            const cepError = document.createElement('div');
            cepError.classList.add('error-message');
            cepError.textContent = errorMessages.cepInvalid;

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(cepError);

            cepField.parentNode.insertBefore(errorContainer, cepField.nextSibling);
        } else {
            const cepField = form.querySelector('[name="res_code"]');
            cepField.classList.remove('error-input');
        }

        // Validação da idade mínima de 14 anos
        const birthDate = new Date(data.dt_nascimento);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 14) {
            formIsValid = false;
            const birthdayField = form.querySelector('[name="birthday"]');
            birthdayField.classList.add('error-input');

            const ageError = document.createElement('div');
            ageError.classList.add('error-message');
            ageError.textContent = errorMessages.ageInvalid;

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(ageError);

            birthdayField.parentNode.insertBefore(errorContainer, birthdayField.nextSibling);
        } else {
            const birthdayField = form.querySelector('[name="birthday"]');
            birthdayField.classList.remove('error-input');
        }

        // Validação do número da casa (máximo 5 caracteres numéricos)
        if (!/^\d{1,5}$/.test(data.numero_casa)) {
            formIsValid = false;
            const houseNumberField = form.querySelector('[name="NumeroCasa"]');
            houseNumberField.classList.add('error-input');

            const houseNumberError = document.createElement('div');
            houseNumberError.classList.add('error-message');
            houseNumberError.textContent = errorMessages.houseNumberInvalid;

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');
            errorContainer.appendChild(houseNumberError);

            houseNumberField.parentNode.insertBefore(errorContainer, houseNumberField.nextSibling);
        } else {
            data.numero_casa = parseInt(data.numero_casa);
            const houseNumberField = form.querySelector('[name="NumeroCasa"]');
            houseNumberField.classList.remove('error-input');
        }

        // Verifica se as senhas coincidem
        if (data.senha !== data.confirmPassword) {
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
