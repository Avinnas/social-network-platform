package ab.instantmessenger.service;

import ab.instantmessenger.dto.ConversationReadDto;
import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.dto.MessageWriteDtoMapper;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.repository.MessageRepository;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageWriteDtoMapper messageWriteDtoMapper;

    public List<ConversationReadDto> getAllUserConversations() {
        List<Conversation> conversations = conversationRepository
                .findConversationsByUsers_Username(AuthUtils.getCurrentUserDetails().getUsername());
        return conversations.stream().map(conversation ->
                new ConversationReadDto(
                        conversation.getConversationId(),
                        "conversation-" + conversation.getConversationId())).collect(Collectors.toList());
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

    public void updateMessage(Message message){

        Message m = messageRepository.findById(message.getMessageId()).orElseThrow();

        return;
    }

    public Message  markDeletedMessage(long messageId){
        Message message = messageRepository.findById(messageId).orElseThrow();
        message.setDeleted(true);

        return message;
    }
}
