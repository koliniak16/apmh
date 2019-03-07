package pl.edu.wat.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.edu.wat.model.api.RequestDto;

import java.util.List;

public interface RequestController {

    @RequestMapping(value = "/request",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<RequestDto> getRequests();

    @RequestMapping(value = "/request/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    List<RequestDto> updateRequest(List<RequestDto> requests);
}
