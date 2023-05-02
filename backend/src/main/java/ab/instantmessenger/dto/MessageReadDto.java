package ab.instantmessenger.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record MessageReadDto(
    long messageId,
    String content,
    boolean deleted,
    boolean edited,
    LocalDateTime date,
    UserResponseDto user) {}
