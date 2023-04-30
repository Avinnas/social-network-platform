package ab.instantmessenger.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public record MessageWriteDto(String content, LocalDateTime date) {
  }
