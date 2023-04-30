package ab.instantmessenger.repository;

import ab.instantmessenger.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

  @Query(
      "select m from Message m join fetch m.user where m.conversation.conversationId=:conversationId")
  List<Message> findAllByConversation_IdFetchUsers(long conversationId);
}
