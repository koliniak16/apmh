package pl.edu.wat.controller.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.model.domain.Role;
import pl.edu.wat.repository.RoleRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RoleControllerImplementation {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/roles/")
    public List<Role> getRoles(){
        return roleRepository.findAll();
    }

    @GetMapping("/role/{id}")
    public Optional<Role> getRole(@PathVariable Long id){
        return roleRepository.findById(id);
    }

    @DeleteMapping("/role/{id}")
    public boolean deleteRole(@PathVariable Long id){
        roleRepository.deleteById(id);
        return true;
    }

    @PostMapping("/role/")
    public Role createRole(Role role){
        return roleRepository.save(role);
    }

    @PutMapping("/role/")
    public Role updateRole(Role role){
        return roleRepository.save(role);
    }
}
