package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.ShiftDto;
import pl.edu.wat.model.domain.Shift;

import java.util.List;

public interface ShiftMapper {

    List<ShiftDto> mapListToDtoShift(List<Shift> shifts);
    Shift mapToDboShift(ShiftDto shiftDto);
    ShiftDto mapToDtoShift(Shift shift);
    List<Shift> mapListToDboShift(List<ShiftDto> shifts);
}
