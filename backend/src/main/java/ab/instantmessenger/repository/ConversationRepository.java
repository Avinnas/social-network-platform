package ab.instantmessenger.repository;

import ab.instantmessenger.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

  @Query("select distinct c from Conversation c inner join fetch c.users u where c.conversationId in " +
          "(select distinct c.conversationId from Conversation c inner join c.users u where u.username=:username)")
  List<Conversation> findConversationsByUsers_UsernameFetchUsers(String username);
}
