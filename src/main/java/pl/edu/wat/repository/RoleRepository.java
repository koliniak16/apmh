package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
