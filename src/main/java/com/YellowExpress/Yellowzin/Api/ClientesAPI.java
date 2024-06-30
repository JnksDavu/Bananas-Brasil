package com.YellowExpress.Yellowzin.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Repository.ClientesRepository;
import com.YellowExpress.Yellowzin.Utils.JwtUtil;

@RestController
@RequestMapping("/api/clientes")
public class ClientesAPI {

    @Autowired
    private ClientesRepository clientesRepository;

    @PostMapping("/")
    public ResponseEntity<?> criarCliente(@Validated @RequestBody Clientes cliente) {
        // Verifica se já existe um cliente com o mesmo usuário (email)
        if (clientesRepository.existsByUsuario(cliente.getUsuario())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já registrado");
        }

        cliente.criarUsuarioCliente(cliente.getNome(), cliente.getSenha(), cliente.getUsuario(), cliente.getCep(), cliente.getdt_nascimento(), cliente.getGenero(), cliente.getnumero_casa());
        Clientes novoCliente = clientesRepository.save(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Clientes cliente = clientesRepository.findByUsuario(loginRequest.getUsuario());
        if (cliente != null && cliente.verificarSenha(loginRequest.getSenha())) {
            String token = JwtUtil.generateToken(cliente.getUsuario());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clientes> buscarClientePorId(@PathVariable Long id) {
        Clientes cliente = clientesRepository.findById(id).orElse(null);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @GetMapping("/")
    public ResponseEntity<List<Clientes>> buscarTodosClientes() {
        List<Clientes> clientes = (List<Clientes>) clientesRepository.findAll();
        return ResponseEntity.ok(clientes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clientes> atualizarCliente(@PathVariable Long id, @Validated @RequestBody Clientes novoCliente) {
        Clientes clienteExistente = clientesRepository.findById(id).orElse(null);
        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        clienteExistente.criarUsuarioCliente(novoCliente.getNome(), novoCliente.getSenha(), novoCliente.getUsuario(), novoCliente.getCep(), novoCliente.getdt_nascimento(), novoCliente.getGenero(), novoCliente.getnumero_casa());
        Clientes clienteAtualizado = clientesRepository.save(clienteExistente);
        return ResponseEntity.ok(clienteAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable Long id) {
        Clientes cliente = clientesRepository.findById(id).orElse(null);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        clientesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
