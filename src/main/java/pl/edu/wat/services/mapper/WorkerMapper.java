package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.WorkerDto;
import pl.edu.wat.model.domain.Worker;

import java.util.List;

public interface WorkerMapper {


    List<WorkerDto> mapListToDtoWorker(List<Worker> workers);
    Worker mapToDboWorker(WorkerDto workerDto);
    WorkerDto mapToDtoWorker(Worker worker);
    List<Worker> mapListToDboWorker(List<WorkerDto> workers);
}
