package ab.instantmessenger.controller;

import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/conversations")
public class ConversationController {

  @Autowired ConversationService conversationService;

  @GetMapping
  public ResponseEntity<?> getAll() {
    return ResponseEntity.ok(conversationService.getAllUserConversations());
  }

  @PostMapping("/{id}/messages")
  public ResponseEntity<?> addMessage(@RequestBody MessageWriteDto message, @PathVariable long id) {

    return ResponseEntity.ok(conversationService.addMessage(message, id));
  }

  @PostMapping
  public ResponseEntity<?> getConversationWithUser(@RequestParam String otherUsername){
    return ResponseEntity.ok(conversationService.getConversationWithUser(otherUsername));
  }

  @GetMapping("/{id}/messages")
  public ResponseEntity<?> getMessages(
      @AuthenticationPrincipal UserDetails userDetails, @PathVariable long id) {
    return ResponseEntity.ok(conversationService.getMessages(id));
  }
}
