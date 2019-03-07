package pl.edu.wat.controller.implementation;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.controller.RequestController;
import pl.edu.wat.model.api.RequestDto;
import pl.edu.wat.services.RequestService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class RequestControllerImplementation implements RequestController {

    private final RequestService requestService;

    @Override
    public List<RequestDto> getRequests() {
        return requestService.getRequests();
    }

    @Override
    public List<RequestDto> updateRequest(@RequestBody List<RequestDto> requests){
        return requestService.updateRequest(requests);
    }
}
