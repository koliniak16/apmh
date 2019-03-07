package pl.edu.wat.services.mapper;

import pl.edu.wat.model.api.RoleDto;
import pl.edu.wat.model.domain.Role;

import java.util.List;

public interface RoleMapper {
    List<RoleDto> mapListToDtoRole(List<Role> roles);
    Role mapToDboRole(RoleDto roleDto);
    RoleDto mapToDtoRole(Role role);
    List<Role> mapListToDboRole(List<RoleDto> roles);
}
