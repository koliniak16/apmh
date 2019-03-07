package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.WorkerRoleDto;
import pl.edu.wat.model.domain.WorkerRole;

import java.util.List;

public interface WorkerRoleMapper {

    List<WorkerRoleDto> mapListToDtoWorkerRole(List<WorkerRole> workerRoles);
    WorkerRole mapToDboWorkerRole(WorkerRoleDto workerRoleDto);
    WorkerRoleDto mapToDtoWorkerRole(WorkerRole workerRole);
    List<WorkerRole> mapListToDboWorkerRole(List<WorkerRoleDto> workerRoles);

}
