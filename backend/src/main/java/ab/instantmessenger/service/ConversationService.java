package ab.instantmessenger.service;

import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.ConversationRepository;
import ab.instantmessenger.repository.MessageRepository;
import ab.instantmessenger.repository.UserRepository;
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

    public Message addMessage(UserDetails userDetails, Message message, long conversationId){

        User u = userRepository.findByUsername(userDetails.getUsername());
        Conversation conversation = conversationRepository.getReferenceById(conversationId);
        message.setUser(u);
        message.setConversation(conversation);
        return messageRepository.save(message);
    }

    public List<Message> getMessages(UserDetails userDetails, long conversationId) {
        return messageRepository.findAllByConversation_IdFetchUsers(conversationId);
    }
}
