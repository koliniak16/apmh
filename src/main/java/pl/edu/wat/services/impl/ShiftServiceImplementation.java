package pl.edu.wat.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.model.api.AttractionDto;
import pl.edu.wat.model.api.ShiftDto;
import pl.edu.wat.model.api.WorkerDto;
import pl.edu.wat.repository.AttractionRepository;
import pl.edu.wat.repository.ShiftRepository;
import pl.edu.wat.services.ShiftService;
import pl.edu.wat.services.mapper.AttractionMapper;
import pl.edu.wat.services.mapper.ShiftMapper;


import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ShiftServiceImplementation implements ShiftService {

    private final ShiftMapper shiftMapper;
    private final ShiftRepository shiftRepository;
    private final AttractionMapper attractionMapper;
    private final AttractionRepository attractionRepository;

    @Override
    public List<ShiftDto> getDailyShift(String today) throws IndexOutOfBoundsException, NullPointerException {

        List<ShiftDto> listShift = shiftMapper.mapListToDtoShift(shiftRepository.findDailyShift(today));
        List<AttractionDto> listAttraction = attractionMapper.mapListToDtoAttraction(attractionRepository.findAllActiveAttractions());
        List<ShiftDto> returnList = new ArrayList<>();
        ShiftDto appendList = new ShiftDto();
        int j = 0;

            for (int i = 0; i < listAttraction.size(); i++) {

                appendList = new ShiftDto();

                try {
                    if (listShift.size() > 0 && listAttraction.get(i).getId().equals(listShift.get(j).getAttraction().getId())) {
                        appendList.setDate(today);
                        appendList.setTaken_seats(listShift.get(j).getTaken_seats());
                        appendList.setWorker(listShift.get(j).getWorker());
                        appendList.setAttraction(listShift.get(j).getAttraction());
                        appendList.setId(listShift.get(j).getId());
                        j++;
                    } else {
                        appendList.setDate(today);
                        appendList.setTaken_seats("");
                        appendList.setWorker(new WorkerDto("", "", "", "", "", "", "", "", ""));
                        appendList.setAttraction(listAttraction.get(i));
                    }
                } catch(IndexOutOfBoundsException e) {
                    appendList.setDate(today);
                    appendList.setTaken_seats("");
                    appendList.setWorker(new WorkerDto("", "", "", "", "", "", "", "", ""));
                    appendList.setAttraction(listAttraction.get(i));
                 }
                returnList.add(appendList);
            }

        return returnList;
    };

    @Override
    public List<ShiftDto> updateDailyShift(List<ShiftDto> shifts) {

        return shiftMapper.mapListToDtoShift(shiftRepository.saveAll(shiftMapper.mapListToDboShift(shifts)));
    }

    @Override
    public List<ShiftDto> getDailyShiftPracownik(String today, Long id_p) {

        try {
            return shiftMapper.mapListToDtoShift(shiftRepository.findDailyShiftPracownik(today, id_p));
        } catch (NullPointerException e){
            return new ArrayList<ShiftDto>();
        }

    };

  }