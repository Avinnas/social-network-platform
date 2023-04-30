package ab.instantmessenger.service;

import ab.instantmessenger.dto.ConversationReadDto;
import ab.instantmessenger.dto.ConversationReadDtoMapper;
import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.dto.MessageWriteDtoMapper;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.repository.MessageRepository;
import ab.instantmessenger.utils.AuthUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConversationService {

  private final ConversationRepository conversationRepository;
  private final MessageRepository messageRepository;
  private final MessageWriteDtoMapper messageWriteDtoMapper;
  private final ConversationReadDtoMapper conversationReadDtoMapper;

  public List<ConversationReadDto> getAllUserConversations() {
    List<Conversation> conversations =
        conversationRepository.findUserConversationsFetchUsers(
            AuthUtils.getCurrentUserDetails().getUsername());
    return conversations.stream().map(conversationReadDtoMapper::map).collect(Collectors.toList());
  }

  public Message addMessage(MessageWriteDto messageDto, long conversationId) {

    Message message = messageWriteDtoMapper.toMessage(messageDto);

    message.setConversation(conversationRepository.getReferenceById(conversationId));
    message.setUser(AuthUtils.getCurrentUser());

    return messageRepository.save(message);
  }

  public List<Message> getMessages(long conversationId) {
    return messageRepository.findAllByConversation_IdFetchUsers(conversationId);
  }

  public Message markDeletedMessage(long messageId) {
    Message message = messageRepository.findById(messageId).orElseThrow();
    message.setDeleted(true);

    return message;
  }
}
