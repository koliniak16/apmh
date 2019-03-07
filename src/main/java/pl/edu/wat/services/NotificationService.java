package pl.edu.wat.services;

import pl.edu.wat.model.api.NotificationDto;

import java.util.List;

public interface NotificationService {

    NotificationDto createNotification(NotificationDto notificationDto);
    NotificationDto updateNotification(NotificationDto notificationDto);
    List<NotificationDto> getNotifications(Long id_t);

}
