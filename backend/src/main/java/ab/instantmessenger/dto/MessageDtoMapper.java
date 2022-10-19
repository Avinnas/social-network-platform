package ab.instantmessenger.dto;

import ab.instantmessenger.model.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageDtoMapper {
    public Message toMessage(MessageWriteDto messageWriteDto){
        Message message = new Message();
        message.setContent(messageWriteDto.getContent());
        message.setDate(messageWriteDto.getDate());
        return message;
    }
}
