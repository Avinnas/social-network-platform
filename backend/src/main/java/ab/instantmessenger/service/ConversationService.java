package ab.instantmessenger.service;

import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.model.User;
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

    public List<Conversation> getAllUserConversations(UserDetails userDetails){
        return conversationRepository.findConversationsByUsers_Username(userDetails.getUsername());
    }

    public Message addMessage(Message message, long conversationId){

        UserDetailsImpl userDetails = (UserDetailsImpl) AuthUtils.getCurrentUserDetails();

        message.setConversation(conversationRepository.getReferenceById(conversationId));
        message.setUser(userRepository.getReferenceById(userDetails.getUserId()));

        return messageRepository.save(message);
    }

    public List<Message> getMessages(UserDetails userDetails, long conversationId) {
        return messageRepository.findAllByConversation_IdFetchUsers(conversationId);
    }
}
