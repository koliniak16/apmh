package pl.edu.wat.model.domain;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Worker {
//    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = true)
    private String token;
    @Column(nullable = true)
    private Integer active;
    @Column(nullable = false)
    private String phoneNumber;

    public Worker(String surname, String name, String password, String username, String token, Integer active, String phoneNumber) {
        this.surname = surname;
        this.name = name;
        this.password = password;
        this.username = username;
        this.token = token;
        this.active = active;
        this.phoneNumber = phoneNumber;
    }
}
