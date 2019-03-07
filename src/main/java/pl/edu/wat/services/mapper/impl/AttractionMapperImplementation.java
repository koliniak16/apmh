package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.model.domain.Attraction;
import pl.edu.wat.services.mapper.AttractionMapper;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AttractionMapperImplementation implements AttractionMapper {

    @Override
    public List<Attraction> mapListToDboAttraction(List<AttractionDto> attractions) {
        return attractions.stream().map(this::mapToDboAttraction).collect(Collectors.toList());
    }

    @Override
    public Attraction mapToDboAttraction(AttractionDto attractionDto) {
        if(attractionDto.getId() == null) {
            return new Attraction(attractionDto.getName(), new Integer(attractionDto.getIs_out_of_order()), new Integer(attractionDto.getMaxSeats()), new Integer(attractionDto.getActive()));
        } else {
            return new Attraction(new Long(attractionDto.getId()), attractionDto.getName(), new Integer(attractionDto.getIs_out_of_order()), new Integer(attractionDto.getMaxSeats()), new Integer(attractionDto.getActive()));
        }
    }

    @Override
    public AttractionDto mapToDtoAttraction(Attraction attraction) {
        return new AttractionDto(attraction.getId().toString(), attraction.getName(), attraction.getIs_out_of_order().toString(), attraction.getMaxSeats().toString(), attraction.getActive().toString());
    }

    @Override
    public List<AttractionDto> mapListToDtoAttraction(List<Attraction> attractions) {
        return attractions.stream().map(this::mapToDtoAttraction).collect(Collectors.toList());
    }
    
}
