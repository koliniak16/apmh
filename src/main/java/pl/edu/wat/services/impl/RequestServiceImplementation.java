package pl.edu.wat.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.model.api.RequestDto;
import pl.edu.wat.repository.RequestRepository;
import pl.edu.wat.services.RequestService;
import pl.edu.wat.services.mapper.RequestMapper;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RequestServiceImplementation implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;

    @Override
    public List<RequestDto> getRequests() {
        return requestMapper.mapListToDtoRequest(requestRepository.getRequests());
    }

    @Override
    public List<RequestDto> updateRequest(List<RequestDto> requests) {
        return requestMapper.mapListToDtoRequest(requestRepository.saveAll(requestMapper.mapListToDboRequest(requests)));
    }
}
