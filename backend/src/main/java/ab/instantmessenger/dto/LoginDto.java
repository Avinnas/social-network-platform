package ab.instantmessenger.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public record LoginDto(String username, String password) {
  }
