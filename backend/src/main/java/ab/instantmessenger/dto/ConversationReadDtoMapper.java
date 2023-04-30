package ab.instantmessenger.dto;

import ab.instantmessenger.model.Conversation;
import org.springframework.stereotype.Component;

@Component
public class ConversationReadDtoMapper {
  public ConversationReadDto map(Conversation conversation) {
    return new ConversationReadDto(
        conversation.getConversationId(), "conversation-" + conversation.getConversationId());
  }

}
