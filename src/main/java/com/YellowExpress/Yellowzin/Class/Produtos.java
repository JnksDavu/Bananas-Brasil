package com.YellowExpress.Yellowzin.Class;

import java.util.*;

import jakarta.persistence.*;

import com.YellowExpress.Yellowzin.Class.Clientes;

@Entity
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeProduto;
    private String descricaoProduto;
    private double valorProduto;
    private String uniMedida;
    private String classificacao;
    private String avaliacao;
    private String img;

    @ManyToMany
    private Set<Clientes> clientes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public String getDescricaoProduto() {
        return descricaoProduto;
    }

    public double getValorProduto() {
        return valorProduto;
    }

    public String getUniMedidaProduto() {
        return uniMedida;
    }

    public String getClassificacaoProduto() {
        return classificacao;
    }

    public String getAvaliacaoProduto() {
        return avaliacao;
    }

    public String getImg(){
        return img;
    }

    public Produtos() {
    }

    public Produtos(Long id) {
        this.id = id;
    }

    public void cadastrarProduto(String nomeProduto, String descricaoProduto, double valorProduto,String uniMedida,String classificacao,String avaliacao, String img){
        this.nomeProduto = nomeProduto;
        this.descricaoProduto = descricaoProduto;
        this.valorProduto = valorProduto;
        this.uniMedida = uniMedida;
        this.classificacao = classificacao;
        this.avaliacao = avaliacao;
        this.img = img;
    }
    
    
}
