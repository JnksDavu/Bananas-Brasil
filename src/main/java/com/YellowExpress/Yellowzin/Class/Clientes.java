package com.YellowExpress.Yellowzin.Class;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import com.YellowExpress.Yellowzin.Class.Produtos;
import com.YellowExpress.Yellowzin.Utils.PasswordUtils;

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
    private Long numero_casa;

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

    public Long getnumero_casa() {
        return numero_casa;
    }

    public Clientes() {
    }

    public Clientes(Long id) {
        this.id = id;
    }

    public void criarUsuarioCliente(String nome, String senha, String usuario, String cep, Date dt_nascimento, String genero, long numero_casa) {
        this.nome = nome;
        this.senha = PasswordUtils.hashPassword(senha);
        this.usuario = usuario;
        this.cep = cep;
        this.dt_nascimento = dt_nascimento;
        this.genero = genero;
        this.numero_casa = numero_casa;
    }

    public void alterarNomeCliente(String novoNome) {
        this.nome = novoNome;
    }

    public boolean verificarSenha(String senha) {
        return PasswordUtils.verifyPassword(senha, this.senha);
    }

    public void alterarSenhaCliente(String novaSenha) {
        this.senha = PasswordUtils.hashPassword(novaSenha);
    }

    public void alterarCepCliente(String novoCep) {
        this.cep = novoCep;
    }

    public void alterardt_nascimentoCliente(Date novodt_nascimento) {
        this.dt_nascimento = novodt_nascimento;
    }

    public void alterarGeneroCliente(String novoGenero) {
        this.genero = novoGenero;
    }

    public void alterarnumero_casaCliente(Long novonumero_casa) {
        this.numero_casa = novonumero_casa;
    }
}
