package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.RequestDto;
import pl.edu.wat.model.domain.Request;
import pl.edu.wat.services.mapper.AttractionMapper;
import pl.edu.wat.services.mapper.RequestMapper;
import pl.edu.wat.services.mapper.ShiftMapper;
import pl.edu.wat.services.mapper.WorkerMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RequestMapperImplementation implements RequestMapper {

    private final WorkerMapper workerMapper;
    private final AttractionMapper attractionMapper;
    private final ShiftMapper shiftMapper;

    @Override
    public List<Request> mapListToDboRequest(List<RequestDto> requests) {
        return requests.stream().map(this::mapToDboRequest).collect(Collectors.toList());
    }

    @Override
    public Request mapToDboRequest(RequestDto requestDto) {
        LocalDate localDate = LocalDate.parse(requestDto.getOpening_date());
        if (requestDto.getId() == null) {
            return new Request(new Boolean(requestDto.getIs_closed()), localDate, workerMapper.mapToDboWorker(requestDto.getWorker()), attractionMapper.mapToDboAttraction(requestDto.getAttraction()), shiftMapper.mapToDboShift(requestDto.getShift()));
        } else {
            return new Request(new Long(requestDto.getId()), new Boolean(requestDto.getIs_closed()), localDate, workerMapper.mapToDboWorker(requestDto.getWorker()), attractionMapper.mapToDboAttraction(requestDto.getAttraction()), shiftMapper.mapToDboShift(requestDto.getShift()));
        }
    }

    @Override
    public RequestDto mapToDtoRequest(Request request) {
            return new RequestDto(request.getId().toString(), request.getIs_closed().toString(), request.getOpening_date().toString(), workerMapper.mapToDtoWorker(request.getWorker()), attractionMapper.mapToDtoAttraction(request.getAttraction()), shiftMapper.mapToDtoShift(request.getShift()));
    }



    @Override
    public List<RequestDto> mapListToDtoRequest(List<Request> requests) {
        return requests.stream().map(this::mapToDtoRequest).collect(Collectors.toList());
    }
}
