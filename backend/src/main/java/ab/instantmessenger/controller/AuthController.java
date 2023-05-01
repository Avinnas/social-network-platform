package ab.instantmessenger.controller;

import ab.instantmessenger.dto.LoginDto;
import ab.instantmessenger.dto.SignUpDto;
import ab.instantmessenger.security.JwtResponse;
import ab.instantmessenger.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final AuthService authService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {

    return ResponseEntity.ok(authService.authenticateUser(loginDto));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> signUpUser(@RequestBody SignUpDto signUpDto) {

    return ResponseEntity.ok(authService.signUpUser(signUpDto));
  }
}
