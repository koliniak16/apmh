package pl.edu.wat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.wat.model.domain.Attraction;

import java.util.List;

@Repository
public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    @Query(
            value = "SELECT * FROM attraction" +
                    "         WHERE attraction.active = 1" +
                    "  ORDER BY attraction.name",
            nativeQuery = true)
    List<Attraction> findAllActiveAttractions();


}
