package pl.edu.wat.services;

import pl.edu.wat.model.api.ShiftDto;

import java.util.List;

public interface ShiftService {
    List<ShiftDto> getDailyShift(String today);
    List<ShiftDto> getDailyShiftPracownik(String today, Long id_p);
    List<ShiftDto> updateDailyShift(List<ShiftDto> shifts);
}
