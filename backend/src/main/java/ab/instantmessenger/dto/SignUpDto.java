package ab.instantmessenger.dto;

import lombok.Builder;

@Builder
public record SignUpDto(String username, String email, String password, String repeatedPassword) {}
