package ab.instantmessenger.controller;

import ab.instantmessenger.dto.ConversationReadDto;
import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.dto.OtherUserDto;
import ab.instantmessenger.model.Conversation;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(ConversationController.PATH)
public class ConversationController {

  public static final String PATH = "/api/v1/conversations";
  @Autowired ConversationService conversationService;

  @GetMapping
  public ResponseEntity<List<ConversationReadDto>> getAll() {
    return ResponseEntity.ok(conversationService.getAllUserConversations());
  }

  @PostMapping("/{id}/messages")
  public ResponseEntity<?> addMessage(@RequestBody MessageWriteDto message, @PathVariable long id) {

    return ResponseEntity.ok(conversationService.addMessage(message, id));
  }

  @GetMapping("/search")
  public ResponseEntity<?> getConversationWithUser(@RequestParam String otherUsername){
    return ResponseEntity.ok(conversationService.getConversationWithUser(otherUsername));
  }

  @PostMapping
  public ResponseEntity<?> addConversationWithUser(@RequestBody OtherUserDto otherUser){
    long conversationId = conversationService.addConversationWithUser(otherUser);
    return ResponseEntity.created(URI.create(PATH + "/" + conversationId)).build();
  }

  @GetMapping("/{id}/messages")
  public ResponseEntity<?> getMessages(
      @AuthenticationPrincipal UserDetails userDetails, @PathVariable long id) {
    return ResponseEntity.ok(conversationService.getMessages(id));
  }
}
