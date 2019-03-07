package pl.edu.wat.model.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttractionDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("is_out_of_order")
    private String is_out_of_order;

    @JsonProperty("maxSeats")
    private String maxSeats;

    @JsonProperty("active")
    private String active;


}
