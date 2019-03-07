package pl.edu.wat.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.edu.wat.model.api.AttractionDto;

import java.util.List;

public interface AttractionController {
    @RequestMapping(value = "/attractions",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<AttractionDto> getAttractions();

    @RequestMapping(value = "/attraction/{id}", method = RequestMethod.DELETE)
    Boolean deleteAttraction(@PathVariable Long id);

    @RequestMapping(value = "/attraction/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    AttractionDto createAttraction(AttractionDto attractionDto);

    @RequestMapping(value = "/attraction/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    AttractionDto updateAttraction(AttractionDto attractionDto);
}
