import type { Content } from './en';

export const es: Content = {
  skip: "Saltar al contenido",
  description: "TinyRTS es un juego de estrategia en tiempo real en pixel art para Linux y Windows, hecho en Godot 4 y C#: campamentos neutrales, altura, niebla de guerra, IA rival y editor de mapas integrado.",
  nav: {
    main: "Secciones",
    language: "Idioma",
    home: "Inicio",
    game: "El juego",
    maps: "Mapas",
    gallery: "Capturas",
    built: "Técnica",
    credits: "Créditos"
  },
  hero: {
    tagline: "Un pequeño juego de estrategia en tiempo real, hecho desde cero en Godot 4 y C#.",
    watch: "Ver el tráiler",
    explore: "Explorar los mapas",
    note: "52 segundos, con sonido."
  },
  game: {
    title: "El juego",
    heading: "Qué se hace en una partida",
    paragraphs: [
      "Empiezas con un Castillo, tres Peones y unos pocos recursos. Los Peones talan, pican oro y llevan cada carga al Castillo a mano. Los árboles dejan tocón y las vetas se agotan, así que antes o después levantas un segundo Castillo sobre el siguiente grupo de recursos. Los corrales dan comida sin trabajo; las Casas suben la población; el Cuartel, la Arquería y el Monasterio entrenan Guerreros, Arqueros, Lanceros y Monjes; nueve tecnologías en tres ramas lo afilan todo.",
      "El mapa se comparte con campamentos neutrales: goblins, trolls, nidos de arañas, guaridas de ladrones, calas piratas en el agua. Cada uno tiene guardianes, un puesto fijo que defienden, regeneración si los dejas en paz y una recompensa al limpiarlo. Mercados, mercenarios y tabernas neutrales esperan en el centro del mapa a quien llegue primero. Gana el último jugador con un Castillo en pie."
    ],
    clips: [
      {
        id: "village",
        alt: "Una aldea viva: Peones recolectando y construyendo mientras se entrena tropa",
        caption: "Una aldea viva"
      },
      {
        id: "battle",
        alt: "Ejércitos azul y rojo chocando bajo las torres rojas",
        caption: "Una batalla entre jugadores"
      },
      {
        id: "camps",
        alt: "Limpiando una aldea goblin defendida por goblins con lanza y antorcha",
        caption: "Limpiando un campamento neutral"
      },
      {
        id: "editor",
        alt: "Pintando un bosque, un campamento y una torre en el editor, y jugando el mapa",
        caption: "El editor de mapas"
      }
    ]
  },
  features: {
    title: "Características",
    list: [
      {
        head: "Simulación en tiempo real",
        body: "a paso fijo de 20 Hz, dibujada a 60 fps interpolando entre ticks."
      },
      {
        head: "Movimiento libre en píxeles.",
        body: "A* sobre la cuadrícula de 64 px sin cortar esquinas, suavizado del camino y separación local por hash espacial. Las unidades nunca bloquean casillas; edificios, recursos y terreno sí. 200 unidades cruzan el mapa a 60 fps."
      },
      {
        head: "Una economía de viajes.",
        body: "Árboles y vetas finitos, Peones que recolectan, se cargan y entregan, comida pasiva de los corrales y expansión con un segundo Castillo. Mercado, mercenarios y taberna neutrales."
      },
      {
        head: "Altura que cuenta.",
        body: "Mesetas y acantilados unidos solo por escaleras laterales de una casilla. Las unidades a distancia y las torres ganan alcance y visión desde arriba; el cuerpo a cuerpo nunca cruza un borde."
      },
      {
        head: "21 tipos de campamento neutral",
        body: "con 24 criaturas del Enemy Pack, incluidos guardianes estáticos de agua como el tiburón arponero y el pez bomba. El mapa de cuatro jugadores tiene 33 campamentos."
      },
      {
        head: "IA rival",
        body: "para dos a cuatro jugadores que se expande, comercia en el mercado, levanta torres camino del enemigo y elige el objetivo de cada oleada por distancia o debilidad. Ajustada jugando cientos de partidas simuladas, porque la simulación no tiene azar y una sola partida es una muestra caótica, no una medida."
      },
      {
        head: "Niebla de guerra",
        body: "de tres estados, minimapa con avisos y controles de Warcraft 3: recuadro, click derecho contextual, atacar en movimiento, parar y mantener, grupos de control, bordes y WASD. Todas las teclas se pueden reasignar."
      },
      {
        head: "Editor de mapas",
        body: "al estilo Mario Maker. Se pinta terreno, recursos, campamentos y posiciones de salida sobre el mundo real, P prueba el mapa en menos de una décima de segundo y Esc devuelve al editor. Pincel, rectángulo, cubo y selección, copiar y pegar, girar y espejar, y un comprobador que avisa de bases inaccesibles, recursos vigilados o falta de sitio para construir."
      },
      {
        head: "Tres mapas oficiales.",
        body: "El Valle (96×64, dos jugadores), La Encrucijada (160×160, cuatro jugadores, simetría rotacional) y Cuatro vientos, hecho con el editor. Los dos primeros salen de generadores en Python que validan simetría, conectividad, anchura de los cuellos y distancias entre bases."
      },
      {
        head: "",
        body: "Ranuras de guardado con autoguardado, español e inglés, 59 sonidos, música y ambiente."
      }
    ]
  },
  maps: {
    title: "Los mapas",
    heading: "Los mapas, dibujados desde sus datos",
    intro: "Estos son los tres mapas oficiales tal y como los guarda el juego: un carácter por casilla para el terreno, más listas de árboles, vetas de oro, campamentos, edificios neutrales y posiciones de salida. Pasa el ratón para ver qué hay en cada sitio.",
    list: [
      {
        id: "valley",
        name: "El Valle",
        desc: "Dos jugadores frente a frente en un valle con río: 27 campamentos, una cala pirata en la costa noreste y aldeas gnomas y goblins cerradas por bosque."
      },
      {
        id: "crossroads",
        name: "La Encrucijada",
        desc: "Cuatro jugadores con simetría rotacional de 90°: cada base tiene su expansión natural, dos rutas hacia las vecinas, 33 campamentos y una taberna en el centro."
      },
      {
        id: "cuatro-vientos",
        name: "Cuatro vientos",
        desc: "Hecho con el editor del juego: una meseta con escalera al norte de cada base y campamentos entre medias. Sus estacas enseñan el radio de campamento que usa el editor."
      }
    ],
    legend: [
      {
        color: "#4fb0b3",
        name: "Agua"
      },
      {
        color: "#8fc357",
        name: "Hierba"
      },
      {
        color: "#b3d96a",
        name: "Meseta"
      },
      {
        color: "#4a7473",
        name: "Acantilado"
      },
      {
        color: "#d1bb6e",
        name: "Escalera"
      },
      {
        color: "#3c7d3b",
        name: "Árbol"
      },
      {
        color: "#f2c03a",
        name: "Veta de oro"
      },
      {
        color: "#c8503c",
        name: "Campamento"
      },
      {
        color: "#2f7f83",
        name: "Campamento de agua"
      },
      {
        color: "#e9c552",
        name: "Mercado, mercenarios o taberna"
      },
      {
        color: "#3f8fbf",
        name: "Posición de salida"
      }
    ],
    text: {
      gold: "Veta de oro",
      goldAmount: "{n} de oro",
      forest: "Árbol",
      water: "Agua",
      grass: "Hierba",
      plateau: "Meseta",
      cliff: "Acantilado",
      stairs: "Escalera",
      campGeneric: "Campamento",
      campDetail: "Campamento neutral con guardianes y recompensa",
      tierLabel: "Dificultad: {t}",
      tiers: {
        easy: "fácil",
        medium: "media",
        hard: "difícil"
      },
      neutrals: {
        market: "Mercado goblin",
        mercenaries: "Campamento de mercenarios",
        tavern: "Taberna"
      },
      neutralDetail: "Edificio neutral para quien llegue primero",
      start: "Salida {n}",
      startDetail: "Castillo y tres Peones",
      mapInfo: "{w}×{h} casillas, {p} jugadores, {c} campamentos",
      loading: "Cargando…",
      loadError: "No se han podido cargar los datos del mapa.",
      camps: {
        BatCave: "Cueva de murciélagos",
        Bear: "Cueva del oso",
        CoastBattery: "Batería costera",
        Fumarole: "Fumarola",
        GnollCamp: "Campamento gnoll",
        Gnome: "Aldea gnoma",
        GnomeVillage: "Aldea gnoma",
        Goblin: "Campamento goblin",
        GoblinVillage: "Poblado goblin",
        Graveyard: "Cementerio",
        Hive: "Colmena",
        Lighthouse: "Faro pirata",
        MinotaurLair: "Guarida del minotauro",
        PandaGrove: "Bosquecillo de pandas",
        Pigsty: "Cochiquera goblin",
        PirateCove: "Cala pirata",
        SpiderNest: "Nido de arañas",
        Swamp: "Ciénaga",
        ThiefHideout: "Escondrijo de ladrones",
        Troll: "Guarida del troll",
        TurtleBeach: "Playa de tortugas"
      }
    }
  },
  gallery: {
    title: "Capturas",
    shots: [
      {
        id: "village",
        alt: "Una aldea grande con casas, monasterio, cuartel y torres",
        caption: "Una aldea a pleno rendimiento"
      },
      {
        id: "battle",
        alt: "Ejércitos azul y rojo peleando junto a una torre y un Castillo rojos",
        caption: "Asalto a una base roja"
      },
      {
        id: "spiders",
        alt: "Guerreros y arqueros peleando con arañas junto a una charca",
        caption: "Un nido de arañas"
      },
      {
        id: "goblin-village",
        alt: "Una aldea goblin con un troll, cerrada por bosque con una sola entrada",
        caption: "Una aldea goblin neutral"
      },
      {
        id: "stairs",
        alt: "Una meseta con una escalera lateral tallada en el acantilado",
        caption: "Una meseta y su escalera lateral"
      },
      {
        id: "plateau",
        alt: "Un corral sobre una meseta por encima del bosque",
        caption: "Un corral en alto"
      },
      {
        id: "menu",
        alt: "Menú principal sobre un panel de pergamino con banda azul",
        caption: "Menú principal"
      },
      {
        id: "training",
        alt: "El panel del Castillo con la cola de entrenamiento y el punto de reunión",
        caption: "Cola de entrenamiento del Castillo"
      },
      {
        id: "editor",
        alt: "El editor de mapas con su barra de piezas y de herramientas",
        caption: "El editor de mapas"
      },
      {
        id: "victory",
        alt: "El panel de victoria al caer el Castillo enemigo",
        caption: "Victoria"
      }
    ]
  },
  built: {
    title: "Cómo está hecho",
    before: [
      "El juego son dos mitades que nunca se mezclan. La simulación es C# puro, sin nodos de Godot ni delta de frame, que avanza a paso fijo, se prueba con xUnit sin abrir el motor y se serializa a JSON para guardar. La capa de Godot dibuja ese estado y aloja una interfaz que nunca toca una entidad: solo encola órdenes, igual que la IA.",
      "Esa separación es lo que hace posible el resto. La batería de tests juega partidas enteras: diez minutos de IA contra IA en el Valle y quince con cuatro IAs en La Encrucijada corren sin ventana en unos treinta segundos, y comprueban cosas como \"nadie es eliminado antes del minuto diez\" o \"ninguna IA se queda ociosa un minuto\". Un arnés de línea de comandos maneja el motor real con entrada sintética y órdenes con guion, saca capturas y mide el tiempo por frame, así que cualquier cambio se verifica sin ratón."
    ],
    facts: [
      {
        key: "Motor",
        value: "Godot 4.6.2 .NET, C# 12 sobre .NET 8, sin más dependencias"
      },
      {
        key: "Render",
        value: "Compatibility (OpenGL 3.3), filtro nearest, ajuste al píxel"
      },
      {
        key: "Código",
        value: "Unas {16000} líneas de C# en {88} ficheros, más {4300} de tests"
      },
      {
        key: "Tests",
        value: "{181}, incluidas partidas simuladas completas"
      },
      {
        key: "Rendimiento",
        value: "4 IAs y {300} unidades a 60 fps con un tick de simulación de 1,3 ms"
      },
      {
        key: "Contenido",
        value: "{29} tipos de unidad, 7 edificios, 9 tecnologías, {21} tipos de campamento, 3 mapas"
      },
      {
        key: "Textos",
        value: "{519} cadenas traducidas a español e inglés"
      }
    ],
    after: [
      "El terreno y las capas estáticas son comandos de dibujo retenidos, no nodos; solo lo que se anima es un sprite; los anillos de selección, la espuma y las sombras son nodos únicos que se redibujan cuando algo cambia. La escena entera se queda en torno a una docena de draw calls con cientos de unidades en pantalla.",
      "El proyecto se ha hecho con Claude Code programando y conmigo dirigiendo el diseño, jugando cada build y decidiendo qué entra y qué se descarta. El repositorio con el código es privado; esta web es la presentación pública."
    ]
  },
  credits: {
    title: "Créditos",
    statusTitle: "Estado",
    status: "Jugable de principio a fin: economía, construcción, entrenamiento, combate, tecnología, IA para dos y cuatro jugadores, campamentos neutrales, guardado, audio, editor y dos idiomas. El desarrollo empezó el 8 de septiembre de 2026. La hoja de ruta apunta a Steam, y por eso las estadísticas de partida ya viven en la simulación y cada guardado es un fichero por ranura.",
    list: [
      {
        before: "Arte: ",
        link: {
          href: "https://pixelfrog-assets.itch.io/tiny-swords",
          text: "Tiny Swords"
        },
        after: " y su Enemy Pack, de Pixel Frog, usados bajo su licencia. La interfaz y el fondo vivo de esta web están hechos con los mismos packs."
      },
      {
        before: "Tipografía: Pixelify Sans, de Stefie Justprince, SIL Open Font License."
      },
      {
        before: "Sonidos: Pixabay."
      },
      {
        before: "Motor: Godot Engine."
      }
    ]
  },
  footer: {
    rights: "Capturas, vídeo y textos © 2026 9n-dev.",
    attribution: "Arte: Tiny Swords, de Pixel Frog.",
    top: "Volver arriba"
  },
  ui: {
    close: "Cerrar",
    prev: "Anterior",
    next: "Siguiente",
    trailerTitle: "Tráiler de TinyRTS",
    mapLabel: "Mapa"
  }
};
