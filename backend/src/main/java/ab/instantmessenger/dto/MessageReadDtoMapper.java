package ab.instantmessenger.dto;

import ab.instantmessenger.model.Message;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class MessageReadDtoMapper {
  private final UserResponseDtoMapper userResponseDtoMapper;
  public MessageReadDto map(Message message) {
    return MessageReadDto.builder()
        .messageId(message.getMessageId())
        .content(message.getContent())
        .date(message.getDate())
        .deleted(message.isDeleted())
        .edited(message.isEdited())
        .user(userResponseDtoMapper.map(message.getUser()))
        .build();
  }
}
