package pl.edu.wat.services.mapper.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.wat.model.api.RoleDto;
import pl.edu.wat.model.domain.Role;
import pl.edu.wat.model.domain.WorkerPosition;
import pl.edu.wat.services.mapper.RoleMapper;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RoleMapperImplementation implements RoleMapper {

    @Override
    public List<Role> mapListToDboRole(List<RoleDto> roles) {
        return roles.stream().map(this::mapToDboRole).collect(Collectors.toList());
    }

    @Override
    public Role mapToDboRole(RoleDto roleDto) {
        return new Role(new Long(roleDto.getId()), WorkerPosition.valueOf(roleDto.getPosition()));
    }

    @Override
    public RoleDto mapToDtoRole(Role role) {
        return new RoleDto(role.getId().toString(),role.getPosition().toString());
    }

    @Override
    public List<RoleDto> mapListToDtoRole(List<Role> roles) {
        return roles.stream().map(this::mapToDtoRole).collect(Collectors.toList());
    }
}
