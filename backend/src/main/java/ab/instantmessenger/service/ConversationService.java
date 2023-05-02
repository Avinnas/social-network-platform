package ab.instantmessenger.service;

import ab.instantmessenger.dto.*;
import ab.instantmessenger.exception.ResourceConflictException;
import ab.instantmessenger.exception.ResourceNotFoundException;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.repository.MessageRepository;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.utils.AuthUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConversationService {

  private final ConversationRepository conversationRepository;
  private final MessageRepository messageRepository;
  private final MessageWriteDtoMapper messageWriteDtoMapper;
  private final MessageReadDtoMapper messageReadDtoMapper;
  private final ConversationReadDtoMapper conversationReadDtoMapper;
  private final UserRepository userRepository;

  public List<ConversationReadDto> getAllUserConversations() {
    List<Conversation> conversations =
        conversationRepository.findUserConversationsFetchUsers(
            AuthUtils.getCurrentUserDetails().getUsername());
    return conversations.stream().map(conversationReadDtoMapper::map).collect(Collectors.toList());
  }

  public MessageReadDto addMessage(MessageWriteDto messageDto, long conversationId) {

    Message message = messageWriteDtoMapper.toMessage(messageDto);

    message.setConversation(conversationRepository.getReferenceById(conversationId));
    message.setUser(AuthUtils.getCurrentUser());
    message.setDate(LocalDateTime.now());

    return messageReadDtoMapper.map(messageRepository.save(message));
  }

  public List<MessageReadDto> getMessages(long conversationId) {
    return messageRepository.findAllByConversation_IdFetchUsers(conversationId).stream()
        .map(messageReadDtoMapper::map)
        .sorted(Comparator.comparing(MessageReadDto::date))
        .collect(Collectors.toList());
  }

  public MessageReadDto markDeletedMessage(long messageId) {
    Message message =
        messageRepository
            .findById(messageId)
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        String.format("Message with id %d not found", messageId)));
    message.setDeleted(true);
    message.setContent("");

    return messageReadDtoMapper.map(messageRepository.save(message));
  }

  public ConversationPageDto getConversationWithUser(String otherUsername) {
    String currentUsername = AuthUtils.getCurrentUser().getUsername();
    Conversation conversation =
        conversationRepository
            .findConversationByUsersFetchMessages(currentUsername, otherUsername)
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        String.format(
                            "Conversation of users %s and %s not found",
                            currentUsername, otherUsername)));

    return new ConversationPageDto(conversation.getConversationId(), conversation.getMessages());
  }

  public ConversationReadDto addConversationWithUser(OtherUserDto otherUserDto) {
    User currentUser = AuthUtils.getCurrentUser();
    User otherUser =
        userRepository
            .findByUsername(otherUserDto.otherUsername())
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        String.format("User %s not found", otherUserDto)));
    conversationRepository
        .findConversationByUsersIds(currentUser.getUserId(), otherUser.getUserId())
        .ifPresent(
            (conversation) -> {
              throw new ResourceConflictException(
                  String.format(
                      "Conversation of users %s and %s already exists -> id %d",
                      currentUser.getUsername(),
                      otherUser.getUsername(),
                      conversation.getConversationId()));
            });

    Conversation conversation =
        Conversation.builder().users(List.of(currentUser, otherUser)).build();
    conversation = conversationRepository.save(conversation);
    return conversationReadDtoMapper.map(conversation);
  }
}
