package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.YellowExpress.Yellowzin.Class.Pedidos;
import com.YellowExpress.Yellowzin.Class.Clientes;

import java.util.List;

@Repository
public interface PedidoRepository extends CrudRepository<Pedidos, Long> {
    List<Pedidos> findByCliente(Clientes cliente);
}
