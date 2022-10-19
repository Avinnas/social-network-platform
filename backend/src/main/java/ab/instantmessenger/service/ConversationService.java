package ab.instantmessenger.service;

import ab.instantmessenger.dto.MessageDtoMapper;
import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.repository.MessageRepository;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.security.UserDetailsImpl;
import ab.instantmessenger.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {

    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageDtoMapper messageDtoMapper;

    public List<Conversation> getAllUserConversations(UserDetails userDetails){
        return conversationRepository.findConversationsByUsers_Username(userDetails.getUsername());
    }

    public Message addMessage(MessageWriteDto messageDto, long conversationId){

        Message message = messageDtoMapper.toMessage(messageDto);

        UserDetailsImpl userDetails = (UserDetailsImpl) AuthUtils.getCurrentUserDetails();

        message.setConversation(conversationRepository.getReferenceById(conversationId));
        message.setUser(userRepository.getReferenceById(userDetails.getUserId()));

        return messageRepository.save(message);
    }

    public List<Message> getMessages(long conversationId) {
        return messageRepository.findAllByConversation_IdFetchUsers(conversationId);
    }
}
