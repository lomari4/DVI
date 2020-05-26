## DESCRIPCIÓN GENERAL DEL PROYECTO

#### **Carpetas**
- **assets**: Esta carpeta contiene todas las imagenes, sonidos que se van a utilizar para el juego, dentro de esta hay otras carpetas que dividen las imagenes (carpeta de enemigos, del personaje principal).
- **slides**: Esta carpeta contiene las presentaciones del proyecto.
- **src**: En esta carpeta está todo el código relacionado al proyecto. Se explicará con detalle más adelante. 

#### **Ficheros**
- **architecture.md**: Fichero que define la estructura del proyecto.
- **assets.md**: Fichero que explica la estructura que tiene la carpeta assets.
- **GDD.md**: Explicación detallada de proyecto(objetivo del juego, mecánicas, personajes, etc). 
- **index.html**: Página principal del proyecto. Contiene el juego, lore del juego, controles básicos, un apartado sobre nosotros y un hipervínculo al repositorio. 
- **README.md**: Descripción general del proyecto.

## DESCRIPCIÓN DE LA ARQUITECTURA

En esta sección se van a explicar el uso de cada fichero .js.

- **'game.js**' incluye el menu principal del juego con sus dos botones de jugar y ayuda y es donde están todas las funciones comunes que utilizan los niveles. Esto último reduce mucho código repetido.
- **'level1.js', 'level2.js', 'level3.js', 'level4.js'** contienen el nivel del juego correspondiente donde se declaran las posiciones de los enemigos, se cargan los mapas correspondientes, el sonido, y se llaman a los distintos checks para comprobar el estado del juego. Cada vez que se pasa un nivel, el nivel llama a su siguiente nivel hasta llegar al nivel4, que este llamará a gameWin.
- **'gameWin.js'** es el fichero que muestra la pantalla de victoria, tiene un botón para volver al menú principal.
- **'gameOver.js'** es el fichero que muestra la pantalla de derrota, tiene dos botones, uno para volver a repetir el nivel y otro para volver al menú principal.
- **'help.js'** enseña un cartel con la guía básica del juego. Tiene un botón para volver al menú.
- **'pausedgame.js'** muestra un cartel que pone juego pausado, para volver a renaudar el juego se debe pulsar otra vez a la misma tecla (tecla P). 
- **'main.js'** es el que crea la pantalla del juego, con las dimensiones que se han descrito.
- **'index.css'** sirve para decorar la página donde va a estar el juego.
  
Los siguientes ficheros tienen propias animaciones y su propia programación que se difiere al resto.

- **'beam.js'** define los proyectiles que lanza el "iceDrake" cuando el jugador esta cerca y el "iceDrake" mirándole y el "boss" cuando este está enfurecido.
- **'iceYeti.js'** es el que define los pinchos de hielo que crea el "yeti" desde el suelo cuando el jugador esta cerca y el "yeti" mirándole.
- **'slash.js'** es el sprite que crea el jugador cuando ataca, es la forma de stunear a los enemigos y quitarle vida al "boss".
- **'wolf.js'** personaje principal del juego, el cual puede saltar, moverse y atacar.  Además tiene todas las animaciones de los movimientos descritos anteriormente y de estar quieto, perder vida y morir.
- ** 'swub.js'** el sprite que congela el suelo. No se le ha programado ningún ataque.
- **'icedrake.js'** es un dragón que se le ha programado una función de que si el personaje principal esta más o menos a la misma altura y con poca distancia, dispare el "beam".
- **'yeti.js'** es un yeti que se le ha programado una función de que si el personaje principal esta más o menos a la misma altura y con poca distancia, cree unos pinchos de hielo (que están en "iceYeti.js").
- **'boar.js'** es un jabalí que se le ha programado una función de que si el personaje principal esta más o menos a la misma altura y con poca distancia, corra mucho más rápido hacia el personaje.
- **'boss.js'** es el jefe final del juego, en el nivel no se puede ganar hasta que se le derrote y se descongele el suelo.  Está rogramado en bucle para que ataque durante unos segundos en los cuales él será invulnerable. Pasado un tiempo, caerá al suelo para recargar y el jugador podrá hacerle daño una vez. También dispara muchos "beam".

El **"swub", "boar", "yeti", "icedrake", "boss"** se guardan en un mismo grupo para hacer sus actualizaciones mucho más sencillas y menos repetitivas.
