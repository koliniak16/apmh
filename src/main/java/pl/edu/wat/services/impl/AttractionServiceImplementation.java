package pl.edu.wat.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.model.domain.Attraction;
import pl.edu.wat.repository.AttractionRepository;
import pl.edu.wat.services.AttractionService;
import pl.edu.wat.services.mapper.AttractionMapper;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AttractionServiceImplementation implements AttractionService {

    private final AttractionRepository attractionRepository;

    private final AttractionMapper attractionMapper;


    @Override
    public List<AttractionDto> getAttractions() {
        return attractionMapper.mapListToDtoAttraction(attractionRepository.findAllActiveAttractions());
    }

    @Override
    public Boolean deleteAttraction(Long id) {
        Attraction attraction = attractionRepository.findById(id).orElse(null);
        attraction.setActive(0);
        attractionRepository.save(attraction);
        return true;
    }

    @Override
    public AttractionDto createAttraction(AttractionDto attractionDto) {
        return attractionMapper.mapToDtoAttraction(attractionRepository.save(attractionMapper.mapToDboAttraction(attractionDto)));
    }

    @Override
    public AttractionDto updateAttraction(AttractionDto attractionDto) {
        return attractionMapper.mapToDtoAttraction(attractionRepository.save(attractionMapper.mapToDboAttraction(attractionDto)));
    }

}
