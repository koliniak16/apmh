package pl.edu.wat.services;


import pl.edu.wat.model.api.WorkerRoleDto;


import java.util.List;

public interface WorkerService {
    List<WorkerRoleDto> getWorkers();
    Boolean deleteWorker(Long id);
    WorkerRoleDto createWorker(WorkerRoleDto workerRoleDto);
    WorkerRoleDto updateWorker(WorkerRoleDto workerRoleDto);
    List<WorkerRoleDto> getTechnics();
    WorkerRoleDto getUser(String username);
}
