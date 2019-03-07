package pl.edu.wat.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonProperty;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerRoleDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("worker")
    private WorkerDto worker;

    @JsonProperty("role")
    private RoleDto role;
}
