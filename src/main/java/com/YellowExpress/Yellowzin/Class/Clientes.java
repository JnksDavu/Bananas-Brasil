package com.YellowExpress.Yellowzin.Class;

import java.util.*;

import jakarta.persistence.*;

import com.YellowExpress.Yellowzin.Class.Produtos;

@Entity
public class Clientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String senha;
    private String nome;
    private Date dt_nascimento;
    private String genero;
    private String cep;
    private Long Numero_casa;

    @ManyToMany(mappedBy = "clientes")
    private Set<Produtos> salas = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getCep() {
        return cep;
    }

    public Date getdt_nascimento() {
        return dt_nascimento;
    }

    public String getGenero() {
        return genero;
    }

    public Long getNumero_casa() {
        return Numero_casa;
    }

    

    //Criar um usuario, não precisa declarar os setter se são definidos diretamente no usuario
    public void criarUsuarioCliente(String nome, String senha, String usuario, String cep, Date dt_nascimento, String genero, long Numero_casa){
        this.nome = nome;
        this.senha = senha;
        this.usuario = usuario;
        this.cep = cep;
        this.dt_nascimento = dt_nascimento;
        this.genero = genero;
        this.Numero_casa = Numero_casa;
    }

    public void alterarNomeCliente(String novoNome){
        this.nome = novoNome;
    }

    public void alterarSenhaCliente(String novaSenha){
        this.nome = novaSenha;
    }

    public void alterarCepCliente(String novoCep){
        this.cep = novoCep;
    }
    
    public void alterardt_nascimentoCliente(Date novodt_nascimento){
        this.dt_nascimento = novodt_nascimento;
    }
    
    public void alterarGeneroCliente(String novoGenero){
        this.genero = novoGenero;
    }

    public void alterarNumero_casaCliente(Long novoNumero_casa){
        this.Numero_casa = novoNumero_casa;
    }
    
}