package com.YellowExpress.Yellowzin.Api;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    private ProdutosRepository produtosRepository;

    @PostMapping("/")
    public ResponseEntity<List<Produtos>> criarProdutos(@Validated @RequestBody List<Produtos> produtosList) {
        Iterable<Produtos> novaListaProdutosIterable = produtosRepository.saveAll(produtosList);
        List<Produtos> novaListaProdutos = StreamSupport.stream(novaListaProdutosIterable.spliterator(), false)
                                                        .collect(Collectors.toList());
        return new ResponseEntity<>(novaListaProdutos, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produtos> buscarProdutosPorId(@PathVariable Long id) {
        Optional<Produtos> produtosOptional = produtosRepository.findById(id);
        return produtosOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public ResponseEntity<List<Produtos>> buscarTodasProdutos() {
        List<Produtos> produtos = (List<Produtos>) produtosRepository.findAll();
        return ResponseEntity.ok(produtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produtos> atualizarProdutos(@PathVariable Long id, @Validated @RequestBody Produtos novaProdutos) {
        Optional<Produtos> produtosOptional = produtosRepository.findById(id);
        if (produtosOptional.isPresent()) {
            Produtos produtosExistente = produtosOptional.get();
            produtosExistente.cadastrarProduto(
                novaProdutos.getNomeProduto(),
                novaProdutos.getDescricaoProduto(),
                novaProdutos.getValorProduto(),
                novaProdutos.getUniMedida(),
                novaProdutos.getCategoria(),
                novaProdutos.getAvaliacao(),
                novaProdutos.getImg()
            );
            Produtos produtosAtualizada = produtosRepository.save(produtosExistente);
            return ResponseEntity.ok(produtosAtualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProdutos(@PathVariable Long id) {
        if (produtosRepository.existsById(id)) {
            produtosRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-all-if-no-id/{id}")
    public ResponseEntity<Void> excluirTodosOsProdutosExcetoId(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!produtosRepository.existsById(id)) {
            produtosRepository.deleteAll();
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    
}
