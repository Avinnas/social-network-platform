package ab.instantmessenger.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long messageId;

  @Column(nullable = false, length = 1000)
  private String content;

  @Column(nullable = false)
  private LocalDateTime date;

  @ColumnDefault("false")
  @Column(nullable = false)
  private boolean deleted;

  @ColumnDefault("false")
  @Column(nullable = false)
  private boolean edited;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "conversation_id", nullable = false)
  @JsonBackReference
  private Conversation conversation;
}
