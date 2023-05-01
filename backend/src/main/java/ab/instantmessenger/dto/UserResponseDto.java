package ab.instantmessenger.dto;

import lombok.Builder;

@Builder
public record UserResponseDto (long userId, String username) {}
