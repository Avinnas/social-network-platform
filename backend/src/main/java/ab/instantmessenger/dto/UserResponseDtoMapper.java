package ab.instantmessenger.dto;

import ab.instantmessenger.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserResponseDtoMapper {
    public UserResponseDto map(User user) {
  return new UserResponseDto(user.getUserId(), user.getUsername());
}
}
