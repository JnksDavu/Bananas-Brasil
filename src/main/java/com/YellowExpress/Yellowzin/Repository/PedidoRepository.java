package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.YellowExpress.Yellowzin.Class.Pedidos;

@Repository
public interface PedidoRepository extends CrudRepository<Pedidos, Long> {
}
