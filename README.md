ESCAPE BANDAGES
=======================================================

- Ernesto Jiménez Martínez 	e.jimenezmar.2016@alumnos.urjc.es //	ernesjimenez@hotmail.com // ErnestooJM
- Irene Núñez Carranza 		i.nunez.2016@alumnos.urjc.es 	//	inmusic.nazul@gmail.com // Eneri21
- Rodrigo Rojo García		r.rojo.2016@alumnos.urjc.es 	//	rodrigo-rojo@hotmail.com // RodrigoRojoGarcia
 
## Descripción 

- Juego de plataformas y puzles multijugador, de scroll lateral 2D. 
- Ambientado en Egipto, en el interior de una de sus pirámides, en faraones, momias y trampas. 
- Objetivo: poder salir de la pirámide, solucionando diferentes puzles; los jugadores controlarán a la momia del faraón y la momia de uno de sus sirvientes. 
- Modo de juego: cooperativo de dos jugadores que juegan simultáneamente ayudándose entre ellos para seguir adelante.

## Mecánicas
### Personajes
##### Faraón: 
Uno de los dos personajes principales. Fue faraón y los dioses le revivieron y otorgaron poderes. Se mueve flotando a una distancia baja con respecto al suelo, no puede volar, solo que no pisa el suelo, aunque se puede impulsar un poco en el aire durante un pequeño periodo de tiempo.
###### Poderes
- Telequinesis: Usa un cetro para canalizar su poder de telequinesis con la cual puede hacer subir y bajar objetos sin tocarlos o sin verlos directamente.
- Lanzallamas: Usa una reliquia para absorber calor del desierto y transformarlo en llamas místicas que lanza delante de él que quitan vida a enemigos.
##### Sirviente:
El otro personaje principal. Fue el sirviente del faraón y revive gracias a los poderes de los dioses a la vez que su faraón en habitaciones separadas. Se mueve andando, puede saltar.
###### Poderes
- Ataque de vendas: lanza sus vendas hacia delante y hace daño a los enemigos que toca.

### Vidas
Cada jugador dispondrá de tres vidas. Si un enemigo toca a un jugador, éste pierde una vida. Si pierde todas sus vidas será una derrota y tendrá reiniciar el nivel o volver al menú principal. Los enemigos disponen de una barra de vida encima de su sprite, que se vacía según reciben daño.

### Habitaciones
Los jugadores aparecen en una sala pequeña. Pasarán a otra sala en la que les aparecerán a cada uno un Dios y les explicarán la situación. Ambos tendrán que salir de la pirámide y se sometarán a diferentes pruebas y enemigos. Tendrán que pulsar botones para abrir compuertas, matar enemigos y usar sus poderes para poder salir de la pirámide.

### Enemigos
A lo largo del juego los jugadores se pueden encontrar a Sheks, serpientes con alas de murciélago, que persiguen al jugador y hacen daño al contacto. Cada vez que dan al jugador le quitan un corazón.

### Controles
El faraón se moverá usando las teclas de flechas de dirección, el ratón para seleccionar los objetos que quiera mover usando la telequinesis y deberá usar la flecha de dirección hacia abajo para lanzar el fuego y el click izquierdo para la telequinesis. El sirviente sin embargo solo podrá moverse usando las teclas 'wasd' del teclado y la tecla 'espacio' para atacar con sus vendas (Los controles son del juego en local y pueden estar sujetos a cambios para el juego online.)
Si in-game se pulsa 'C' la cámara cambia de cámara dividida (una cámara por personaje) a cámara única que sigue al faraón.
![camara_dividida](https://raw.githubusercontent.com/RodrigoRojoGarcia/Escape-Bandages/readme/Capturas/c%C3%A1mara_dividida.PNG)  

### Concept Art
![mummy](https://user-images.githubusercontent.com/18311855/45764286-ad7f7c00-bc32-11e8-9130-e81fcb195a75.png)
![estandarte](https://user-images.githubusercontent.com/18311855/45764365-d99afd00-bc32-11e8-943d-beded2a61243.png)
![candelabro](https://user-images.githubusercontent.com/18311855/45764419-f7686200-bc32-11e8-8d98-cab42f7c2bf3.gif)
![fuego-en-piedra-pared](https://user-images.githubusercontent.com/18311855/45764426-fb947f80-bc32-11e8-9e4e-f1d128715cf5.gif)


## Historia
Anubis, maestro de la Necrópolis, y Bastet, Diosa de la armonía del hogar, despiertan a un faraón y a uno de sus sirvientes, los cuales estaban enamorados en vida y no pudieron estar juntos. Anubis y Bastet se apiadaron de ellos y su amor y les devuelven a la vida para que puedan vivir para siempre juntos, pero su poder es limitado. Devolver a un humano a la vida conlleva un coste y para hacer que sea permanente el faraón y la momia tienen que salir de la pirámide, pero no lo harán sin ningún problema. Hay dioses que están en contra de que puedan vivir otra vez, por lo que crean pruebas y llaman a bestias para impedir que salgan de la pirámide.

## Escenas
![diagramadeestados](https://raw.githubusercontent.com/RodrigoRojoGarcia/Escape-Bandages/readme/Capturas/uml%20estados.png)  
Aquí se puede observar el flujo de escenas de nuestro prototipo FASE4.
![menu principal](https://user-images.githubusercontent.com/18311855/48101270-b3eba680-e226-11e8-9d21-0ba376e40106.PNG)  
Se empieza en un menú principal con un botón para silenciar la música y otro botón para pasar al menú de selección de modo offline/online. (El modo online todavía no está activo).
![online-offline](https://raw.githubusercontent.com/RodrigoRojoGarcia/Escape-Bandages/readme/Capturas/Online-Offline.PNG)  
Del menú de selección de modo de juego se puede volver al menú principal o empezar una partida dando a 'offline'. 
En el juego en sí hay varias maneras de cambiar de estado. La primera es reiniciar nivel con la tecla 'R' del teclado. 
El siguiente cambio es cuando los jugadores se pasan en el nivel que se va a la escena de 'Victoria', de la cual solo se puede acceder al menú principal. 
![victoria](https://raw.githubusercontent.com/RodrigoRojoGarcia/Escape-Bandages/readme/Capturas/Victoria.PNG)  
Si uno de los jugadores pierde todas sus vidas se cambia a la escena de derrota, tras la cual se puede volver a jugar el nivel o volver al menú principal.
![game over](https://user-images.githubusercontent.com/18311855/48101266-b221e300-e226-11e8-9f5d-9aeaa9830380.PNG)  

## Pasos actuales del juego
Los dos jugadores aparecen en una sala sin nada. 
![1](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/1.PNG?raw=true)  
Cuando avanzan aparecen Anubis y Bastet y les explican la situación y controles básicos. 
Inmediatamente después el faraón no puede avanzar porque hay una puerta que le impide el paso, por lo que su amado tendrá que accionar un botón para permitirle avanzar.
![2](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/2.PNG?raw=true)  
En este momento la momia y el faraón se encuentran cada uno a un Shek y tendrán que derrotarlos por separado. 
![3](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/3.PNG?raw=true)  
El siguiente impedimento para avanzar es una gran caja en la habitación de la momia, la cual el faraón podrá mover con su telequinesis para permitirle el paso. 
![4](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/4.PNG?raw=true)  
Ahora es el faraón el que no puede avanzar, la momia tendrá que saltar un agujero y dar a un botón para abrir una compuerta con la que el faraón podrá bajar a la estancia en la que se encuentra la momia.
![5](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/5.PNG?raw=true)  
![6](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/6.PNG?raw=true)  
 Ahora ambos pasan a una estancia más amplia en la que se encuentran dos Shek en plataformas volantes, una gran caja, un pasillo en la parte superior de la pared derecha y una puerta para un pasillo inferior en la pared derecha. Para que la puerta se abra los jugadores deberán matar a todos los Shek de la sala. 
![7](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/7.PNG?raw=true)  
 Ahora ambos pueden avanzar, pero se encuentran con dos botones, los cuales tendrán que ser pulsados a la vez. Para poder hacerlo hay dos cajas en la cámara, aunque una de ellas está encerrada y tendrá que ser liberada. Para ello se necesita subir al pasillo superior con la ayuda de la telequinesis del faraón, allí se encontrará un botón que abre las compuertas de la caja y esta cae sobre uno de los botones y demuestra que pueden ser pulsados por ellas.
![8](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/8.PNG?raw=true)  
![9](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/9.PNG?raw=true)  
Cuando se colocan las dos cajas sobre los botones los dos personajes son libres de avanzar, saltar un agujero y salir de la pirámide.
![10](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/10.PNG?raw=true)  
![11](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/11.PNG?raw=true)  


## Servidor REST
Instrucciones para ejecutar (desde la consola de comandos): 
Ir al path Escape-Bandages/ServerEB/EscapeBandages/target
Ejecutar java -jar EscapeBandages-0.2.1.jar
Al final de la ejecución de la creación del servidor aparecerá por la consola de comandos una IP, la cual es la que se tiene que incluir en el buscador web para acceder como cliente al juego.

## Diagrama de clases de la aplicación
![classdiagram](https://user-images.githubusercontent.com/18311855/48830920-0031fd00-ed76-11e8-9bfd-621e18b9c3df.PNG)  
La línea discontinua indica que llama a métodos de las otras clases. La clase App llama a métodos de las clases HostManager y UsersManager.


## Capturas
![introusuario](https://user-images.githubusercontent.com/18311855/48831513-450a6380-ed77-11e8-8036-751b012ae2cd.PNG)  
Introducción de un usuario por cliente. Para llegar a la pantalla de selección de personaje cada usuario tiene que introducir un usuario que no se encuentre dentro del servidor.
![usuariointroducido](https://user-images.githubusercontent.com/18311855/48831516-45a2fa00-ed77-11e8-8bbb-ce26d956fde8.PNG)  
En la sala de selección de personaje se puede seleccionar solo un personaje, una vez seleccionado no hay vuelta atrás. Se muestra también el número de usuarios conectados al Lobby.
![seleccionpersonaje](https://user-images.githubusercontent.com/18311855/48831515-45a2fa00-ed77-11e8-8293-94976d377fb9.PNG)  
Los usuarios se podrán comunicar vía chat que se irá refrescando automáticamente en todos los clientes.
![chat](https://user-images.githubusercontent.com/18311855/48831512-450a6380-ed77-11e8-88b3-73c281a6532c.PNG) 

## FASE 4
![fase3-1](https://user-images.githubusercontent.com/18311855/49178464-234d4580-f350-11e8-8f8a-e3852021365a.PNG)  
![fase3-2](https://user-images.githubusercontent.com/18311855/49178465-23e5dc00-f350-11e8-8a19-9aa66800fbb9.PNG)  
Cuando el jugador va a la pantalla online le aparece una pantalla de registro/log in. Tenemos un sistema de guardado de datos, en un .txt en la carpeta target si se inicia el servidor desde el .jar,  que guarda usuarios únicos con contraseñas asociadas para registrar los usuarios. Una vez que hacen log in se cambia el estado de estos usuarios en el servidor a "ONLINE". Cada cliente puede tener asociado únicamente un usuario "ONLINE", por lo que si intentas loggear en un cliente que ya a iniciado con un usuario no te deja. El registro, a la izquierda, te permite introducir cualquier usuario y contraseña, mientras el usuario no esté en uso ya, y registrarte, inmediatamente después se podrá hacer log in con ese usuario y contraseña.  
![fase3-3](https://user-images.githubusercontent.com/18311855/49178466-23e5dc00-f350-11e8-9d5c-83cfb5b6b1e0.PNG)  
Una vez estés "ONLINE" (es decir, loggeado), tendrás una pantalla de selección de elección de lobby. Puedes buscar un lobby aleatorio, que te busca un lobby no privado en el que haya hueco y te mete, y en caso de no haberlo crea un nuevo lobby no privado y te introduce como usuario 1 de ese lobby. Los lobbies de nuestro servidor tienen como capacidad máxima de dos usuarios. Tenemos el botón de "Privado", que te genera un lobby privado con tu usuario de usuario 1, de esta manera, los usuarios que busquen aleatorio no entrarán y permitirás a tus amigos buscar tu lobby con tu nombre de usuario.   
![fase3-4](https://user-images.githubusercontent.com/18311855/49178469-23e5dc00-f350-11e8-89b7-e8312311cf8a.PNG)  
En la misma pantalla de selección de lobby tenemos un línea de entrada de texto en la que se puede introducir el nombre de usuario de tu amigo que haya generado un lobby privado y de esta manera te asocia a dicho lobby y te mete en el hueco que falte, en caso de no estar lleno.  
![fase3-5](https://user-images.githubusercontent.com/18311855/49178470-247e7280-f350-11e8-964a-a6becec901bc.PNG)  
La pantalla de lobby se compone de: nombres de usuario conectados, botones de selección de personaje, chat y botón de preparado.
Una vez que seleccionas un personaje se te pone disponible una checkbox para decir si estás preparado para jugar, una vez que estén los dos jugadores preparados se iniciará el juego en local en cada uno de los clientes.
Se puede seleccionar los personajes y, al hacerlo, cambian los parámetros del chat, al escribir aparecerá tu nombre de usuario y el personaje que tengas actualmente escogido (marcado con un filtro verdoso).
En el chat aparecen mensajes de cuando se unen los usuarios y de cuando se desconectan (la lista de usuarios conectados no se actualiza todavía por causas todavía desconocidas, pero debería)
![fase3-6](https://user-images.githubusercontent.com/18311855/49178471-247e7280-f350-11e8-9035-01c5a933ae83.PNG)  
![fase3-7](https://user-images.githubusercontent.com/18311855/49178473-247e7280-f350-11e8-9440-18240dca3b47.PNG)  
![fase3-8](https://user-images.githubusercontent.com/18311855/49178474-25170900-f350-11e8-89ca-a9c94ca60bd0.PNG)  
![fase3-9](https://user-images.githubusercontent.com/18311855/49178475-25170900-f350-11e8-962d-fa07f1ee29b8.PNG)  
![fase3-10](https://user-images.githubusercontent.com/18311855/49178477-25170900-f350-11e8-9442-a3d0cb4555ee.PNG)  
![fase3-11](https://user-images.githubusercontent.com/18311855/49178478-25170900-f350-11e8-8b57-04177ad19bc6.PNG)  
Tendremos en cuenta que en cualquier momento se pueda dar una desconexión del servidor o haya fallo de conexión, por lo que hay otra escena para mostrar este mensaje, y así notificar al jugador.
![desconexion](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/desconexion.png?raw=true) 
