package pl.edu.wat.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Worker findByUsername(String username);
}