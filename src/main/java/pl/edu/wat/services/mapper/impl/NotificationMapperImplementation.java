package pl.edu.wat.services.mapper.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.NotificationDto;
import pl.edu.wat.model.domain.Notification;
import pl.edu.wat.services.mapper.AttractionMapper;
import pl.edu.wat.services.mapper.NotificationMapper;
import pl.edu.wat.services.mapper.WorkerMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class NotificationMapperImplementation implements NotificationMapper {

    private final WorkerMapper workerMapper;
    private final AttractionMapper attractionMapper;

    @Override
    public List<Notification> mapListToDboNotification(List<NotificationDto> notifications) {
        return notifications.stream().map(this::mapToDboNotificationClose).collect(Collectors.toList());
    }

    @Override
    public Notification mapToDboNotificationCreate(NotificationDto notificationDto) {
        LocalDate opening_date = LocalDate.parse(notificationDto.getOpening_date());
        if (notificationDto.getClosure_date() != null) {
            LocalDate closure_date = LocalDate.parse(notificationDto.getClosure_date());
            return new Notification(new Boolean(notificationDto.getIs_closed()), opening_date, closure_date, workerMapper.mapToDboWorker(notificationDto.getWorker()), attractionMapper.mapToDboAttraction(notificationDto.getAttraction()));
        } else {
            return new Notification(new Boolean(notificationDto.getIs_closed()), opening_date, workerMapper.mapToDboWorker(notificationDto.getWorker()), attractionMapper.mapToDboAttraction(notificationDto.getAttraction()));
        }

    }

    @Override
    public Notification mapToDboNotificationClose(NotificationDto notificationDto) {
        LocalDate opening_date = LocalDate.parse(notificationDto.getOpening_date());
            LocalDate closure_date = LocalDate.parse(notificationDto.getClosure_date());
            return new Notification(new Long(notificationDto.getId()), new Boolean(notificationDto.getIs_closed()), opening_date, closure_date, workerMapper.mapToDboWorker(notificationDto.getWorker()), attractionMapper.mapToDboAttraction(notificationDto.getAttraction()));

    }

    @Override
    public NotificationDto mapToDtoNotification(Notification notification) {
        if (notification.getClosure_date() != null) {
            return new NotificationDto(notification.getId().toString(), notification.getIs_closed().toString(), notification.getOpening_date().toString(), notification.getClosure_date().toString(), workerMapper.mapToDtoWorker(notification.getWorker()), attractionMapper.mapToDtoAttraction(notification.getAttraction()));
        } else {
            return new NotificationDto(notification.getId().toString(), notification.getIs_closed().toString(), notification.getOpening_date().toString(), workerMapper.mapToDtoWorker(notification.getWorker()), attractionMapper.mapToDtoAttraction(notification.getAttraction()));
        }
    }

    @Override
    public List<NotificationDto> mapListToDtoNotification(List<Notification> notifications) {
        return notifications.stream().map(this::mapToDtoNotification).collect(Collectors.toList());
    }
    
}
