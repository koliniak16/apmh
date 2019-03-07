package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Request;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(
            value = "SELECT * FROM request" +
                    " LEFT JOIN attraction on attraction_id = attraction.id" +
                    " LEFT JOIN worker on worker_id = worker.id" +
                    " LEFT JOIN shift on shift_id = shift.id" +
                    "         WHERE attraction.active = 1" +
                    "         AND is_closed = false",
            nativeQuery = true)
    List<Request> getRequests();
}
