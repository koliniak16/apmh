package pl.edu.wat.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.edu.wat.model.api.ShiftDto;



import java.util.List;

public interface ShiftController {

    @RequestMapping(value = "/shifts/{today}",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<ShiftDto> getDailyShift(@PathVariable String today);

    @RequestMapping(value = "/shifts/{today}/{id_p}",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<ShiftDto> getDailyShiftPracownik(@PathVariable String today, @PathVariable Long id_p);

    @RequestMapping(value = "/shift/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    List<ShiftDto> updateDailyShift(List<ShiftDto> shifts);

}
