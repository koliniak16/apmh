package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(
            value = "SELECT * FROM notification" +
                    " INNER JOIN attraction on attraction_id = attraction.id" +
                    "         WHERE attraction.active = 1" +
                    "         AND is_closed = false" +
                    "         AND worker_id = :id_t",
            nativeQuery = true)
    List<Notification> findAllWorkerNotifications(@Param("id_t") Long id_t);
}
