package com.YellowExpress.Yellowzin.Class;

import java.util.*;
import jakarta.persistence.*;

@Entity
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "produto_seq")
    @SequenceGenerator(name = "produto_seq", sequenceName = "produto_sequence", allocationSize = 1)
    private Long id;

    private String nomeProduto;
    private String descricaoProduto;
    private double valorProduto;
    private String uniMedida;
    private String categoria;
    private String avaliacao;
    private String img;
    private String descricaoDetalhada;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedidos> pedidos = new ArrayList<>();

    @ManyToMany
    private Set<Clientes> clientes = new HashSet<>();

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public String getDescricaoProduto() {
        return descricaoProduto;
    }

    public void setDescricaoProduto(String descricaoProduto) {
        this.descricaoProduto = descricaoProduto;
    }

    public double getValorProduto() {
        return valorProduto;
    }

    public void setValorProduto(double valorProduto) {
        this.valorProduto = valorProduto;
    }

    public String getUniMedida() {
        return uniMedida;
    }

    public void setUniMedida(String uniMedida) {
        this.uniMedida = uniMedida;
    }

    public String getcategoria() {
        return categoria;
    }

    public void setcategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getDescricaoDetalhada() {
        return descricaoDetalhada;
    }

    public void setDescricaoDetalhada(String descricaoDetalhada) {
        this.descricaoDetalhada = descricaoDetalhada;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public List<Pedidos> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedidos> pedidos) {
        this.pedidos = pedidos;
    }

    public Set<Clientes> getClientes() {
        return clientes;
    }

    public void setClientes(Set<Clientes> clientes) {
        this.clientes = clientes;
    }

    public Produtos() {
    }

    public Produtos(Long id) {
        this.id = id;
    }

    public void cadastrarProduto(String nomeProduto, String descricaoProduto, double valorProduto, String uniMedida, String categoria, String avaliacao, String img, String descricaoDetalhada) {
        this.nomeProduto = nomeProduto;
        this.descricaoProduto = descricaoProduto;
        this.valorProduto = valorProduto;
        this.uniMedida = uniMedida;
        this.categoria = categoria;
        this.avaliacao = avaliacao;
        this.img = img;
        this.descricaoDetalhada = descricaoDetalhada;
    }
}
