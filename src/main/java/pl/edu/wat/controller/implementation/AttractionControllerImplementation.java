package pl.edu.wat.controller.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.controller.AttractionController;
import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.services.AttractionService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class AttractionControllerImplementation implements AttractionController {

    private final AttractionService attractionService;

    @Override
    public List<AttractionDto> getAttractions(){
        return attractionService.getAttractions();
    }

    @Override
    public Boolean deleteAttraction(@PathVariable Long id){
        return attractionService.deleteAttraction(id);
    }

    @Override
    public AttractionDto createAttraction(@RequestBody AttractionDto attractionDto){
        return attractionService.createAttraction(attractionDto);
    }

    @Override
    public AttractionDto updateAttraction(@RequestBody AttractionDto attractionDto){
        return attractionService.updateAttraction(attractionDto);
    }

}
