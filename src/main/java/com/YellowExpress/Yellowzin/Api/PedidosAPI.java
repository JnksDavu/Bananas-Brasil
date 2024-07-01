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
import com.YellowExpress.Yellowzin.Utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

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

    @PostMapping("/{token}")
    public ResponseEntity<?> criarPedido(@Validated @RequestBody Pedidos pedido, @PathVariable String token, HttpServletRequest request) {
        // Extrair o usuário (cliente) do token
        String usuario = JwtUtil.getUsuarioFromToken(token);
    
        // Buscar o cliente associado ao usuário
        Optional<Clientes> clienteOptional = clientesRepository.findByUsuario(usuario);
        Optional<Produtos> produtoOptional = produtosRepository.findById(pedido.getProduto().getId());
    
        if (!clienteOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cliente não encontrado para o token fornecido.");
        }
    
        if (!produtoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Produto não encontrado com o ID: " + pedido.getProduto().getId());
        }
    
        // Criação do pedido
        Pedidos novoPedido = new Pedidos(clienteOptional.get(), produtoOptional.get(), pedido.getQuantidade());
        novoPedido = pedidoRepository.save(novoPedido);
        return ResponseEntity.ok(novoPedido);
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
