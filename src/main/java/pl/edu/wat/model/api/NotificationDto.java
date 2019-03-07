package pl.edu.wat.model.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("is_closed")
    private String is_closed;

    @JsonProperty("opening_date")
    private String opening_date;

    @JsonProperty("closure_date")
    private String closure_date;

    @JsonProperty("worker")
    private WorkerDto worker;

    @JsonProperty("attraction")
    private AttractionDto attraction;

    public NotificationDto(String id, String is_closed, String opening_date, WorkerDto worker, AttractionDto attraction) {
        this.id = id;
        this.is_closed = is_closed;
        this.opening_date = opening_date;
        this.worker = worker;
        this.attraction = attraction;
    }
}
