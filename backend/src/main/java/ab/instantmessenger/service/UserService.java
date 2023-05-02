package ab.instantmessenger.service;

import ab.instantmessenger.dto.UserResponseDto;
import ab.instantmessenger.dto.UserResponseDtoMapper;
import ab.instantmessenger.exception.ResourceNotFoundException;
import ab.instantmessenger.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final UserResponseDtoMapper userResponseDtoMapper;

  public UserResponseDto findUserByUsername(String username) {
    return userRepository
        .findByUsername(username)
        .map(userResponseDtoMapper::map)
        .orElseThrow(
            () ->
                new ResourceNotFoundException(
                    String.format("User with username %s not found", username)));
  }
}
