package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.ShiftDto;
import pl.edu.wat.model.domain.Shift;
import pl.edu.wat.services.mapper.AttractionMapper;
import pl.edu.wat.services.mapper.ShiftMapper;
import pl.edu.wat.services.mapper.WorkerMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ShiftMapperImplementation implements ShiftMapper {

    private final WorkerMapper workerMapper;
    private final AttractionMapper attractionMapper;

    @Override
    public List<Shift> mapListToDboShift(List<ShiftDto> shifts) {
        return shifts.stream().map(this::mapToDboShift).collect(Collectors.toList());
    }

    @Override
    public Shift mapToDboShift(ShiftDto shiftDto) {
        LocalDate localDate = LocalDate.parse(shiftDto.getDate());
        if (shiftDto.getId() == null) {
            return new Shift(localDate, new Integer(shiftDto.getTaken_seats()), workerMapper.mapToDboWorker(shiftDto.getWorker()), attractionMapper.mapToDboAttraction(shiftDto.getAttraction()));
        } else {
            return new Shift(new Long(shiftDto.getId()), localDate, new Integer(shiftDto.getTaken_seats()), workerMapper.mapToDboWorker(shiftDto.getWorker()), attractionMapper.mapToDboAttraction(shiftDto.getAttraction()));
        }
    }

    @Override
    public ShiftDto mapToDtoShift(Shift shift) {
        if ( shift.getWorker() != null ) {
        return new ShiftDto(shift.getId().toString(),shift.getDate().toString(), shift.getTaken_seats().toString(), workerMapper.mapToDtoWorker(shift.getWorker()), attractionMapper.mapToDtoAttraction(shift.getAttraction())); }
        else {
            return new ShiftDto(shift.getId().toString()); }
    }


    @Override
    public List<ShiftDto> mapListToDtoShift(List<Shift> shifts) {
        return shifts.stream().map(this::mapToDtoShift).collect(Collectors.toList());
    }
    
}
