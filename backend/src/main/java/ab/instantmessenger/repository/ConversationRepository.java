package ab.instantmessenger.repository;

import ab.instantmessenger.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findConversationsByUsers_Username(String username);
}
