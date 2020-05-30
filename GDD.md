# Everlasting Winter

Proyecto de la asignatura Desarrollo de Videojuegos mediante Tecnologías Web de la Universidad Complutense de Madrid.

# 1. Introducción

Everlasting Winter es un videojuego de plataformas 2D hecho con pixel art y diseñado para ser jugado en una página web con ordenador y teclado. El rating de este juego es PEGI 7, siendo apto para todos los públicos, pero con imágenes que podrían asustar a niños más pequeños.

Everlasting Winter está inspirado en un minijuego llamado Jack Frost, en el que el personaje es un hombre de hielo y el objetivo es congelar todo el nivel. Nosotros le hemos dado una vuelta a este concepto. El jugador es un guardián del bosque cuyo propósito es protegerlo y asegurarse de que todos sus habitantes viven en harmonía. Todo esto se ve en peligro cuando un monstruo de hielo congela todo y amenaza con sumir al mundo entero en un invierno eterno, de ahí el nombre del juego, 'Everlasting Winter' . El jugador tiene que recorrer el bosque y derretir toda la nieve, pero no será tan fácil, ya que el monstruo ha enviado a sus lacayos para detener a nuestro personaje.

## 1.2. Objetivo del juego

El objetivo principal es derretir toda la nieve del nivel para poder pasar al siguiente nivel. Nuestro personaje podrá hacer esto solo con pisar el suelo, derretirá la nieve alrededor de él y hará que salga hierba.

## 1.3. Principales mecánicas

Además de descongelar el suelo con tocarlo, nuestro personaje podrá atacar a melee para aturdir a los enemigos, pero no podrá matarlos. Por el contrario, los enemigos sí podrán matar a nuestro personaje, que tendrá tres vidas.

![lives](https://i.imgur.com/MZS3AAW.png)

Nuestro personaje podrá saltar, como es lo normal en los juegos de plataformas, y correr de un lado a otro. La cámara seguirá al personaje por el nivel.

Para pasar al siguiente nivel, el personaje tendrá que recorrerlo entero para poder descongelarlo, evitando a los enemigos. Si las 3 vidas del personaje se acaban, el jugador tendrá que volver al principio y el nivel se reiniciará.

## 1.4. Controles básicos

Todos los controles se pueden ver en la seccion de 'Help' en el menu principal del juego. Se juega con el teclado, usando las teclas WAD o las flechas para moverte de un lado a otro y saltar. Se usará el espacio para atacar.
El juego se puede pausar con la tecla P en cualquier momento. También se puede desactivar el soundrack del juego dandole click a un icono de una nota musical en pantalla.

![h](https://i.imgur.com/LUoMkFu.png)

# 2. Personajes

## 2.1. Personaje principal

Elegimos un lobo que es medio árbol para caracterizar a la naturaleza, ya que es un guardián del bosque y tiene poderes para derretir la nieve y hacer que salga hierba del suelo. El sprite con todas sus animaciones está hecho por nosotros.

![wolf](https://s5.gifyu.com/images/wolf_run.gif)![wolfattack](https://i.imgur.com/P12Xq70.png)


## 2.2. Enemigos
Cuando el jugador es dañado, ya sea por tocar a un enemigo o por un ataque, se le quita una vida.

### 2.2.1. Ice Drake

Enemigo que podrá andar de un lado a otro y escupir hielo. Será un ataque de rango y llegará hasta el final del nivel o hasta que golpee al personaje.

![ice drake](https://vignette.wikia.nocookie.net/maplestory/images/9/94/Mob_Ice_Drake.png/revision/latest/scale-to-width-down/340?cb=20080126051117)![ice drakeattack](https://i.imgur.com/H68NDKj.png)

### 2.2.2. Swub

Monstruito peludo que se arrastra sobre el suelo y puede volver a congelarlo, deshaciendo todo el trabajo de nuestro personaje. No ataca.

![swub](https://cdn.wikimg.net/en/strategywiki/images/9/9e/MS_Monster_Murukun.png)

### 2.2.3. Yeti

Un yeti que golpea el suelo para levantar pinchos helados en frente de él. Anda lentamente de un lado a otro. Los pinchos helados con sus animaciones están hechos por nosotros.

![yeti](https://vignette.wikia.nocookie.net/maplestory/images/b/bd/Mob_Yeti.png/revision/latest/scale-to-width-down/340?cb=20100814143115)![yetiattack](https://i.imgur.com/gqJPqRv.png)

### 2.2.4. Boar

Un jabalí que embestirá al personaje. Corre hacia el jugador. Los ojos rojos del jabalí cuando corre están hechos por nosotros.

![boar](https://i.imgur.com/KXpxnoP.png)![boarattack](https://i.imgur.com/qx3G2RU.png)

### 2.2.4. Jefe Final

Una especie de golem volador, responsable de prolongar el invierno eternamente. Tiene un ataque a rango, al igual que el Ice Drake. Para derrotarle, hay que esquivar todos sus ataques hasta que pare a recargar, y ahí sera vulnerable. Se le atacará hasta que se le acaben sus 6 vidas, que se mostrarán al jugador en la parte de arriba a la derecha. 

![boss](https://vignette.wikia.nocookie.net/maplestory/images/6/62/Mob_Opachu.png/revision/latest?cb=20080126055504)![bossattack](https://i.imgur.com/jmctplo.png)![blives](https://i.imgur.com/42G1Z2L.png)

# 3. Niveles
Son cuatro niveles, el ultimo siendo el del boss final. Cada nivel tendrá diferentes alturas y la cámara seguirá al jugador por todas ellas, excepto en el ultimo nivel, en que la camara se bloqueará cuando el jefe final esté a la vista.

![levelexample](https://i.imgur.com/AoEkvVk.png)

## Primer nivel
Aparecerán los enemigos Swub y Ice Drake. Dos alturas.

![l1](https://i.imgur.com/YNEWtuP.png)

## Segundo nivel
Aparecerán Swub, Ice Drake y Boar. Tres alturas.

![l2](https://i.imgur.com/Z3N85qS.png)

## Tercer nivel
Aparecerán todos los enemigos. Cuatro alturas. 

![l3](https://i.imgur.com/H6177uX.png)

## Nivel final
Aparecerá el boss final. Hay dos plataformas para esquivar más facilmente sus ataques. El resto del nivel es plano.

![l4](https://i.imgur.com/YiFoyKF.png)

# 4. Arte
Los escenarios de este juego serán bosques nevados que evolucionarán según el personaje vaya completando el nivel.
Los assets de los enemigos los hemos sacado de 'The Spriters Resource' y los tiles de Kenney.nl, aunque hemos tenido que hacer modificaciones para que todo esté mismo estilo de arte, dibujándoles contornos negros. El personaje principal lo hemos creado y animado nosotros, al igual que algunas animaciones que ya han sido mencionadas en el apartado de los enemigos.
La evolución del nivel se puede ver en la siguiente imagen:
![transicion](https://i.imgur.com/RhrzzTT.png)

El background cambiará cuando el nivel se complete:
![bg](https://i.imgur.com/sXGeiDn.png)

# 5. Música y sonidos
La música de este juego pertenece a [Aaron Krogh](https://www.youtube.com/user/amkrogh89/featured "Aaron Krogh"), un compositor que deja que cualquiera use su música, ya sea para proyectos comerciales o no. De su gran librería de pistas, hemos escogido 5, una para la pantalla de título, para los 3 niveles y para el jefe final:
- Menú principal – Night 2
- Nivel 1 – Snow
- Nivel 2 – Serenity
- Nivel 3 – Treacherous Slopes
- Jefe final – Bloodlust

# 6. Desarrolladores
Marina López Osorio y Jin Tao Peng Zhou, estudiantes de la Universidad Complutense de Madrid.

# 7. Recursos

* [Kenney.nl](https://www.kenney.nl/)

* [The Spriters Resource](https://www.spriters-resource.com/)

* [Itch.io](https://itch.io/game-assets)
