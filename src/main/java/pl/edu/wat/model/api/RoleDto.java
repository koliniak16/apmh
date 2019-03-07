package pl.edu.wat.model.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("position")
    private String position;

}
