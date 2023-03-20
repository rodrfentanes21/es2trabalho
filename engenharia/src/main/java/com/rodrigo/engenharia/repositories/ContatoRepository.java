package com.rodrigo.engenharia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodrigo.engenharia.entities.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer>{

}
