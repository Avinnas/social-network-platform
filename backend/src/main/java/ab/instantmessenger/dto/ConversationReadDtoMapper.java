package ab.instantmessenger.dto;

import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.User;
import ab.instantmessenger.utils.AuthUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ConversationReadDtoMapper {

  public ConversationReadDto map(Conversation conversation) {
    return new ConversationReadDto(
        conversation.getConversationId(), createTitle(conversation));
  }

  private String createTitle(Conversation conversation){
    String title = conversation.getTitle();
    if(title != null && !title.isEmpty()){
      return title;
    }
    String currentUsername = AuthUtils.getCurrentUser().getUsername();
    return conversation.getUsers().stream()
        .map(User::getUsername)
        .filter(username -> !currentUsername.equals(username))
        .collect(Collectors.joining(", "));
  }
}
