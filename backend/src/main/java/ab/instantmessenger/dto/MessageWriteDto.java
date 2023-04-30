package ab.instantmessenger.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public record MessageWriteDto(String content, LocalDateTime date) {
  }
