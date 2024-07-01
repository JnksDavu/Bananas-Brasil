package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.YellowExpress.Yellowzin.Class.Clientes;
import java.util.Optional;

@Repository
public interface ClientesRepository extends CrudRepository<Clientes, Long> {
    Optional<Clientes> findByUsuario(String usuario);
    boolean existsByUsuario(String usuario);
}
