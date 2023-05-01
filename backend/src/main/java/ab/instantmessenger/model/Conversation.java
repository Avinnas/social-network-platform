package ab.instantmessenger.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long conversationId;

  private String title;

  @OneToMany(mappedBy = "conversation")
  @JsonBackReference
  private List<Message> messages;

  @ManyToMany
  @JoinTable(
      name = "conversations_users",
      joinColumns = {@JoinColumn(name = "conversation_id")},
      inverseJoinColumns = {@JoinColumn(name = "user_id")})
  private List<User> users;
}
