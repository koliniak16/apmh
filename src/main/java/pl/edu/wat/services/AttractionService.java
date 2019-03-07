package pl.edu.wat.services;

import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.model.domain.Attraction;

import java.util.List;

public interface AttractionService {
    List<AttractionDto> getAttractions();
    Boolean deleteAttraction(Long id);
    AttractionDto createAttraction(AttractionDto attractionDto);
    AttractionDto updateAttraction(AttractionDto attractionDto);
}
