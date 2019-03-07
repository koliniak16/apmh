package pl.edu.wat.model.domain;

import lombok.*;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private Integer taken_seats;

    @ManyToOne
    @JoinColumn(name = "worker_id", nullable = true)
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "attraction_id", nullable = true)
    private Attraction attraction;

    public Shift(LocalDate date, Integer taken_seats, Worker worker, Attraction attraction) {
        this.date = date;
        this.taken_seats = taken_seats;
        this.worker = worker;
        this.attraction = attraction;
    }
}
