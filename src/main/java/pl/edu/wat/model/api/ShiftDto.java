package pl.edu.wat.model.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShiftDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("date")
    @JsonFormat(timezone="CET")
    private String date;

    @JsonProperty("taken_seats")
    private String taken_seats;

    @JsonProperty("worker")
    private WorkerDto worker;

    @JsonProperty("attraction")
    private AttractionDto attraction;

    public ShiftDto(String id) {
        this.id = id;
    }
}
