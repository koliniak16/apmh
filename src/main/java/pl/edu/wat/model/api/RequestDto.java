package pl.edu.wat.model.api;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("is_closed")
    private String is_closed;

    @JsonProperty("opening_date")
    private String opening_date;

    @JsonProperty("worker")
    private WorkerDto worker;

    @JsonProperty("attraction")
    private AttractionDto attraction;

    @JsonProperty("shift")
    private ShiftDto shift;
}
