package pl.edu.wat.model.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Boolean is_closed;
    @Column(nullable = false)
    private LocalDate opening_date;
    @Column(nullable = true)
    private LocalDate closure_date = null;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    public Notification(Boolean is_closed, LocalDate opening_date, Worker worker, Attraction attraction) {
        this.is_closed = is_closed;
        this.opening_date = opening_date;
        this.worker = worker;
        this.attraction = attraction;
    }

    public Notification(Boolean is_closed, LocalDate opening_date, LocalDate closure_date, Worker worker, Attraction attraction) {
        this.is_closed = is_closed;
        this.opening_date = opening_date;
        this.closure_date = closure_date;
        this.worker = worker;
        this.attraction = attraction;
    }
}
