import type { Guide } from './en';

/** The field guide. Numbers come from docs/manual.md of the game, checked against its unit, building and tech tables. */
export const guide: Guide = {
  title: 'Guía',
  heading: 'Todo lo que hay en una partida',
  intro: 'Las cifras son las del juego tal y como está hoy; el balance es provisional.',
  tabs: { units: 'Unidades', buildings: 'Edificios', techs: 'Tecnologías', camps: 'Campamentos', controls: 'Controles' },
  costLabel: 'Coste', fromLabel: 'Se entrena en', needsLabel: 'Requiere',
  units: [
    { sprite: 'pawnIdle', name: 'Peón', from: 'Castillo', cost: '40 comida', role: 'Recolecta, construye y repara. Varios Peones en la misma obra la terminan antes.' },
    { sprite: 'warriorIdle', name: 'Guerrero', from: 'Cuartel', cost: '40 oro + 30 comida', role: 'La línea de frente barata: aguanta golpes y pelea cuerpo a cuerpo.' },
    { sprite: 'archerIdle', name: 'Arquero', from: 'Arquería', cost: '30 madera + 30 comida', role: 'Daño a distancia. Desde una meseta dispara más lejos.' },
    { sprite: 'lancerIdle', name: 'Lancero', from: 'Cuartel', cost: '50 oro + 30 comida', role: 'El más rápido, con algo más de alcance que el Guerrero: flanquea y persigue.' },
    { sprite: 'monkIdle', name: 'Monje', from: 'Monasterio', cost: '60 oro + 20 comida', role: 'No ataca: cura al aliado más herido que tenga cerca.' },
  ],
  unitsNote: 'Cada unidad ocupa 1 de población, hasta un máximo de 60. Las unidades ociosas atacan solas a lo que se acerca y vuelven a su sitio.',
  buildings: [
    { sprite: 'castle', name: 'Castillo', cost: '500 madera + 50 oro', role: 'Donde los Peones entregan los recursos. Da 8 de población, entrena Peones e investiga Economía. Un segundo Castillo es tu expansión; si cae el último, pierdes.' },
    { sprite: 'house1', name: 'Casa', cost: '80 madera', role: '+4 de población.' },
    { sprite: 'sheepGrass', name: 'Corral', cost: '60 madera', role: 'Comida sin trabajo: hasta cuatro ovejas que producen solas.' },
    { sprite: 'barracks', name: 'Cuartel', cost: '120 madera + 40 oro', role: 'Entrena Guerreros y Lanceros e investiga la rama Militar.' },
    { sprite: 'archery', name: 'Arquería', cost: '100 madera + 30 oro', role: 'Entrena Arqueros.' },
    { sprite: 'monastery', name: 'Monasterio', cost: '120 madera + 80 oro', role: 'Entrena Monjes e investiga la rama de Cultura.' },
    { sprite: 'tower', name: 'Torre', cost: '80 madera + 60 oro', role: 'Dispara sola a lo que se acerque, y más lejos desde una meseta.' },
  ],
  buildingsNote: 'Construir con varios Peones acelera la obra. Reparar cuesta un poco de madera.',
  techs: [
    { branch: 'Economía', at: 'Castillo', list: [
      { name: 'Hachas afiladas', cost: '60 oro', effect: '+4 madera por viaje.' },
      { name: 'Minería', cost: '80 oro', effect: '+3 oro por viaje.', needs: 'Hachas afiladas' },
      { name: 'Ganadería', cost: '70 oro + 20 comida', effect: 'Los corrales producen un 50 % más y +1 población por casa.', needs: 'Hachas afiladas' },
    ] },
    { branch: 'Militar', at: 'Cuartel', list: [
      { name: 'Armaduras', cost: '90 oro', effect: '+15 vida para Guerrero y Lancero.' },
      { name: 'Instrucción', cost: '120 oro', effect: 'Guerrero y Lancero un 15 % más rápidos.', needs: 'Armaduras' },
      { name: 'Flechas de acero', cost: '80 oro + 30 madera', effect: '+2 daño para Arquero y Torre.' },
    ] },
    { branch: 'Cultura', at: 'Monasterio', list: [
      { name: 'Fe', cost: '60 oro + 20 comida', effect: 'El Monje cura 2 más por segundo.' },
      { name: 'Cantería', cost: '60 oro + 60 madera', effect: '+100 vida a los edificios y obras un 20 % más rápidas.' },
      { name: 'Fortificación', cost: '120 oro + 40 madera', effect: 'La Torre gana +3 daño y +1 alcance.', needs: 'Cantería' },
    ] },
  ],
  techsNote: 'Una investigación a la vez por edificio. Cancelar devuelve el coste.',
  camps: {
    intro: 'Los guardianes defienden su puesto, vuelven a él si los alejas y se curan mientras nadie les molesta. Quien mata al último se lleva la recompensa: o los recursos, o una criatura del campamento que se une a su ejército.',
    guardsLabel: 'Guardianes', rewardLabel: 'Recompensa', joinsLabel: 'o se une:',
    tiers: [
      {
        tier: "easy",
        name: "Fácil",
        list: [
          {
            name: "Campamento goblin",
            guards: "1 goblin lancero",
            reward: "60 madera · 30 oro · 30 comida",
            joins: "Peón"
          },
          {
            name: "Cueva del oso",
            guards: "1 oso",
            reward: "30 oro · 80 comida",
            joins: "Guerrero"
          },
          {
            name: "Nido de arañas",
            guards: "4 arañas",
            reward: "100 madera · 40 comida",
            joins: "Arquero"
          },
          {
            name: "Bosquecillo de pandas",
            guards: "2 pandas",
            reward: "120 comida",
            joins: "Guerrero"
          },
          {
            name: "Cueva de murciélagos",
            guards: "4 murciélagos",
            reward: "60 oro",
            joins: "Arquero"
          },
          {
            name: "Colmena",
            guards: "5 abejorros",
            reward: "40 madera · 60 comida",
            joins: "Peón"
          }
        ]
      },
      {
        tier: "medium",
        name: "Mediano",
        list: [
          {
            name: "Aldea gnoma",
            guards: "2 gnomos honderos, 1 gnomo",
            reward: "40 madera · 50 oro",
            joins: "Arquero"
          },
          {
            name: "Cementerio",
            guards: "4 esqueletos, 1 chamán",
            reward: "90 oro · 40 comida",
            joins: "Monje"
          },
          {
            name: "Campamento gnoll",
            guards: "2 gnolls, 2 lagartos",
            reward: "80 madera · 70 oro · 50 comida",
            joins: "Lancero"
          },
          {
            name: "Ciénaga",
            guards: "3 serpientes, 2 lagartos",
            reward: "60 oro · 80 comida",
            joins: "Guerrero"
          },
          {
            name: "Escondrijo de ladrones",
            guards: "4 ladrones",
            reward: "160 oro",
            joins: "Peón"
          },
          {
            name: "Cala pirata",
            guards: "1 goblin jinete, 1 tiburón arponero, 1 pez bomba",
            reward: "80 madera · 100 oro · 60 comida",
            joins: "Arquero"
          },
          {
            name: "Cochiquera goblin",
            guards: "2 goblins jinetes, 2 goblins antorcha",
            reward: "100 madera · 60 oro · 40 comida",
            joins: "Guerrero"
          },
          {
            name: "Playa de tortugas",
            guards: "3 tortugas",
            reward: "80 oro · 60 comida",
            joins: "Lancero"
          },
          {
            name: "Batería costera",
            guards: "2 tiburones remeros, 1 barca cañonera",
            reward: "100 oro",
            joins: "Arquero"
          },
          {
            name: "Faro pirata",
            guards: "2 tiburones arponeros",
            reward: "40 madera · 80 oro",
            joins: "Arquero"
          }
        ]
      },
      {
        tier: "hard",
        name: "Difícil",
        list: [
          {
            name: "Guarida del troll",
            guards: "1 troll, 2 goblins antorcha",
            reward: "100 madera · 80 oro · 80 comida",
            joins: "Lancero"
          },
          {
            name: "Poblado goblin",
            guards: "3 goblins lanceros, 2 goblins antorcha",
            reward: "150 madera · 80 oro · 80 comida",
            joins: "Guerrero"
          },
          {
            name: "Aldea gnoma grande",
            guards: "5 gnomos honderos, 2 gnomos",
            reward: "120 madera · 140 oro",
            joins: "Arquero"
          },
          {
            name: "Guarida del minotauro",
            guards: "1 minotauro, 2 esqueletos",
            reward: "150 madera · 150 oro · 100 comida",
            joins: "Lancero"
          },
          {
            name: "Fumarola",
            guards: "4 diablillos",
            reward: "150 madera · 120 oro · 80 comida",
            joins: "Monje"
          }
        ]
      }
    ],
    waterNote: 'En el agua esperan tiburones arponeros, tiburones remeros, barcas cañoneras y peces bomba, que explotan al morir.',
    neutralsTitle: 'Edificios neutrales',
    neutrals: [
      { name: 'Mercado goblin', text: 'Cambia madera por oro y oro por madera. Cada trato encarece el siguiente, y el precio se recupera con el tiempo.' },
      { name: 'Campamento de mercenarios', text: 'Contrata goblins lanceros, gnolls y osos por oro. Hay pocos, y tardan en reponerse.' },
      { name: 'Taberna', text: 'Un campeón por jugador y partida: panda, gnoll o ladrón.' },
    ],
  },
  controls: {
    groups: [
      { title: 'Ratón', rows: [
        { keys: 'Click izquierdo', action: 'Seleccionar. Arrastrando, recuadro; con Mayús, añade a la selección' },
        { keys: 'Doble click', action: 'Todas las unidades de ese tipo en pantalla' },
        { keys: 'Click derecho', action: 'Orden según el objetivo: atacar, recolectar, construir o reparar, mover. Con Mayús, encola' },
        { keys: 'Rueda', action: 'Zoom' },
        { keys: 'Botón central', action: 'Arrastrar la cámara' },
      ] },
      { title: 'Órdenes', rows: [
        { keys: 'F', action: 'Atacar en movimiento' },
        { keys: 'X', action: 'Parar' },
        { keys: 'H', action: 'Mantener posición' },
        { keys: 'Ctrl + 1…9', action: 'Guardar grupo. 1…9 lo recupera, Mayús + 1…9 añade' },
        { keys: '.', action: 'Siguiente Peón inactivo' },
        { keys: 'Espacio', action: 'Cámara al último aviso' },
      ] },
      { title: 'Construir, con Peones', rows: [
        { keys: 'C · V · B', action: 'Casa · Corral · Cuartel' },
        { keys: 'Q · M · T', action: 'Arquería · Monasterio · Torre' },
        { keys: 'X', action: 'Castillo (expansión)' },
        { keys: 'Mayús al colocar', action: 'Encola hasta tres obras' },
      ] },
      { title: 'Entrenar y cámara', rows: [
        { keys: 'P · G · R · L · K', action: 'Peón · Guerrero · Arquero · Lancero · Monje' },
        { keys: 'WASD o flechas', action: 'Mover la cámara; también los bordes de la pantalla y el minimapa' },
        { keys: 'Esc', action: 'Menú de pausa' },
      ] },
    ],
    note: 'Todas las teclas se pueden reasignar en Configuración, con aviso de conflictos.',
  },
};
