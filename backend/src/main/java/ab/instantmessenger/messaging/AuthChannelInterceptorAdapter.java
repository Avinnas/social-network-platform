package ab.instantmessenger.messaging;

import ab.instantmessenger.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class AuthChannelInterceptorAdapter implements ChannelInterceptor {
  private static final String AUTHORIZATION_HEADER = "Authorization";

  private final JwtUtils jwtUtils;

  public AuthChannelInterceptorAdapter(JwtUtils jwtUtils) {
    this.jwtUtils = jwtUtils;
  }

  @Override
  public Message<?> preSend(final Message<?> message, final MessageChannel channel) {
    final StompHeaderAccessor accessor =
        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

    if (StompCommand.CONNECT == accessor.getCommand()) {
      final String token = parseToken(accessor);

      if (token != null && jwtUtils.validateJwtToken(token)) {
        UsernamePasswordAuthenticationToken authentication =
            jwtUtils.createUsernamePasswordAuthenticationToken(token);
        accessor.setUser(authentication);
      }
    }
    return message;
  }

  public String parseToken(StompHeaderAccessor accessor) {
    String headerAuth = accessor.getFirstNativeHeader(AUTHORIZATION_HEADER);

    return jwtUtils.trimToken(headerAuth);
  }
}
