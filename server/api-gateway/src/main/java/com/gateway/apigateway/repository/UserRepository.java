package com.gateway.apigateway.repository;

import com.gateway.apigateway.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Transactional
    default User findOneThrow(String email) {
        return findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
    }

}
