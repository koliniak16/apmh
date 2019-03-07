package pl.edu.wat.controller.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.controller.NotificationController;
import pl.edu.wat.model.api.NotificationDto;
import pl.edu.wat.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class NotificationControllerImplementation implements NotificationController {

    private final NotificationService notificationService;

    @Override
    public NotificationDto createNotification(@RequestBody NotificationDto notificationDto){
        return notificationService.createNotification(notificationDto);
    }

    @Override
    public NotificationDto updateNotification(@RequestBody NotificationDto notificationDto){
        return notificationService.updateNotification(notificationDto);
    }

    @Override
    public List<NotificationDto> getNotifications(Long id_t){
        return notificationService.getNotifications(id_t);
    }

}
