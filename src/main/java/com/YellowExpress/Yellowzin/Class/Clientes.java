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

    //Criar um usuario, não precisa declarar os setter se são definidos diretamente no usuario
    public void criarUsuarioCliente(String nome, String senha, String usuario){
        this.nome = nome;
        this.senha = senha;
        this.usuario = usuario;
    }

    public void alterarNomeCliente(String novoNome){
        this.nome = novoNome;
    }

    public void alterarSenhaCliente(String novaSenha){
        this.nome = novaSenha;
    }

    public void alterarUsuarioCliente(String novoUsuario){
        this.nome = novoUsuario;
    }
    
}
