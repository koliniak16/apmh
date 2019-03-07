package pl.edu.wat.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.model.api.NotificationDto;
import pl.edu.wat.repository.NotificationRepository;
import pl.edu.wat.services.AttractionService;
import pl.edu.wat.services.NotificationService;
import pl.edu.wat.services.mapper.NotificationMapper;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class NotificationServiceImplementation implements NotificationService {

    private final NotificationMapper notificationMapper;
    private final NotificationRepository notificationRepository;
    private final AttractionService attractionService;

    @Override
    public NotificationDto createNotification(NotificationDto notificationDto) {
        attractionService.updateAttraction(notificationDto.getAttraction());
        return notificationMapper.mapToDtoNotification(notificationRepository.save(notificationMapper.mapToDboNotificationCreate(notificationDto)));
    }

    @Override
    public NotificationDto updateNotification(NotificationDto notificationDto) {
        attractionService.updateAttraction(notificationDto.getAttraction());
        notificationRepository.deleteById(new Long(notificationDto.getId()));
        return notificationMapper.mapToDtoNotification(notificationRepository.save(notificationMapper.mapToDboNotificationCreate(notificationDto)));
    }

    @Override
    public List<NotificationDto> getNotifications(Long id_t) {
        return notificationMapper.mapListToDtoNotification(notificationRepository.findAllWorkerNotifications(id_t));
    }


}
