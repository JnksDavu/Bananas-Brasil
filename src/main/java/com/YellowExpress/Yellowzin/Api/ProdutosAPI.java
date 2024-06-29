package com.YellowExpress.Yellowzin.Api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.YellowExpress.Yellowzin.Class.Produtos;
import com.YellowExpress.Yellowzin.Repository.ProdutosRepository;


@RestController
@RequestMapping("/api/Produtos")
public class ProdutosAPI {

    @Autowired
    private ProdutosRepository ProdutosRepository;

    @PostMapping("/")
    public ResponseEntity<Produtos> criarprodutos(@Validated @RequestBody Produtos produtos) {
        Produtos novaprodutos = ProdutosRepository.save(produtos);
        return new ResponseEntity<>(novaprodutos, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produtos> buscarprodutosPorId(@PathVariable Long id) {
        Optional<Produtos> produtosOptional = ProdutosRepository.findById(id);
        return produtosOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public ResponseEntity<List<Produtos>> buscarTodasProdutos() {
        List<Produtos> Produtos = (List<Produtos>) ProdutosRepository.findAll();
        return ResponseEntity.ok(Produtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produtos> atualizarprodutos(@PathVariable Long id, @Validated @RequestBody Produtos novaprodutos) {
        Optional<Produtos> produtosOptional = ProdutosRepository.findById(id);
        if (produtosOptional.isPresent()) {
            Produtos produtosExistente = produtosOptional.get();
            produtosExistente.cadastrarProduto(novaprodutos.getNomeProduto(),novaprodutos.getDescricaoProduto(),novaprodutos.getValorProduto(),novaprodutos.getUniMedidaProduto(),novaprodutos.getClassificacaoProduto(),novaprodutos.getAvaliacaoProduto());
            Produtos produtosAtualizada = ProdutosRepository.save(produtosExistente);
            return ResponseEntity.ok(produtosAtualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirprodutos(@PathVariable Long id) {
        if (ProdutosRepository.existsById(id)) {
            ProdutosRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

