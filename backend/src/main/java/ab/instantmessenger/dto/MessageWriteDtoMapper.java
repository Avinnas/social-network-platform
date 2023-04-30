package ab.instantmessenger.dto;

import ab.instantmessenger.model.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageWriteDtoMapper {
  public Message toMessage(MessageWriteDto messageWriteDto) {
    Message message = new Message();
    message.setContent(messageWriteDto.content());
    message.setDate(messageWriteDto.date());
    return message;
  }
}
