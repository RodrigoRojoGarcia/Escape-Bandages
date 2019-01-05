package es.sidelab.EscapeBandages;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer
{
    public static void main( String[] args ) throws IOException
    {
        SpringApplication.run(App.class, args);
        
        System.out.println("IP:"+HostManager.getAddress());
        
        LinkedList<String> datos = new LinkedList<String>();
        
        datos = leerFichero("users.txt");
        
        UsersController.introduceData(datos);
        
        UsersManager.init();
    }
    @Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(mummyHandler(), "/calcetineteMummy")
		.setAllowedOrigins("*");
		registry.addHandler(pharaohHandler(), "/calcetinetePharaoh")
		.setAllowedOrigins("*");
		registry.addHandler(boxHandler(), "/calcetineteBox")
        .setAllowedOrigins("*");
        registry.addHandler(ropeHandler(), "/calcetineteRope")
		.setAllowedOrigins("*");
        registry.addHandler(shekHandler(), "/calcetineteShek")
        .setAllowedOrigins("*");
        registry.addHandler(restartHandler(), "/calcetineteRestart")
		.setAllowedOrigins("*");
	}
	
	@Bean
	public MummyHandler mummyHandler() {
		return new MummyHandler();
    }
    @Bean
	public PharaohHandler pharaohHandler() {
		return new PharaohHandler();
    }
    @Bean
	public BoxHandler boxHandler() {
		return new BoxHandler();
    }
    @Bean
	public BoxHandler ropeHandler() {
		return new BoxHandler();
    }
    @Bean
	public ShekHandler shekHandler() {
		return new ShekHandler();
    }
    @Bean
	public RestartHandler restartHandler() {
		return new RestartHandler();
	}
	

    public static LinkedList<String> leerFichero(String archivo) throws FileNotFoundException, IOException{
    	LinkedList<String> cadenas = new LinkedList<String>();
    	String cadena;
        FileReader f = new FileReader(archivo);
        BufferedReader b = new BufferedReader(f);
        while((cadena = b.readLine())!=null) {
            cadenas.add(cadena);
            
        }
        b.close();
        return cadenas;
    }
}
