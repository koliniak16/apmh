package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.model.domain.Attraction;

import java.util.List;

public interface AttractionMapper {

    List<AttractionDto> mapListToDtoAttraction(List<Attraction> attractions);
    Attraction mapToDboAttraction(AttractionDto attractionDto);
    AttractionDto mapToDtoAttraction(Attraction attraction);
    List<Attraction> mapListToDboAttraction(List<AttractionDto> attractions);
}
