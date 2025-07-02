package com.YellowExpress.Yellowzin.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import com.YellowExpress.Yellowzin.Model.EmailDTO; // ajuste o caminho conforme necessário


@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/pedido")
    public ResponseEntity<String> enviarEmailPedido(@RequestBody EmailDTO email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email.getClienteEmail());
            message.setSubject(email.getAssunto());
            message.setText(email.getMensagem());
            message.setFrom("yellow.express22@gmail.com");

            javaMailSender.send(message);

            System.out.println("✅ E-mail enviado para: " + email.getClienteEmail());
            return ResponseEntity.ok("E-mail enviado com sucesso");
        } catch (Exception e) {
            System.err.println("❌ Erro ao enviar e-mail: " + e.getMessage());
            e.printStackTrace(); // mostra erro exato no terminal
            return ResponseEntity.status(500).body("Erro ao enviar e-mail: " + e.getMessage());
        }
    }

}
