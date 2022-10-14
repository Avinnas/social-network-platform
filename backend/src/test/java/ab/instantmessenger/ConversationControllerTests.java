package ab.instantmessenger;

import ab.instantmessenger.controller.ConversationController;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.model.User;
import ab.instantmessenger.repository.UserRepository;
import ab.instantmessenger.security.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.w3c.dom.UserDataHandler;

import javax.persistence.Access;
import java.util.List;

@SpringBootTest
public class ConversationControllerTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConversationController conversationController;

    @Test
    void getAllConversationsTest(){
        User u = userRepository.findByUsername("user");
        UserDetails userDetails = new UserDetailsImpl(u);

//        List<Conversation> conversations = conversationController.getAll(userDetails);

        System.out.println();
    }

}
