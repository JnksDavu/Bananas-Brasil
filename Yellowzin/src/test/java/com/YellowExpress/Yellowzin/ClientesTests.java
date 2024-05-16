package com.YellowExpress.Yellowzin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Repository.*;

@SpringBootTest
class ClientesTests {

	@Autowired
    private ClientesRepository repository;

    @Test
    public void testSave(){
        Clientes clientes = new Clientes();
        clientes.criarUsuarioCliente("clienteUm","df","dfgd");

        repository.save(clientes);

        clientes.alterarNomeCliente("Trocado");//editado cliente
        repository.save(clientes);

        Clientes clientesEditado = repository.findById(clientes.getId()).orElse(null); //buscando cliente do bd para verificar se foi alterada
        assertNotNull(clientesEditado);
        assertEquals("Trocado", clientesEditado.getNome());

        repository.deleteById(clientes.getId());
        Clientes clientesExclusão = repository.findById(clientes.getId()).orElse(null);//método para exluir clientes
        assertNull(clientesExclusão);//se não for nullo falha o teste semelhante aos assets a cima
    }

}

