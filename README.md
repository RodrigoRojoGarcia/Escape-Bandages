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
![uml in game](https://user-images.githubusercontent.com/18311855/50808350-62cb6200-12fe-11e9-916a-1ce2a865c278.png)  
Aquí se puede observar el flujo de escenas de nuestro prototipo FASE4.
![menu principal](https://user-images.githubusercontent.com/18311855/48101270-b3eba680-e226-11e8-9d21-0ba376e40106.PNG)  
Se empieza en un menú principal con un botón para silenciar la música y otro botón para pasar al menú de selección de modo offline/online.
![online-offline](https://raw.githubusercontent.com/RodrigoRojoGarcia/Escape-Bandages/readme/Capturas/Online-Offline.PNG)  
Del menú de selección de modo de juego se puede volver al menú principal o empezar una partida dando a 'offline'. 
En el juego en sí hay varias maneras de cambiar de estado. La primera es reiniciar nivel con la tecla 'R' del teclado. 
El siguiente cambio es cuando los jugadores se pasan en el nivel que se va a la escena de 'Victoria', de la cual se puede acceder al menú principal o volver a jugar el nivel. 
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
![classdiagram](https://user-images.githubusercontent.com/18311855/50807663-79bc8500-12fb-11e9-8dac-b7166ccae2ed.PNG)  
La línea discontinua indica que llama a métodos de las otras clases. La clase App llama a métodos de las clases HostManager y UsersManager.

## FASE 4
![fase4-1](https://user-images.githubusercontent.com/18311855/49178464-234d4580-f350-11e8-8f8a-e3852021365a.PNG)  
![fase4-2](https://user-images.githubusercontent.com/18311855/49178465-23e5dc00-f350-11e8-8a19-9aa66800fbb9.PNG)  
Cuando el jugador va a la pantalla online le aparece una pantalla de registro/log in. Tenemos un sistema de guardado de datos, en un .txt en la carpeta target si se inicia el servidor desde el .jar,  que guarda usuarios únicos con contraseñas asociadas para registrar los usuarios. Una vez que hacen log in se cambia el estado de estos usuarios en el servidor a "ONLINE". Cada cliente puede tener asociado únicamente un usuario "ONLINE", por lo que si intentas loggear en un cliente que ya a iniciado con un usuario no te deja. El registro, a la izquierda, te permite introducir cualquier usuario y contraseña, mientras el usuario no esté en uso ya, y registrarte, inmediatamente después se podrá hacer log in con ese usuario y contraseña.  
![fase4-3](https://user-images.githubusercontent.com/18311855/49178466-23e5dc00-f350-11e8-9d5c-83cfb5b6b1e0.PNG)  
Una vez estés "ONLINE" (es decir, loggeado), tendrás una pantalla de selección de elección de lobby. Puedes buscar un lobby aleatorio, que te busca un lobby no privado en el que haya hueco y te mete, y en caso de no haberlo crea un nuevo lobby no privado y te introduce como usuario 1 de ese lobby. Los lobbies de nuestro servidor tienen como capacidad máxima de dos usuarios. Tenemos el botón de "Privado", que te genera un lobby privado con tu usuario de usuario 1, de esta manera, los usuarios que busquen aleatorio no entrarán y permitirás a tus amigos buscar tu lobby con tu nombre de usuario.   
![fase4-4](https://user-images.githubusercontent.com/18311855/49178469-23e5dc00-f350-11e8-89b7-e8312311cf8a.PNG)  
En la misma pantalla de selección de lobby tenemos una línea de entrada de texto en la que se puede introducir el nombre de usuario de tu amigo que haya generado un lobby privado y de esta manera te asocia a dicho lobby y te mete en el hueco que falte, en caso de no estar lleno.  
![fase4-lobby](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/Fase3-5.PNG?raw=true)  
![fase4-lobby2](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/Fase3-6.PNG?raw=true)  
La pantalla de lobby se compone de: nombres de usuario conectados, botones de selección de personaje, chat (el cual hemos mejorado para que tenga mayor coherencia con el resto del juego) y botón de preparado.
Una vez que seleccionas un personaje se te pone disponible una checkbox para decir si estás preparado para jugar, una vez que estén los dos jugadores preparados se iniciará el juego en local en cada uno de los clientes.
![fase4-mummy](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/mummy.png?raw=true)  
![fase4-pharaoh](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/pharaoh.png?raw=true)  
![fase4-select](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/seleccion.png?raw=true)  
Al seleccionar los personajes, cambian los parámetros del chat, al escribir aparecerá tu nombre de usuario y el personaje que tengas actualmente escogido que se le indicará a otro jugador, mostrándoselo con un filtro gris, además de indicar debajo de este el nombre de usuario de quien lo ha escogido.
En el chat aparecen mensajes de cuando se unen los usuarios, cuando se desconectan, el personaje que escogen.
![fase4-checkbox2](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/check.png?raw=true)    
Una vez ya dentro del juego, cada jugador tendrá su propia pantalla, en la cual, su cámara seguirá a su personaje correspondiente. 
![fase4-chatgame](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/game.png?raw=true) 
También está incluido el chat, para que ambos se puedan comunicar. En esta fase necesitaremos pasar cierta información al otro usuario para poder mostrar la pantalla actual; así, les pasaremos por Websockets parámetros como la posición actual de cada personajes, la vida de los enemigos, la posición de las cajas y la arena que aparecen en el nivel, los booleans de los botones y las puertas para que ambas cosas funciones, etc.
![fase4-chatbye](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/chat%20t.png?raw=true)   
Una funcionalidad extra añadida es el poder ocultar el chat en el modo online mientras se juega, para ello solo habría que pulsar la tecla 't'. Para que vuelva a aparecer se le volvería a dar a la misma tecla.
![fase4-gameover](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/Game%20Over.PNG?raw=true)   
Obviamente, al tratarse de un juego cooperativo, en el cual es necesario ambos personajes para ganar, si uno de ellos se muere, en ambas pantallas aparecerá el 'Game Over', pasandose la información de la vida del otro para saber si ha muerto o no. En esta, tal y como hemos indicado anteriormente para el offline, nos dará la posibilidad de reiniciar o de salirnos.
![fase4-vida](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/vida.png?raw=true)   
Otro aspecto implementado en esta fase, ha sido el hud de la vida de ambos personajes, mostrando una imagen del personaje al que le corresponde su barra de vida, junto con sus tres corazones correspondientes, los cuales irán desapareciendo al ser atacados por los enemigos.
![fase4-pausa](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/salir%20esc.png?raw=true)   
Debemos mencionar dos pantallas más que aparecen en el juego, que serían la de pausa (pulsando 'esc') con el que saldrías del juego, por o que antes te piden una confirmación.
![fase4-reinicio](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/reiniciar%20r.png?raw=true)   
Y una pantalla de reinicio si pulsamos la tecla 'R', dónde también nos preguntarán si estamos seguros de querer reiniciar nivel.
![desconexion](https://github.com/RodrigoRojoGarcia/Escape-Bandages/blob/readme/Capturas/desconexion.png?raw=true)   
Tendremos en cuenta que en cualquier momento se pueda dar una desconexión del servidor o haya fallo de conexión, por lo que hay otra escena para mostrar este mensaje, y así notificar al jugador.
## WEBSOCKET  
La administración de websocket es la siguiente. Cada cliente manda mensajes como faraón o como momia, según el personaje que estén jugando, con sus posiciones, teclas de actuación y objetos que solo ellos modifican del escenario, como las cajas que se mueven por telequinesis para el faraón o la cuerda para la momia. Cada uno manda el mensaje para que el otro cliente actualice sus posiciones.  
Para las cajas pequeñas, que ambos las pueden modificar, las vidas de los personajes ( para saber cuando aplicar el evento de muerte )  y el estado de reinicio y salir del nivel, se usan manejadores aparte.  
Para las cajas el servidor calcula la posición de la caja con respecto a la última posición enviada del personaje más cercano a ella y se la reenvía al resto de clientes.  
Para calcular el estado de muerte del otro personaje se espera a la respuesta del servidor para aplicar el estado de "derrota" para que no muera uno en una pantalla, pero en la otra no salga correctamente o a tiempo el estado de "derrota".  
Los estados de reinicio y salir del nivel son dos booleanos y cada cliente responde a ellos en local, el servidor maneja los booleanos según las acciones de los clientes y actualiza esos valores en todos los clientes para sincronizar estos estados.

