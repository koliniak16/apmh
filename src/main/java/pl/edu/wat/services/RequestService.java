package pl.edu.wat.services;

import pl.edu.wat.model.api.RequestDto;

import java.util.List;

public interface RequestService {

    List<RequestDto> getRequests();
    List<RequestDto> updateRequest(List<RequestDto> requests);

}