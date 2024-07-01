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

    function validateForm(data) {
        let formIsValid = true;

        // Verificação do nome
        if (!data.nome || !/^[A-Za-z\s]+$/.test(data.nome)) {
            formIsValid = false;
            displayError('name', errorMessages.nameInvalid);
        }

        // Verificação da data de nascimento
        if (!data.dt_nascimento) {
            formIsValid = false;
            displayError('birthday', errorMessages.birthday);
        } else {
            const birthDate = new Date(data.dt_nascimento);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 14) {
                formIsValid = false;
                displayError('birthday', errorMessages.ageInvalid);
            }
        }

        // Verificação do gênero
        if (!data.genero) {
            formIsValid = false;
            displayError('gender', errorMessages.gender);
        }

        // Verificação do e-mail
        if (!data.usuario || !/\S+@\S+\.\S+/.test(data.usuario)) {
            formIsValid = false;
            displayError('email', errorMessages.email);
        }

        // Verificação da senha
        if (!data.senha || data.senha.length < 6 || !/\d/.test(data.senha) || !/[a-zA-Z]/.test(data.senha)) {
            formIsValid = false;
            displayError('password', errorMessages.passwordInvalid);
        }

        // Verificação da confirmação de senha
        if (data.senha !== data.confirmPassword) {
            formIsValid = false;
            displayError('confirmPassword', errorMessages.confirmPassword);
        }

        // Verificação do CEP
        if (!data.cep || !/^\d{8}$/.test(data.cep)) {
            formIsValid = false;
            displayError('res_code', errorMessages.cepInvalid);
        }

        // Verificação do número da casa
        if (!data.numero_casa || !/^\d{1,5}$/.test(data.numero_casa)) {
            formIsValid = false;
            displayError('NumeroCasa', errorMessages.houseNumberInvalid);
        }

        return formIsValid;
    }

    function displayError(field, message) {
        const inputField = form.querySelector(`[name="${field}"]`);
        inputField.classList.add('error-input');

        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;

        const errorContainer = document.createElement('div');
        errorContainer.classList.add('error-container');
        errorContainer.appendChild(errorMessage);

        // Remove mensagens de erro anteriores do campo
        const existingErrorContainer = inputField.parentNode.querySelector('.error-container');
        if (existingErrorContainer) {
            existingErrorContainer.remove();
        }

        inputField.parentNode.insertBefore(errorContainer, inputField.nextSibling);
    }

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evita a submissão do formulário

        const formData = new FormData(form);
        const data = {};

        // Remove mensagens de erro anteriores
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());

        // Coleta e mapeia os dados do formulário
        formData.forEach((value, key) => {
            data[fieldMapping[key]] = value.trim(); // Usa o mapeamento para atribuir o nome correto
        });

        // Valida os dados do formulário
        if (validateForm(data)) {
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
                    response.json().then(data => {
                        displayError('email', data.message || 'Usuário já existe.');
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
