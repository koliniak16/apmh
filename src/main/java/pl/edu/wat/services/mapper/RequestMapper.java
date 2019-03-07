package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.RequestDto;
import pl.edu.wat.model.domain.Request;

import java.util.List;

public interface RequestMapper {

    List<RequestDto> mapListToDtoRequest(List<Request> requests);
    Request mapToDboRequest(RequestDto requestDto);
    RequestDto mapToDtoRequest(Request request);
    List<Request> mapListToDboRequest(List<RequestDto> requests);
}
