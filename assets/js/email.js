document.addEventListener("DOMContentLoaded", function () {
    const finalizarBtn = document.getElementById("finalizarBtn");

    if (finalizarBtn) {
        finalizarBtn.addEventListener("click", function () {
            const emailData = {
                clienteEmail: "daviandre.junkes@gmail.com",
                assunto: "Seu pedido foi recebido!🍌",
                mensagem: "Obrigado por comprar conosco no Yellow Express 🍌. Seu pedido está a caminho! Logo mais as bananas serão separadas e encaminhadas até você"
            };

            fetch("http://localhost:8081/api/email/pedido", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            })
            .then(response => {
                if (response.ok) {
                    console.log("✅ E-mail enviado com sucesso");
                    window.location.href = "pix.html";
                } else {
                    console.error("❌ Erro ao enviar e-mail:", response.status);
                    alert("Erro ao enviar o e-mail. Tente novamente.");
                }
            })
            .catch(error => {
                console.error("❌ Erro de conexão:", error);
            });
        });
    }
});
