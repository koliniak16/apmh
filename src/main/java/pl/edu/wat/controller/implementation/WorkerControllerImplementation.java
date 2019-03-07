package pl.edu.wat.controller.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.model.api.WorkerRoleDto;
import pl.edu.wat.controller.WorkerController;
import pl.edu.wat.services.WorkerService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class WorkerControllerImplementation implements WorkerController {

    private final WorkerService workerService;

    @Override
    public List<WorkerRoleDto> getWorkers(){
        return workerService.getWorkers();
    }

    @Override
    public List<WorkerRoleDto> getTechnics(){
        return workerService.getTechnics();
    }

    @Override
    public Boolean deleteWorker(@PathVariable Long id){
        workerService.deleteWorker(id);
        return true;
    }

    @Override
    public WorkerRoleDto createWorker(@RequestBody WorkerRoleDto workerDto){
        return workerService.createWorker(workerDto);
    }

    @Override
    public WorkerRoleDto updateWorker(@RequestBody WorkerRoleDto workerDto){
        return workerService.updateWorker(workerDto);
    }

    @Override
    public WorkerRoleDto getUser(@PathVariable String username){
        return workerService.getUser(username);
    }


}
