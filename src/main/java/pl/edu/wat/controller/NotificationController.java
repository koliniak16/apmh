package pl.edu.wat.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.edu.wat.model.api.NotificationDto;

import java.util.List;

public interface NotificationController {

    @RequestMapping(value = "/notification/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    NotificationDto createNotification(NotificationDto notificationDto);

    @RequestMapping(value = "/notification/",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    NotificationDto updateNotification(NotificationDto notificationDto);

    @RequestMapping(value = "/notifications/{id_t}",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    List<NotificationDto> getNotifications(@PathVariable Long id_t);
}
