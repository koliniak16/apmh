package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.NotificationDto;
import pl.edu.wat.model.domain.Notification;

import java.util.List;

public interface NotificationMapper {

    List<NotificationDto> mapListToDtoNotification(List<Notification> notifications);
    Notification mapToDboNotificationCreate(NotificationDto notificationDto);
    Notification mapToDboNotificationClose(NotificationDto notificationDto);
    NotificationDto mapToDtoNotification(Notification notification);
    List<Notification> mapListToDboNotification(List<NotificationDto> notifications);

}
