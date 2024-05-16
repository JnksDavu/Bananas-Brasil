package com.YellowExpress.Yellowzin.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.YellowExpress.Yellowzin.Class.Produtos;

@Repository
public interface ProdutosRepository extends CrudRepository<Produtos, Long>{
    
}
