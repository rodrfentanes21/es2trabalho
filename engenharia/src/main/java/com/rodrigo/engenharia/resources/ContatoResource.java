package com.rodrigo.engenharia.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rodrigo.engenharia.entities.Contato;
import com.rodrigo.engenharia.repositories.ContatoRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/contatos")
public class ContatoResource {
	
	@Autowired
	private ContatoRepository contato;
	
	@GetMapping
	public ResponseEntity<List<Contato>> findAll(){
		List<Contato> list = contato.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<Contato> insertContato(@RequestBody Contato obj){
		obj = contato.save(obj);
		return ResponseEntity.created(null).body(obj);
	}
	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Contato> updateContato(@RequestBody Contato obj, @PathVariable Integer id){
	    Contato cont = contato.getReferenceById(id);
	    cont.setName(obj.getName());
	    cont.setEndereco(obj.getEndereco());
	    cont.setTelefone(obj.getTelefone());	
	    contato.save(cont);
	    return ResponseEntity.ok().body(cont);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteContato(@PathVariable Integer id) {
		contato.deleteById(id);
		return ResponseEntity.noContent().build();	
	}
	
}
