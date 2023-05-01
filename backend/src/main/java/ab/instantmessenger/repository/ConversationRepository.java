package ab.instantmessenger.repository;

import ab.instantmessenger.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

  @Query("select distinct c from Conversation c join fetch c.users u where c.conversationId in " +
          "(select distinct c.conversationId from Conversation c inner join c.users u where u.username=:username)")
  List<Conversation> findUserConversationsFetchUsers(String username);

  @Query("select distinct c from Conversation c left join fetch c.messages join c.users u" +
          " where u.username=:username1 and c.conversationId = " +
          "(select distinct c.conversationId from Conversation c join c.users u where u.username =:username2)")
  Optional<Conversation> findConversationByUsersFetchMessages(String username1, String username2);

  @Query("select distinct c from Conversation c join c.users u where u.userId=:firstId and c.conversationId = " +
          "(select distinct c.conversationId from Conversation c join c.users u where u.userId=:secondId)")
  Optional<Conversation> findConversationByUsersIds (long firstId, long secondId);
}
