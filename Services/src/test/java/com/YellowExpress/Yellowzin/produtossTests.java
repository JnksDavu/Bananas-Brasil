package com.YellowExpress.Yellowzin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.YellowExpress.Yellowzin.Class.*;
import com.YellowExpress.Yellowzin.Repository.*;

@SpringBootTest
class produtossTests {
    
    @Autowired
    private ProdutosRepository produtosRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @Test
    public void testSaveAndEdit(){
        Clientes cliente = new Clientes();
        cliente.criarUsuarioCliente("clienteUm","df","dfgd");

        clientesRepository.save(cliente);

        Produtos produtos = new Produtos();
        produtos.cadastrarProduto("produtosTeste", "dfddsfsdfsdf", 100);
        produtosRepository.save(produtos);

        produtosRepository.save(produtos);

        Produtos produtosEditada = produtosRepository.findById(produtos.getId()).orElse(null); //buscando produtos do bd para verificar se foi alterada
        assertNotNull(produtosEditada);

        produtosRepository.deleteById(produtos.getId());
        Produtos produtossExclusão = produtosRepository.findById(produtos.getId()).orElse(null);//método para exluir produtoss
        assertNull(produtossExclusão);//se não for nullo falha o teste semelhante aos assets a cima
    }
}
