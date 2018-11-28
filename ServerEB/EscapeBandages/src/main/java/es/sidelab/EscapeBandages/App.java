package es.sidelab.EscapeBandages;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
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
