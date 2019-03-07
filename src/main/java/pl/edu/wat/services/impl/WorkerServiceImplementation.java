package pl.edu.wat.services.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.wat.model.api.WorkerRoleDto;
import pl.edu.wat.model.domain.Worker;
import pl.edu.wat.repository.WorkerRoleRepository;
import pl.edu.wat.services.WorkerService;
import pl.edu.wat.services.mapper.WorkerMapper;
import pl.edu.wat.repository.WorkerRepository;
import pl.edu.wat.services.mapper.WorkerRoleMapper;


import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkerServiceImplementation implements WorkerService {

    private final WorkerRoleRepository workerRoleRepository;
    private final WorkerRepository workerRepository;
    private final WorkerMapper workerMapper;
    private final WorkerRoleMapper workerRoleMapper;


    @Override
    public List<WorkerRoleDto> getWorkers() {
        return workerRoleMapper.mapListToDtoWorkerRole(workerRoleRepository.findAllActiveWorkers());
    }

    @Override
    public List<WorkerRoleDto> getTechnics() {
        return workerRoleMapper.mapListToDtoWorkerRole(workerRoleRepository.findAllTechnics());
    }

    @Override
    public Boolean deleteWorker(Long id) {
        Worker worker = workerRepository.findById(id).orElse(null);
        worker.setActive(0);
        workerRepository.save(worker);
        return true;
    }

    @Override
    public WorkerRoleDto createWorker(WorkerRoleDto workerRoleDto) {
        workerRoleDto.getWorker().setPassword(new BCryptPasswordEncoder().encode(workerRoleDto.getWorker().getPassword()));
        workerMapper.mapToDtoWorker(workerRepository.save(workerMapper.mapToDboWorker(workerRoleDto.getWorker())));
        workerRoleDto.getWorker().setId(workerRepository.findByUsername(workerRoleDto.getWorker().getUsername()).getId().toString());
        return workerRoleMapper.mapToDtoWorkerRole(workerRoleRepository.save(workerRoleMapper.mapToDboWorkerRole(workerRoleDto)));
    }

    @Override
    public WorkerRoleDto updateWorker(WorkerRoleDto workerRoleDto) {
        workerRoleDto.getWorker().setPassword(new BCryptPasswordEncoder().encode(workerRoleDto.getWorker().getPassword()));
        workerMapper.mapToDtoWorker(workerRepository.save(workerMapper.mapToDboWorker(workerRoleDto.getWorker())));
        return workerRoleMapper.mapToDtoWorkerRole(workerRoleRepository.save(workerRoleMapper.mapToDboWorkerRole(workerRoleDto)));
    }

    @Override
    public WorkerRoleDto getUser(String username) {
        return workerRoleMapper.mapToDtoWorkerRole(workerRoleRepository.findByUsername(username));
    }


}
