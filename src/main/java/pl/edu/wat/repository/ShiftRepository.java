package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Attraction;
import pl.edu.wat.model.domain.Shift;


import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

    @Query(
            value = " SELECT * FROM attraction LEFT JOIN shift ON attraction.id = shift.attraction_id" +
                    " LEFT JOIN worker ON shift.worker_id = worker.id" +
                    " WHERE DATE(shift.date) = :today" +
                    " AND worker.active = 1" +
                    " AND attraction.active = 1" +
                    "  ORDER BY attraction.name",
                    nativeQuery = true
    )
    List<Shift> findDailyShift(@Param("today") String today);

    @Query(
            value = " SELECT * FROM shift LEFT JOIN attraction ON shift.attraction_id = attraction.id" +
                    " LEFT JOIN worker ON shift.worker_id = worker.id" +
                    " WHERE DATE(shift.date) = :today" +
                    " AND worker.active = 1" +
                    " AND attraction.active = 1" +
                    " AND worker_id = :id_p" +
                    "  ORDER BY attraction.name",
            nativeQuery = true
    )
    List<Shift> findDailyShiftPracownik(@Param("today") String today, @Param("id_p") Long id_p);

    @Query(
            value = "SELECT * FROM attraction" +
                    "         WHERE attraction.active = 1" +
                    " ORDER BY attraction.name",
            nativeQuery = true)
    List<Attraction> findDailyShiftAttractions();



}
