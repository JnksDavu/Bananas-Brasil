document.getElementById('submitButton').addEventListener('click', function() {
    var nome = document.getElementById('name').value;
    var dt_nascimento = document.getElementById('birthday').value;
    var genero = document.getElementById('gender').value;
    var usuario = document.getElementById('email').value;
    var senha = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var cep = document.getElementById('res_code').value;
    var Numero_casa = document.getElementById('NumeroCasa').value;

    var valid = true;

    if (!nome) {
        valid = false;
        document.getElementById('nameError').textContent = 'Nome é obrigatório.';
        document.getElementById('nameError').style.display = 'block';
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (!dt_nascimento) {
        valid = false;
        document.getElementById('birthdayError').textContent = 'Data de Nascimento é obrigatória.';
        document.getElementById('birthdayError').style.display = 'block';
    } else {
        document.getElementById('birthdayError').style.display = 'none';
    }

    if (!genero || genero === "Gênero") {
        valid = false;
        document.getElementById('genderError').textContent = 'Gênero é obrigatório.';
        document.getElementById('genderError').style.display = 'block';
    } else {
        document.getElementById('genderError').style.display = 'none';
    }

    if (!usuario) {
        valid = false;
        document.getElementById('emailError').textContent = 'E-mail é obrigatório.';
        document.getElementById('emailError').style.display = 'block';
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (!senha) {
        valid = false;
        document.getElementById('passwordError').textContent = 'Senha é obrigatória.';
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    if (senha !== confirmPassword) {
        valid = false;
        document.getElementById('confirmPasswordError').textContent = 'As senhas não correspondem.';
        document.getElementById('confirmPasswordError').style.display = 'block';
    } else {
        document.getElementById('confirmPasswordError').style.display = 'none';
    }

    if (!cep) {
        valid = false;
        document.getElementById('res_codeError').textContent = 'CEP é obrigatório.';
        document.getElementById('res_codeError').style.display = 'block';
    } else {
        document.getElementById('res_codeError').style.display = 'none';
    }

    if (!Numero_casa) {
        valid = false;
        document.getElementById('NumeroCasaError').textContent = 'Número é obrigatório.';
        document.getElementById('NumeroCasaError').style.display = 'block';
    } else {
        document.getElementById('NumeroCasaError').style.display = 'none';
    }

    if (valid) {
        var cliente = {
            nome: nome,
            dt_nascimento: dt_nascimento,
            genero: genero,
            usuario: usuario,
            senha: senha,
            cep: cep,
            Numero_casa: Numero_casa
        };

        fetch('http://localhost:8080/api/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Você pode redirecionar o usuário ou mostrar uma mensagem de sucesso aqui
        })
        .catch((error) => {
            console.error('Error:', error);
            // Você pode mostrar uma mensagem de erro aqui
        });
    }
});
