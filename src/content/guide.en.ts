import type { Guide } from './en';

/** The field guide. Numbers come from docs/manual.md of the game, checked against its unit, building and tech tables. */
export const guide: Guide = {
  title: 'Field guide',
  heading: 'Everything in a match',
  intro: 'Numbers are those of the game as it stands today; balance is provisional.',
  tabs: { units: 'Units', buildings: 'Buildings', techs: 'Technologies', camps: 'Camps', controls: 'Controls' },
  costLabel: 'Cost', fromLabel: 'Trained at', needsLabel: 'Requires',
  units: [
    { sprite: 'pawnIdle', name: 'Pawn', from: 'Castle', cost: '40 food', role: 'Gathers, builds and repairs. Several Pawns on the same site finish it sooner.' },
    { sprite: 'warriorIdle', name: 'Warrior', from: 'Barracks', cost: '40 gold + 30 food', role: 'The cheap front line: takes hits and fights in melee.' },
    { sprite: 'archerIdle', name: 'Archer', from: 'Archery Range', cost: '30 wood + 30 food', role: 'Ranged damage. Shoots farther from a plateau.' },
    { sprite: 'lancerIdle', name: 'Lancer', from: 'Barracks', cost: '50 gold + 30 food', role: 'The fastest unit, with a little more reach than the Warrior: flanks and chases.' },
    { sprite: 'monkIdle', name: 'Monk', from: 'Monastery', cost: '60 gold + 20 food', role: 'Does not attack: heals the most wounded ally nearby.' },
  ],
  unitsNote: 'Every unit takes 1 population, up to a cap of 60. Idle units attack whatever comes close on their own, then return to their spot.',
  buildings: [
    { sprite: 'castle', name: 'Castle', cost: '500 wood + 50 gold', role: 'Where Pawns deliver resources. Gives 8 population, trains Pawns and researches Economy. A second Castle is your expansion; lose the last one and you are out.' },
    { sprite: 'house1', name: 'House', cost: '80 wood', role: '+4 population.' },
    { sprite: 'sheepGrass', name: 'Corral', cost: '60 wood', role: 'Food without labour: up to four sheep that produce on their own.' },
    { sprite: 'barracks', name: 'Barracks', cost: '120 wood + 40 gold', role: 'Trains Warriors and Lancers and researches the Military branch.' },
    { sprite: 'archery', name: 'Archery Range', cost: '100 wood + 30 gold', role: 'Trains Archers.' },
    { sprite: 'monastery', name: 'Monastery', cost: '120 wood + 80 gold', role: 'Trains Monks and researches the Culture branch.' },
    { sprite: 'tower', name: 'Tower', cost: '80 wood + 60 gold', role: 'Shoots on its own at whatever comes close, and farther from a plateau.' },
  ],
  buildingsNote: 'Building with several Pawns speeds up the work. Repairing costs a little wood.',
  techs: [
    { branch: 'Economy', at: 'Castle', list: [
      { name: 'Sharp Axes', cost: '60 gold', effect: '+4 wood per trip.' },
      { name: 'Mining', cost: '80 gold', effect: '+3 gold per trip.', needs: 'Sharp Axes' },
      { name: 'Husbandry', cost: '70 gold + 20 food', effect: 'Corrals produce 50% more and +1 population per house.', needs: 'Sharp Axes' },
    ] },
    { branch: 'Military', at: 'Barracks', list: [
      { name: 'Armor', cost: '90 gold', effect: '+15 health for Warrior and Lancer.' },
      { name: 'Drill', cost: '120 gold', effect: 'Warrior and Lancer 15% faster.', needs: 'Armor' },
      { name: 'Steel Arrows', cost: '80 gold + 30 wood', effect: '+2 damage for Archer and Tower.' },
    ] },
    { branch: 'Culture', at: 'Monastery', list: [
      { name: 'Faith', cost: '60 gold + 20 food', effect: 'The Monk heals 2 more per second.' },
      { name: 'Masonry', cost: '60 gold + 60 wood', effect: '+100 building health and construction 20% faster.' },
      { name: 'Fortification', cost: '120 gold + 40 wood', effect: 'The Tower gains +3 damage and +1 range.', needs: 'Masonry' },
    ] },
  ],
  techsNote: 'One research at a time per building. Cancelling refunds the cost.',
  camps: {
    intro: 'Guardians defend their post, go back to it if you lure them away, and heal while nobody bothers them. Whoever kills the last one takes the reward: either the resources, or a creature from the camp that joins their army.',
    guardsLabel: 'Guardians', rewardLabel: 'Reward', joinsLabel: 'or joins you:',
    tiers: [
      {
        tier: "easy",
        name: "Easy",
        list: [
          {
            name: "Goblin camp",
            guards: "1 spear goblin",
            reward: "60 wood · 30 gold · 30 food",
            joins: "Pawn"
          },
          {
            name: "Bear cave",
            guards: "1 bear",
            reward: "30 gold · 80 food",
            joins: "Warrior"
          },
          {
            name: "Spider nest",
            guards: "4 spiders",
            reward: "100 wood · 40 food",
            joins: "Archer"
          },
          {
            name: "Panda grove",
            guards: "2 pandas",
            reward: "120 food",
            joins: "Warrior"
          },
          {
            name: "Bat cave",
            guards: "4 giant bats",
            reward: "60 gold",
            joins: "Archer"
          },
          {
            name: "Hive",
            guards: "5 bumblebees",
            reward: "40 wood · 60 food",
            joins: "Pawn"
          }
        ]
      },
      {
        tier: "medium",
        name: "Medium",
        list: [
          {
            name: "Gnome village",
            guards: "2 slingshot gnomes, 1 gnome",
            reward: "40 wood · 50 gold",
            joins: "Archer"
          },
          {
            name: "Graveyard",
            guards: "4 skeletons, 1 hex shaman",
            reward: "90 gold · 40 food",
            joins: "Monk"
          },
          {
            name: "Gnoll camp",
            guards: "2 gnolls, 2 lizards",
            reward: "80 wood · 70 gold · 50 food",
            joins: "Lancer"
          },
          {
            name: "Swamp",
            guards: "3 snakes, 2 lizards",
            reward: "60 gold · 80 food",
            joins: "Warrior"
          },
          {
            name: "Thief hideout",
            guards: "4 thieves",
            reward: "160 gold",
            joins: "Pawn"
          },
          {
            name: "Pirate cove",
            guards: "1 pig rider, 1 harpoon shark, 1 bomb fish",
            reward: "80 wood · 100 gold · 60 food",
            joins: "Archer"
          },
          {
            name: "Goblin pigsty",
            guards: "2 pig riders, 2 torch goblins",
            reward: "100 wood · 60 gold · 40 food",
            joins: "Warrior"
          },
          {
            name: "Turtle beach",
            guards: "3 turtles",
            reward: "80 gold · 60 food",
            joins: "Lancer"
          },
          {
            name: "Coastal battery",
            guards: "2 paddle sharks, 1 cannon boat",
            reward: "100 gold",
            joins: "Archer"
          },
          {
            name: "Pirate lighthouse",
            guards: "2 harpoon sharks",
            reward: "40 wood · 80 gold",
            joins: "Archer"
          }
        ]
      },
      {
        tier: "hard",
        name: "Hard",
        list: [
          {
            name: "Troll lair",
            guards: "1 troll, 2 torch goblins",
            reward: "100 wood · 80 gold · 80 food",
            joins: "Lancer"
          },
          {
            name: "Goblin settlement",
            guards: "3 spear goblins, 2 torch goblins",
            reward: "150 wood · 80 gold · 80 food",
            joins: "Warrior"
          },
          {
            name: "Large gnome village",
            guards: "5 slingshot gnomes, 2 gnomes",
            reward: "120 wood · 140 gold",
            joins: "Archer"
          },
          {
            name: "Minotaur lair",
            guards: "1 minotaur, 2 skeletons",
            reward: "150 wood · 150 gold · 100 food",
            joins: "Lancer"
          },
          {
            name: "Fumarole",
            guards: "4 imps",
            reward: "150 wood · 120 gold · 80 food",
            joins: "Monk"
          }
        ]
      }
    ],
    waterNote: 'In the water wait harpoon sharks, paddle sharks, cannon boats and bomb fish, which explode when they die.',
    neutralsTitle: 'Neutral buildings',
    neutrals: [
      { name: 'Goblin market', text: 'Trades wood for gold and gold for wood. Every deal makes the next one dearer, and the price recovers with time.' },
      { name: 'Mercenary camp', text: 'Hire spear goblins, gnolls and bears for gold. Stock is short and takes time to come back.' },
      { name: 'Tavern', text: 'One champion per player and match: panda, gnoll or thief.' },
    ],
  },
  controls: {
    groups: [
      { title: 'Mouse', rows: [
        { keys: 'Left click', action: 'Select. Drag for a box; with Shift, add to the selection' },
        { keys: 'Double click', action: 'Every unit of that type on screen' },
        { keys: 'Right click', action: 'Order by target: attack, gather, build or repair, move. With Shift, queue' },
        { keys: 'Wheel', action: 'Zoom' },
        { keys: 'Middle button', action: 'Drag the camera' },
      ] },
      { title: 'Orders', rows: [
        { keys: 'F', action: 'Attack-move' },
        { keys: 'X', action: 'Stop' },
        { keys: 'H', action: 'Hold position' },
        { keys: 'Ctrl + 1…9', action: 'Save group. 1…9 recalls it, Shift + 1…9 adds to it' },
        { keys: '.', action: 'Next idle Pawn' },
        { keys: 'Space', action: 'Camera to the last alert' },
      ] },
      { title: 'Build, with Pawns', rows: [
        { keys: 'C · V · B', action: 'House · Corral · Barracks' },
        { keys: 'Q · M · T', action: 'Archery Range · Monastery · Tower' },
        { keys: 'X', action: 'Castle (expansion)' },
        { keys: 'Shift while placing', action: 'Queues up to three sites' },
      ] },
      { title: 'Train and camera', rows: [
        { keys: 'P · G · R · L · K', action: 'Pawn · Warrior · Archer · Lancer · Monk' },
        { keys: 'WASD or arrows', action: 'Move the camera; also the screen edges and the minimap' },
        { keys: 'Esc', action: 'Pause menu' },
      ] },
    ],
    note: 'Every key can be rebound in Settings, with a warning on conflicts.',
  },
};
