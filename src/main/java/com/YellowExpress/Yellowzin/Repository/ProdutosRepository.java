package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.YellowExpress.Yellowzin.Class.Produtos;

@Repository
public interface ProdutosRepository extends JpaRepository<Produtos, Long> {
}
