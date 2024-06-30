package com.YellowExpress.Yellowzin.Api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.YellowExpress.Yellowzin.Class.Clientes;
import com.YellowExpress.Yellowzin.Class.Produtos;
import com.YellowExpress.Yellowzin.Class.Pedidos;
import com.YellowExpress.Yellowzin.Repository.PedidoRepository;
import com.YellowExpress.Yellowzin.Repository.ClientesRepository;
import com.YellowExpress.Yellowzin.Repository.ProdutosRepository;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
public class PedidosAPI {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @Autowired
    private ProdutosRepository produtosRepository;

    @PostMapping("/")
    public ResponseEntity<Pedidos> criarPedido(@Validated @RequestBody Pedidos pedido) {
        Optional<Clientes> cliente = clientesRepository.findById(pedido.getCliente().getId());
        Optional<Produtos> produto = produtosRepository.findById(pedido.getProduto().getId());

        if (!cliente.isPresent() || !produto.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        pedido = new Pedidos(cliente.get(), produto.get(), pedido.getQuantidade());
        Pedidos novoPedido = pedidoRepository.save(pedido);
        return new ResponseEntity<>(novoPedido, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedidos> buscarPedidoPorId(@PathVariable Long id) {
        Optional<Pedidos> pedidoOptional = pedidoRepository.findById(id);
        return pedidoOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public ResponseEntity<List<HashMap<String, Object>>> buscarTodosPedidos() {
        List<Pedidos> pedidos = (List<Pedidos>) pedidoRepository.findAll();

        List<HashMap<String, Object>> responsePedidos = pedidos.stream()
                .map(pedido -> {
                    HashMap<String, Object> response = new HashMap<>();
                    response.put("id", pedido.getId());
                    response.put("idCliente", pedido.getCliente().getId());
                    response.put("idProduto", pedido.getProduto().getId());
                    response.put("quantidade", pedido.getQuantidade());
                    response.put("valorUnitario", pedido.getValorUnitario());
                    response.put("valorTotal", pedido.getValorTotal());
                    response.put("dataPedido", pedido.getDataPedido());
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(responsePedidos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedidos> atualizarPedido(@PathVariable Long id, @Validated @RequestBody Pedidos pedidoAtualizado) {
        Optional<Pedidos> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedidos pedidoExistente = pedidoOptional.get();
            Optional<Clientes> cliente = clientesRepository.findById(pedidoAtualizado.getCliente().getId());
            Optional<Produtos> produto =  produtosRepository.findById(pedidoAtualizado.getProduto().getId());

            if (!cliente.isPresent() || !produto.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            pedidoExistente = new Pedidos(cliente.get(), produto.get(), pedidoAtualizado.getQuantidade());
            pedidoExistente = pedidoRepository.save(pedidoExistente);
            return ResponseEntity.ok(pedidoExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPedido(@PathVariable Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
