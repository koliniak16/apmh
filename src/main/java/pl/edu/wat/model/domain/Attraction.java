package pl.edu.wat.model.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Integer is_out_of_order;
    @Column(nullable = true)
    private Integer maxSeats;
    @Column(nullable = false)
    private Integer active;

    public Attraction(String name, Integer is_out_of_order, Integer maxSeats, Integer active) {
        this.name = name;
        this.is_out_of_order = is_out_of_order;
        this.maxSeats = maxSeats;
        this.active = active;
    }
}
