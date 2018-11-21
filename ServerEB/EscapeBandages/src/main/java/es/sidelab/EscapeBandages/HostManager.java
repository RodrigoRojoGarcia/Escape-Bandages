package es.sidelab.EscapeBandages;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ip")
public class HostManager {
	/**
     * Puerto en el que se aloja la aplicación.
     */
    private final static int port = 8080;
    
    @GetMapping
    private String getHostAddress() {
        return getAddress();
    }

    /**
     * Devuelve un string que contiene la IP a la que se puede conectar otro dispositivo de la red
     * local, junto al puerto, o la dirección de localhost si no se puede obtener.
     */
    public static String getAddress() {
        // Preparamos la dirección de localhost para devolverla en caso de que haya un error
        String ret = "127.0.0.1";

        try {
            // Primero tenemos que buscar en todas las interfaces de red conectadas a este
            // dispositivo
            Enumeration<NetworkInterface> all = NetworkInterface.getNetworkInterfaces();

            while(all.hasMoreElements()) {
                
                // Cada interfaz de red tiene varias direcciones posibles
                Enumeration<InetAddress> addresses = all.nextElement().getInetAddresses();
                while(addresses.hasMoreElements()) {
                    InetAddress address = addresses.nextElement();

                    // Y algunas direcciones, de hecho, son direcciones locales que el
                    // dispositivo usa para referirse a sí mismo
                    if(!address.isLoopbackAddress() && !address.isLinkLocalAddress()) {

                        // Pero si no es para referirse a sí mismo, entonces la podemos devolver
                        ret = address.getHostAddress();
                    }
                }
                
            }

        } catch(SocketException e) {
            // getNetworkInterfaces() puede lanzar una excepción de este tipo
            System.out.println("Error al obtener la IP del servidor (" + e.getMessage() + ").");
        }

        // Devolvemos la dirección junto al puerto
        return ret + ":" + port;
    }
}
