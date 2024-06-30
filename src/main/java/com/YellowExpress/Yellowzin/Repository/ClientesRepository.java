package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.YellowExpress.Yellowzin.Class.Clientes;

@Repository
public interface ClientesRepository extends CrudRepository<Clientes, Long> {
    Clientes findByUsuario(String usuario);
    boolean existsByUsuario(String usuario);
}
