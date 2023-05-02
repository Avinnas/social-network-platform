package ab.instantmessenger.service;

import ab.instantmessenger.dto.LoginDto;
import ab.instantmessenger.dto.SignUpDto;
import ab.instantmessenger.dto.UserResponseDto;
import ab.instantmessenger.dto.UserResponseDtoMapper;
import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.security.AuthenticationException;
import ab.instantmessenger.security.JwtResponse;
import ab.instantmessenger.security.JwtUtils;
import ab.instantmessenger.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthService {
  private final UserRepository userRepository;
  private final UserResponseDtoMapper userResponseDtoMapper;
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final PasswordEncoder passwordEncoder;

  public JwtResponse authenticateUser(LoginDto loginDto) {
    UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(loginDto.username(), loginDto.password());
    Authentication authentication = authenticationManager.authenticate(token);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return new JwtResponse(jwt, userDetails.getUsername(), userDetails.getPassword());
  }

  public UserResponseDto signUpUser(SignUpDto signUpDto) {
    // TODO: validate email

    if (!signUpDto.password().equals(signUpDto.repeatedPassword())) {
      throw new AuthenticationException("Passwords do not match");
    }

    String username = signUpDto.username();
    userRepository
        .findByUsername(username)
        .ifPresent(
            user -> {
              throw new AuthenticationException("Username " + username + " exists.");
            });

    User user =
        User.builder()
            .email(signUpDto.email())
            .password(passwordEncoder.encode(signUpDto.password()))
            .username(signUpDto.username())
            .build();

    userRepository.save(user);
    return userResponseDtoMapper.map(user);
  }

}
