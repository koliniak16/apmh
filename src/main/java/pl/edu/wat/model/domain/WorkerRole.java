package pl.edu.wat.model.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkerRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public WorkerRole(Worker worker, Role role) {
        this.worker = worker;
        this.role = role;
    }
}
