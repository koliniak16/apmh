package pl.edu.wat.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.wat.model.domain.Worker;
import pl.edu.wat.model.domain.WorkerRole;
import pl.edu.wat.repository.WorkerRepository;
import pl.edu.wat.repository.WorkerRoleRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Primary
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private WorkerRoleRepository workerRoleRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username){
        Worker worker = workerRepository.findByUsername(username);
        if(worker == null)
            throw new UsernameNotFoundException("User not found");
        return new org.springframework.security.core.userdetails.User(
                        worker.getUsername(),
                        worker.getPassword(),
                        convertAuthorities(workerRoleRepository.findAllByWorkerId(worker.getId())));
    }

    private Set<GrantedAuthority> convertAuthorities(List<WorkerRole> workerRoles) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for(WorkerRole ua: workerRoles) {
            authorities.add(new SimpleGrantedAuthority(ua.getRole().getPosition().toString()));
        }
        return authorities;
    }
}