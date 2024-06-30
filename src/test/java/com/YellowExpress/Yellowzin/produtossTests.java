package com.YellowExpress.Yellowzin;


import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Class.Produtos;
import com.YellowExpress.Yellowzin.Repository.ClientesRepository;
import com.YellowExpress.Yellowzin.Repository.ProdutosRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
class ProdutosTests {

    @Autowired
    private ProdutosRepository produtosRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @Test
    public void testSaveAndEdit() throws ParseException {
        Clientes cliente = new Clientes();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dataNascimento = dateFormat.parse("2023-12-01");

        cliente.criarUsuarioCliente("clienteUm", "df", "dfgd", "12345-678", dataNascimento, "Masculino", 1L);
        clientesRepository.save(cliente);

        Produtos produtos = new Produtos();
        produtos.cadastrarProduto("produtosTeste", "dfddsfsdfsdf", 100, "Fabricante", "Categoria", "Unidade", "url-da-imagem");
        produtosRepository.save(produtos);

        Produtos produtosEditada = produtosRepository.findById(produtos.getId()).orElse(null);
        assertNotNull(produtosEditada);

        produtosRepository.deleteById(produtos.getId());
        Produtos produtosExclusão = produtosRepository.findById(produtos.getId()).orElse(null);
        assertNull(produtosExclusão);
    }
}
