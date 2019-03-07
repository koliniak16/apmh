package pl.edu.wat.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.edu.wat.model.api.WorkerRoleDto;

import java.util.List;

public interface WorkerController {
    @RequestMapping(value = "/workers",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<WorkerRoleDto> getWorkers();

    @RequestMapping(value = "/technics",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<WorkerRoleDto> getTechnics();

    @RequestMapping(value = "/worker/{id}", method = RequestMethod.DELETE)
    Boolean deleteWorker(@PathVariable Long id);

    @RequestMapping(value = "/worker/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    WorkerRoleDto createWorker(WorkerRoleDto workerDto);

    @RequestMapping(value = "/worker/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    WorkerRoleDto updateWorker(WorkerRoleDto workerDto);

    @RequestMapping(value = "/worker/{username}",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    WorkerRoleDto getUser(@PathVariable String username);
}
