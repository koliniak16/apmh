package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.WorkerDto;
import pl.edu.wat.model.domain.Worker;
import pl.edu.wat.services.mapper.WorkerMapper;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkerMapperImplementation implements WorkerMapper {

    @Override
    public List<Worker> mapListToDboWorker(List<WorkerDto> workers) {
        return workers.stream().map(this::mapToDboWorker).collect(Collectors.toList());
    }

    @Override
    public Worker mapToDboWorker(WorkerDto workerDto) {
        if(workerDto.getId() == null) {
            return new Worker(workerDto.getSurname(), workerDto.getName(), workerDto.getPassword(), workerDto.getUsername(), workerDto.getToken(), Integer.parseInt(workerDto.getActive()), workerDto.getPhoneNumber());
        } else {
            return new Worker(new Long(workerDto.getId()), workerDto.getSurname(), workerDto.getName(), workerDto.getPassword(), workerDto.getUsername(), workerDto.getToken(), Integer.parseInt(workerDto.getActive()), workerDto.getPhoneNumber());
        }
    }

    @Override
    public WorkerDto mapToDtoWorker(Worker worker) {
        return new WorkerDto(worker.getId().toString(),worker.getSurname(),worker.getName(),worker.getPassword(),worker.getUsername(),worker.getToken(),worker.getActive().toString(),worker.getName() + ' ' + worker.getSurname(), worker.getPhoneNumber());
    }

    @Override
    public List<WorkerDto> mapListToDtoWorker(List<Worker> workers) {
        return workers.stream().map(this::mapToDtoWorker).collect(Collectors.toList());
    }

}
