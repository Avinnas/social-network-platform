package ab.instantmessenger.controller;

import ab.instantmessenger.dto.UserResponseDto;
import ab.instantmessenger.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<UserResponseDto> findUserByUsername(@RequestParam String username){
        return ResponseEntity.ok(userService.findUserByUsername(username));
    }

}
