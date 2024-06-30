package com.YellowExpress.Yellowzin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Repository.ClientesRepository;

import java.util.Date;

@SpringBootTest
class ClientesTests {

    @Autowired
    private ClientesRepository repository;

    @Test
    public void testSave() {
        Clientes clientes = new Clientes();
        clientes.criarUsuarioCliente("clienteUm", "df", "dfgd", "12345-678", new Date(), "Masculino", 1L); // Atualizado para incluir todos os parâmetros

        repository.save(clientes);

        clientes.alterarNomeCliente("Trocado");
        repository.save(clientes);

        Clientes clientesEditado = repository.findById(clientes.getId()).orElse(null);
        assertNotNull(clientesEditado);
        assertEquals("Trocado", clientesEditado.getNome());

        repository.deleteById(clientes.getId());
        Clientes clientesExclusão = repository.findById(clientes.getId()).orElse(null);
        assertNull(clientesExclusão);
    }
}
