package pl.edu.wat.controller.implementation;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.controller.ShiftController;
import pl.edu.wat.model.api.ShiftDto;
import pl.edu.wat.services.ShiftService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class ShiftControllerImplementation implements ShiftController {

    private final ShiftService shiftService;

    @Override
    public List<ShiftDto> getDailyShift(String today) {
        return shiftService.getDailyShift(today);
    };

    @Override
    public List<ShiftDto> getDailyShiftPracownik(String today, Long id_p) {
        return shiftService.getDailyShiftPracownik(today, id_p);
    };


    @Override
    public List<ShiftDto> updateDailyShift(@RequestBody List<ShiftDto> shifts){
        return shiftService.updateDailyShift(shifts);
    }
}
