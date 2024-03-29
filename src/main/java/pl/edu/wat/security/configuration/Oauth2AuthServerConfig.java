package pl.edu.wat.security.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

@Configuration
@EnableAuthorizationServer
public class Oauth2AuthServerConfig extends AuthorizationServerConfigurerAdapter {
	
	@Value("${frontend.oauth2.clientId}")
	String frontendClientId;
	
	@Value("${frontend.oauth2.secret}")
	String frontendClientSecret;
	
	@Value("${frontend.oauth2.tokenValidityInSeconds}")
    int tokenValiditySeconds;
	
	@Value("${frontend.oauth2.refreshTokenValidityInSeconds}")
	int refreshTokenValiditySeconds;

	@Autowired
	DataSource dataSource;
  
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) {
        oauthServer
          .tokenKeyAccess("permitAll()")
          .checkTokenAccess("isAuthenticated()");
    }
 
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) 
      throws Exception {
		clients
        	.inMemory()
	        	.withClient(frontendClientId)
	        		.secret(passwordEncoder.encode(frontendClientSecret))
	        		.authorizedGrantTypes("password","authorization_code", "refresh_token")
	        		.accessTokenValiditySeconds(tokenValiditySeconds)
					.refreshTokenValiditySeconds(refreshTokenValiditySeconds)
	        		.scopes("read");
    }
 
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
          .tokenStore(tokenStore())
          .authenticationManager(authenticationManager).userDetailsService(userDetailsService);
    }
 
    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }
}
