package pl.edu.wat.model.domain;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Boolean is_closed;
    @Column(nullable = false)
    private LocalDate opening_date;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @ManyToOne
    @JoinColumn(name="shift_id")
    private Shift shift;


    public Request(Boolean is_closed, LocalDate opening_date, Worker worker, Attraction attraction, Shift shift) {
        this.is_closed = is_closed;
        this.opening_date = opening_date;
        this.worker = worker;
        this.attraction = attraction;
        this.shift = shift;
    }
}
