package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.WorkerRole;

import java.util.List;

@Repository
public interface WorkerRoleRepository extends JpaRepository<WorkerRole, Long> {
    List<WorkerRole> findAllByWorkerId(Long id);

    @Query(
            value = "SELECT * FROM worker_role" +
                    " INNER JOIN worker ON worker_id = worker.id" +
                    " INNER JOIN role ON role_id = role.id" +
                    " WHERE role.position = 'Technik'" +
                    " AND   worker.active = 1",
            nativeQuery = true
    )
    List<WorkerRole> findAllTechnics();

    @Query(
            value = "SELECT * FROM worker_role" +
                    "         INNER JOIN worker ON worker_id = worker.id" +
                    "         WHERE worker.active = 1",
            nativeQuery = true)
    List<WorkerRole> findAllActiveWorkers();

    @Query(
            value = "SELECT * FROM worker_role" +
                    " INNER JOIN worker on worker_id = worker.id" +
                    " INNER JOIN role on role_id = role.id" +
                    " WHERE worker.username = :username",
            nativeQuery = true)
    WorkerRole findByUsername(String username);
}
