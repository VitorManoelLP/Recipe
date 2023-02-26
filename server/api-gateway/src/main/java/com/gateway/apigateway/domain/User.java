package com.gateway.apigateway.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.UUID;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @NotNull(message = "Nome não pode ser vazio!")
    @Column
    private String nome;

    @Email(message = "Email inválido")
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    @Length(min = 8, max = 16, message = "Senha inválida")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-=]).{8,}$", message = "Senha inválida")
    private String password;

}
