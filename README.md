ESCAPE BANDAGES
=======================================================

- Ernesto Jiménez Martínez 	e.jimenezmar.2016@alumnos.urjc.es //	ernesjimenez@hotmail.com
- Irene Núñez Carranza 		i.nunez.2016@alumnos.urjc.es 	//	inmusic.nazul@gmail.com
- Rodrigo Rojo García		r.rojo.2016@alumnos.urjc.es 	//	rodrigo-rojo@hotmail.com
 
## Descripción 

- Juego de plataformas y puzles multijugador, de scroll lateral 2D. 
- Ambientado en Egipto, en el interior de una de sus pirámides, en faraones, momias y trampas. 
- Objetivo: poder salir de la pirámide, solucionando diferentes puzles; los jugadores controlarán a la momia del faraón y de uno de sus sirvientes. 
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

### Concept Art
![mummy](https://user-images.githubusercontent.com/18311855/45764286-ad7f7c00-bc32-11e8-9130-e81fcb195a75.png)
![estandarte](https://user-images.githubusercontent.com/18311855/45764365-d99afd00-bc32-11e8-943d-beded2a61243.png)
![candelabro](https://user-images.githubusercontent.com/18311855/45764419-f7686200-bc32-11e8-8d98-cab42f7c2bf3.gif)
![fuego-en-piedra-pared](https://user-images.githubusercontent.com/18311855/45764426-fb947f80-bc32-11e8-9e4e-f1d128715cf5.gif)


## Historia
Anubis, maestro de la Necrópolis, y Bastet, Diosa de la armonía del hogar, despiertan a un faraón y a uno de sus sirvientes, los cuales estaban enamorados en vida y no pudieron estar juntos. Anubis y Bastet se apiadaron de ellos y su amor y les devuelven a la vida para que puedan vivir para siempre juntos, pero su poder es limitado. Devolver a un humano a la vida conlleva un coste y para hacer que sea permanente el faraón y la momia tienen que salir de la pirámide, pero no lo harán sin ningún problema. Hay dioses que están en contra de que puedan vivir otra vez, por lo que crean pruebas y llaman a bestias para impedir que salgan de la pirámide.

## Escenas
![escenas_escape_bandages](https://user-images.githubusercontent.com/18311855/48098082-f8257980-e21b-11e8-80d8-394c09262489.PNG)
\nAquí se puede observar el flujo de escenas de nuestro prototipo. 
![menu principal](https://user-images.githubusercontent.com/18311855/48101270-b3eba680-e226-11e8-9d21-0ba376e40106.PNG)
\nSe empieza en un menú principal con un botón para silenciar la música y otro botón para pasar al menú de selección de modo offline/online. (El modo online todavía no está activo).
![online-offline](https://user-images.githubusercontent.com/18311855/48101273-b51cd380-e226-11e8-98cb-e6f401777dc9.PNG)
\nDel menú de selección de modo de juego se puede volver al menú principal o empezar una partida dando a 'offline'. 
En el juego en sí hay varias maneras de cambiar de estado. La primera es reiniciar nivel con la tecla 'R' del teclado. 
El siguiente cambio es cuando los jugadores se pasan en el nivel que se va a la escena de 'Victoria', de la cual solo se puede acceder al menú principal. 
![victoria](https://user-images.githubusercontent.com/18311855/48101277-b64e0080-e226-11e8-8232-6402a2759ce9.PNG)
\nSi uno de los jugadores pierde todas sus vidas se cambia a la escena de derrota, tras la cual se puede volver a jugar el nivel o volver al menú principal.
![game over](https://user-images.githubusercontent.com/18311855/48101266-b221e300-e226-11e8-9f5d-9aeaa9830380.PNG)

## Pasos actuales del juego
Los dos jugadores aparecen en una sala sin nada. 
![1](https://user-images.githubusercontent.com/18311855/48101240-a504f400-e226-11e8-9ea0-724f08a2348b.PNG)
\nCuando avanzan aparecen Anubis y Bastet y les explican la situación y controles básicos. 
\nInmediatamente después el faraón no puede avanzar porque hay una puerta que le impide el paso, por lo que su amado tendrá que accionar un botón para permitirle avanzar.
![2](https://user-images.githubusercontent.com/18311855/48101244-a7674e00-e226-11e8-8660-6e511452d529.PNG)
\nEn este momento la momia y el faraón se encuentran cada uno a un Shek y tendrán que derrotarlos por separado. 
![3](https://user-images.githubusercontent.com/18311855/48101246-a8987b00-e226-11e8-8f3b-c872951e6e4d.PNG)
\nEl siguiente impedimento para avanzar es una gran caja en la habitación de la momia, la cual el faraón podrá mover con su telequinesis para permitirle el paso. 
![4](https://user-images.githubusercontent.com/18311855/48101248-a9c9a800-e226-11e8-8818-256daa1beaa2.PNG)
\nAhora es el faraón el que no puede avanzar, la momia tendrá que saltar un agujero y dar a un botón para abrir una compuerta con la que el faraón podrá bajar a la estancia en la que se encuentra la momia.
![5](https://user-images.githubusercontent.com/18311855/48101251-aa623e80-e226-11e8-8aed-a5d0256840af.PNG)
![6](https://user-images.githubusercontent.com/18311855/48101253-ab936b80-e226-11e8-9f0e-3172b7af03bf.PNG)
 \nAhora ambos pasan a una estancia más amplia en la que se encuentran dos Shek en plataformas volantes, una gran caja, un pasillo en la parte superior de la pared derecha y una puerta para un pasillo inferior en la pared derecha. Para que la puerta se abra los jugadores deberán matar a todos los Shek de la sala. 
![7](https://user-images.githubusercontent.com/18311855/48101255-acc49880-e226-11e8-86e5-2b862c093dfc.PNG)
 \nAhora ambos pueden avanzar, pero se encuentran con dos botones, los cuales tendrán que ser pulsados a la vez. Para poder hacerlo hay dos cajas en la cámara, aunque una de ellas está encerrada y tendrá que ser liberada. Para ello se necesita subir al pasillo superior con la ayuda de la telquinesis del faraón, allí se encontrará un botón que abre las compuertas de la caja y esta cae sobre uno de los botones y demuestra que pueden ser pulsados por ellas.
![8](https://user-images.githubusercontent.com/18311855/48101259-adf5c580-e226-11e8-8dff-91b8a4c5000f.PNG)
![9](https://user-images.githubusercontent.com/18311855/48101261-af26f280-e226-11e8-9930-56d76abee1fe.PNG)
\nCuando se colocan las dos cajas sobre los botones los dos personajes son libres de avanzar, saltar un agujero y salir de la pirámide.
![10](https://user-images.githubusercontent.com/18311855/48101263-afbf8900-e226-11e8-88c0-5743e7da0484.PNG)
![11](https://user-images.githubusercontent.com/18311855/48101265-b0f0b600-e226-11e8-8038-f52b2f0de2d4.PNG)