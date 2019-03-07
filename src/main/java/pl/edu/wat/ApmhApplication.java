package pl.edu.wat;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApmhApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ApmhApplication.class, args);
    }

    @Override
    public void run(String... args) {

    }
}
