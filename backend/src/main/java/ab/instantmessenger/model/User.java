package ab.instantmessenger.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  long userId;

  @Column(nullable = false)
  String username;

  @Column(nullable = false)
  String email;

  @Column(nullable = false)
  @JsonIgnore String password;

  @JsonBackReference(value = "user-conversations")
  @ManyToMany(mappedBy = "users")
  List<Conversation> conversations;

  @JsonBackReference(value = "user-messages")
  @OneToMany(mappedBy = "user")
  List<Message> messages;
}
