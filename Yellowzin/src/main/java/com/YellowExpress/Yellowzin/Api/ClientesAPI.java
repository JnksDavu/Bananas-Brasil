package com.YellowExpress.Yellowzin.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Repository.ClientesRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClientesAPI {

    @Autowired
    private ClientesRepository clientesRepository;

    @PostMapping("/")
    public ResponseEntity<Clientes> criarCliente(@Validated @RequestBody Clientes cliente) {
        Clientes novoCliente = clientesRepository.save(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
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

        clienteExistente.criarUsuarioCliente(null, null, null);
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
