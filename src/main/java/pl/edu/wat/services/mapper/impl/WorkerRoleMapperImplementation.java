package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.WorkerRoleDto;
import pl.edu.wat.model.domain.WorkerRole;
import pl.edu.wat.services.mapper.RoleMapper;
import pl.edu.wat.services.mapper.WorkerMapper;
import pl.edu.wat.services.mapper.WorkerRoleMapper;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkerRoleMapperImplementation implements WorkerRoleMapper {

    private final RoleMapper roleMapper;
    private final WorkerMapper workerMapper;


    @Override
    public List<WorkerRole> mapListToDboWorkerRole(List<WorkerRoleDto> workerRoles) {
        return workerRoles.stream().map(this::mapToDboWorkerRole).collect(Collectors.toList());
    }

    @Override
    public WorkerRole mapToDboWorkerRole(WorkerRoleDto workerRoleDto) {
        if (workerRoleDto.getId() == null) {
            return new WorkerRole(workerMapper.mapToDboWorker(workerRoleDto.getWorker()), roleMapper.mapToDboRole(workerRoleDto.getRole()));
        } else {
            return new WorkerRole(new Long(workerRoleDto.getId()), workerMapper.mapToDboWorker(workerRoleDto.getWorker()), roleMapper.mapToDboRole(workerRoleDto.getRole()));
        }
    }

    @Override
    public WorkerRoleDto mapToDtoWorkerRole(WorkerRole workerRole) {
        return new WorkerRoleDto(workerRole.getId().toString(), workerMapper.mapToDtoWorker(workerRole.getWorker()), roleMapper.mapToDtoRole(workerRole.getRole()));
    }

    @Override
    public List<WorkerRoleDto> mapListToDtoWorkerRole(List<WorkerRole> workerRoles) {
        return workerRoles.stream().map(this::mapToDtoWorkerRole).collect(Collectors.toList());
    }
}
