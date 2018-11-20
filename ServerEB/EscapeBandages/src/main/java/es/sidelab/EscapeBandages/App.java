package es.sidelab.EscapeBandages;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
        
        System.out.println("IP:"+HostManager.getAddress());
        
        UsersManager.init();
    }
}
