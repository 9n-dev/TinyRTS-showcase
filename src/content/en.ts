import type { SpriteId } from '../world/sprites.generated';
import { guide } from './guide.en';

/** Sections with a link in the navigation, in page order. 'home', 'features' and 'credits' exist on the page but not in the menu. */
export const SECTIONS = ['game', 'guide', 'maps', 'gallery', 'status', 'built'] as const;
export type MapId = 'valley' | 'crossroads' | 'cuatro-vientos';
type Media = { id: string; alt: string; caption: string };
/** Words the map explorer paints and says. '{n}', '{t}', '{w}'… are filled in by MapExplorer. */
export type MapText = {
  gold: string; goldAmount: string; forest: string; water: string; grass: string; plateau: string; cliff: string; stairs: string;
  campGeneric: string; campDetail: string; tierLabel: string; tiers: Record<string, string>; neutrals: Record<string, string>;
  neutralDetail: string; start: string; startDetail: string; mapInfo: string; loading: string; loadError: string; camps: Record<string, string>;
};
type Card = { sprite: SpriteId; name: string; cost: string; role: string };
export type Tier = 'easy' | 'medium' | 'hard';
/** The player's manual in five tabs. Names are the game's own, from its data/i18n files. */
export type Guide = {
  title: string; heading: string; intro: string;
  tabs: Record<'units' | 'buildings' | 'techs' | 'camps' | 'controls', string>;
  costLabel: string; fromLabel: string; needsLabel: string;
  units: (Card & { from: string })[]; unitsNote: string;
  buildings: Card[]; buildingsNote: string;
  techs: { branch: string; at: string; list: { name: string; cost: string; effect: string; needs?: string }[] }[]; techsNote: string;
  camps: {
    intro: string; guardsLabel: string; rewardLabel: string; joinsLabel: string;
    tiers: { tier: Tier; name: string; list: { name: string; guards: string; reward: string; joins: string }[] }[];
    waterNote: string; neutralsTitle: string; neutrals: { name: string; text: string }[];
  };
  controls: { groups: { title: string; rows: { keys: string; action: string }[] }[]; note: string };
};
export type Content = {
  skip: string; description: string;
  nav: Record<(typeof SECTIONS)[number] | 'home' | 'main' | 'language', string>;
  hero: { tagline: string; description: string; watch: string; explore: string; facts: string[] };
  /** title goes on the ribbon, which is one line on any screen: keep it short. heading is the long one. */
  game: { title: string; heading: string; paragraphs: string[]; clips: Media[] };
  /** Pillars: what the player does or gets, each with a screenshot of public/media. Engine internals belong in built. */
  features: { title: string; list: { head: string; body: string; shot: string; alt: string }[]; extras: string };
  guide: Guide;
  maps: { title: string; heading: string; intro: string; list: { id: MapId; name: string; desc: string }[]; legend: { color: string; name: string }[]; text: MapText };
  gallery: { title: string; shots: Media[] };
  /** A number in braces, as in 'About {16000} lines', counts up when it scrolls into view. */
  built: { title: string; before: string[]; facts: { key: string; value: string }[]; after: string[] };
  status: { title: string; factsTitle: string; facts: { key: string; value: string }[]; nowTitle: string; now: string; nextTitle: string;
    next: { head: string; body: string }[]; nextNote: string; faqTitle: string; faq: { q: string; a: string }[] };
  credits: { title: string; list: { before: string; link?: { href: string; text: string }; after?: string }[] };
  footer: { rights: string; attribution: string; top: string };
  ui: { close: string; prev: string; next: string; trailerTitle: string; mapLabel: string };
};

export const en: Content = {
  skip: "Skip to content",
  description: "TinyRTS is a pixel-art real-time strategy game for Linux and Windows, built in Godot 4 and C#: neutral camps, elevation, fog of war, AI opponents and a built-in map editor.",
  nav: {
    main: "Sections",
    language: "Language",
    home: "Home",
    game: "The game",
    guide: "Guide",
    maps: "Maps",
    gallery: "Screenshots",
    status: "Status",
    built: "Tech"
  },
  hero: {
    tagline: "A small Warcraft 3 with the expansion economy of Northgard.",
    description: "A pixel-art real-time strategy game. Build your base, clear neutral camps for their rewards and bring down the Castle of up to three AI players.",
    watch: "Watch the trailer",
    explore: "See what is in it",
    facts: [
      "Linux and Windows",
      "Single-player",
      "In development"
    ]
  },
  game: {
    title: "The game",
    heading: "What you do in a game",
    paragraphs: [
      "You start with a Castle, three Pawns and a handful of resources. Pawns cut trees, mine gold and carry every load back to the Castle by hand. Trees leave stumps and gold veins run dry, so sooner or later you build a second Castle on the next patch of resources. Sheep pens feed you passively; Houses raise the population cap; the Barracks, Archery and Monastery train Warriors, Archers, Lancers and Monks; nine technologies in three branches make everything sharper.",
      "The map is shared with neutral camps: goblins, trolls, spider nests, thief hideouts, pirate coves in the water. Each one has guardians, a fixed post they defend, regeneration if you leave them alone, and a reward when you clear them. Neutral markets, mercenaries and taverns sit in the middle of the map for whoever gets there first. The last player with a Castle standing wins."
    ],
    clips: [
      {
        id: "village",
        alt: "A living village: Pawns gathering and building while troops train",
        caption: "A living village"
      },
      {
        id: "battle",
        alt: "Blue and red armies clashing under the red towers",
        caption: "A battle between players"
      },
      {
        id: "camps",
        alt: "Clearing a goblin village guarded by spear and torch goblins",
        caption: "Clearing a neutral camp"
      },
      {
        id: "editor",
        alt: "Painting a forest, a camp and a tower in the editor, then playing the map",
        caption: "The map editor"
      }
    ]
  },
  features: {
    title: "Features",
    list: [
      {
        head: "An economy that pushes you out of your base",
        shot: "village",
        alt: "A large village with houses, a monastery, a barracks and towers",
        body: "Trees leave stumps and gold veins run dry. Your Pawns carry every load back to the Castle by hand, so sooner or later you need a second Castle next to the next patch of resources, and an army to hold it."
      },
      {
        head: "21 neutral camps worth the risk",
        shot: "goblin-village",
        alt: "A goblin village with a troll, closed by forest with a single entrance",
        body: "Goblins, spiders, trolls, pirates, a minotaur. Every camp defends its post, heals if you leave it alone and, when its last guardian falls, pays you in resources or with a creature that joins your army."
      },
      {
        head: "High ground matters",
        shot: "stairs",
        alt: "A plateau with a side stair cut into its cliff",
        body: "Plateaus and cliffs are joined only by one-tile stairs. Archers and towers see and shoot farther from above, while melee units have to find the stairs."
      },
      {
        head: "Opponents that play by your rules",
        shot: "battle",
        alt: "Blue and red armies fighting beside a red tower and Castle",
        body: "One to three AI players that expand, trade at the market, build towers on the way to your base and choose whom to attack. Three difficulty levels change their pace and the size of their waves, never the costs or the rules: they do not cheat."
      },
      {
        head: "Classic RTS controls",
        shot: "training",
        alt: "The Castle panel with the training queue and rally point",
        body: "Box select, contextual right click, attack-move, hold position, control groups, build and training queues, and fog of war with a minimap and alerts. Every key can be rebound."
      },
      {
        head: "A map editor inside the game",
        shot: "editor",
        alt: "The map editor with its piece bar and tool bar",
        body: "Paint terrain, resources, camps and bases over the real world, press P and you are playing your map in under a tenth of a second; Esc takes you back. A checker warns about unreachable bases or guarded resources, and a map is a single file you can share."
      }
    ],
    extras: "And also: a tutorial, three official maps for two and four players, nine technologies in three branches, save slots with autosave, 59 sound effects, music and ambience, in English and Spanish."
  },
  maps: {
    title: "The maps",
    heading: "The maps, drawn from their data",
    intro: "These are the three official maps as the game stores them: one character per tile for the terrain, plus lists of trees, gold veins, camps, neutral buildings and start positions. Hover to see what is where.",
    list: [
      {
        id: "valley",
        name: "The Valley",
        desc: "Two players face each other across a river valley: 27 camps, a pirate cove on the north-east coast and gnome and goblin villages closed by forest."
      },
      {
        id: "crossroads",
        name: "The Crossroads",
        desc: "Four players with 90° rotational symmetry: each base has a natural expansion, two routes to its neighbours, 33 camps and a tavern at the centre."
      },
      {
        id: "cuatro-vientos",
        name: "Four Winds",
        desc: "Made with the in-game editor: a plateau with a stair north of each base and camps in between. Its stakes show the camp radius the editor uses."
      }
    ],
    legend: [
      {
        color: "#4fb0b3",
        name: "Water"
      },
      {
        color: "#8fc357",
        name: "Grass"
      },
      {
        color: "#b3d96a",
        name: "Plateau"
      },
      {
        color: "#4a7473",
        name: "Cliff"
      },
      {
        color: "#d1bb6e",
        name: "Stairs"
      },
      {
        color: "#3c7d3b",
        name: "Tree"
      },
      {
        color: "#f2c03a",
        name: "Gold vein"
      },
      {
        color: "#c8503c",
        name: "Camp"
      },
      {
        color: "#2f7f83",
        name: "Water camp"
      },
      {
        color: "#e9c552",
        name: "Market, mercenaries or tavern"
      },
      {
        color: "#3f8fbf",
        name: "Start position"
      }
    ],
    text: {
      gold: "Gold vein",
      goldAmount: "{n} gold",
      forest: "Tree",
      water: "Water",
      grass: "Grass",
      plateau: "Plateau",
      cliff: "Cliff",
      stairs: "Stairs",
      campGeneric: "Camp",
      campDetail: "Neutral camp with guardians and a reward",
      tierLabel: "Difficulty: {t}",
      tiers: {
        easy: "easy",
        medium: "medium",
        hard: "hard"
      },
      neutrals: {
        market: "Goblin market",
        mercenaries: "Mercenary camp",
        tavern: "Tavern"
      },
      neutralDetail: "Neutral building for whoever gets there first",
      start: "Start {n}",
      startDetail: "Castle and three Pawns",
      mapInfo: "{w}×{h} tiles, {p} players, {c} camps",
      loading: "Loading…",
      loadError: "The map data could not be loaded.",
      camps: {
        BatCave: "Bat cave",
        Bear: "Bear cave",
        CoastBattery: "Coastal battery",
        Fumarole: "Fumarole",
        GnollCamp: "Gnoll camp",
        Gnome: "Gnome village",
        GnomeVillage: "Gnome village",
        Goblin: "Goblin camp",
        GoblinVillage: "Goblin settlement",
        Graveyard: "Graveyard",
        Hive: "Hive",
        Lighthouse: "Pirate lighthouse",
        MinotaurLair: "Minotaur lair",
        PandaGrove: "Panda grove",
        Pigsty: "Goblin pigsty",
        PirateCove: "Pirate cove",
        SpiderNest: "Spider nest",
        Swamp: "Swamp",
        ThiefHideout: "Thief hideout",
        Troll: "Troll lair",
        TurtleBeach: "Turtle beach"
      }
    }
  },
  gallery: {
    title: "Screenshots",
    shots: [
      {
        id: "village",
        alt: "A large village with houses, a monastery, a barracks and towers",
        caption: "A village in full swing"
      },
      {
        id: "battle",
        alt: "Blue and red armies fighting beside a red tower and Castle",
        caption: "Assault on a red base"
      },
      {
        id: "spiders",
        alt: "Warriors and archers fighting spiders beside a pond",
        caption: "A spider nest"
      },
      {
        id: "goblin-village",
        alt: "A goblin village with a troll, closed by forest with a single entrance",
        caption: "A neutral goblin village"
      },
      {
        id: "stairs",
        alt: "A plateau with a side stair cut into its cliff",
        caption: "A plateau and its side stair"
      },
      {
        id: "plateau",
        alt: "A sheep pen on a plateau above the forest",
        caption: "A sheep pen on high ground"
      },
      {
        id: "menu",
        alt: "Main menu on a parchment panel with a blue banner",
        caption: "Main menu"
      },
      {
        id: "training",
        alt: "The Castle panel with the training queue and rally point",
        caption: "Training queue at the Castle"
      },
      {
        id: "editor",
        alt: "The map editor with its piece bar and tool bar",
        caption: "The map editor"
      },
      {
        id: "victory",
        alt: "The victory panel after the enemy Castle falls",
        caption: "Victory"
      }
    ]
  },
  built: {
    title: "How it is built",
    before: [
      "The game is two halves that never mix. The simulation is plain C# with no Godot nodes and no frame delta, advanced at a fixed rate, tested with xUnit without opening the engine and serialized to JSON for saving. The Godot layer draws that state and hosts an interface that never touches an entity: it only enqueues commands, and so does the AI.",
      "That split is what makes the rest possible. The test suite plays whole games: ten minutes of AI against AI on the Valley and fifteen minutes with four AIs on the Crossroads run headless in about thirty seconds, and they assert things like \"nobody is eliminated before minute ten\" and \"no AI sits idle for a minute\". A command-line harness drives the real engine with synthetic input and scripted orders, takes screenshots and measures frame time, so a change can be verified without a mouse."
    ],
    facts: [
      {
        key: "Engine",
        value: "Godot 4.6.2 .NET, C# 12 on .NET 8, no other dependencies"
      },
      {
        key: "Renderer",
        value: "Compatibility (OpenGL 3.3), nearest filtering, pixel snapping"
      },
      {
        key: "Code",
        value: "About {16000} lines of C# in {88} files, plus {4300} lines of tests"
      },
      {
        key: "Tests",
        value: "{181}, including full simulated games"
      },
      {
        key: "Performance",
        value: "4 AIs and {300} units at 60 fps with a 1.3 ms simulation tick"
      },
      {
        key: "Content",
        value: "{29} unit types, 7 buildings, 9 technologies, {21} camp kinds, 3 maps"
      },
      {
        key: "Text",
        value: "{519} localized strings in Spanish and English"
      },
      {
        key: "Simulation",
        value: "Fixed 20 Hz step, rendered at 60 fps with interpolation between ticks"
      },
      {
        key: "Movement",
        value: "A* on the 64 px grid without corner cutting, path smoothing and local separation via a spatial hash. {200} units cross the map at 60 fps"
      },
      {
        key: "AI",
        value: "Tuned by playing hundreds of simulated games: the simulation has no randomness, so a single game is a chaotic sample rather than a measure"
      }
    ],
    after: [
      "Terrain and static layers are retained draw commands, not nodes; sprites exist only for what animates; selection rings, foam and shadows are single nodes that redraw when something changes. The whole scene stays around a dozen draw calls with hundreds of units on screen.",
      "The project was built with Claude Code doing the programming and me leading the design, playing every build and deciding what goes in and what gets cut. The source repository is private; this site is the public presentation."
    ]
  },
  credits: {
    title: "Credits",
    list: [
      {
        before: "Art: ",
        link: {
          href: "https://pixelfrog-assets.itch.io/tiny-swords",
          text: "Tiny Swords"
        },
        after: " and its Enemy Pack by Pixel Frog, used under their license. The interface and the living background of this site are made from the same packs."
      },
      {
        before: "Font: Pixelify Sans by Stefie Justprince, SIL Open Font License."
      },
      {
        before: "Sounds: Pixabay."
      },
      {
        before: "Engine: Godot Engine."
      }
    ]
  },
  status: {
    title: "Status",
    factsTitle: "At a glance",
    facts: [
      {
        key: "Genre",
        value: "Real-time strategy, pixel art"
      },
      {
        key: "Platforms",
        value: "Linux and Windows. Controller and Steam Deck are on the roadmap"
      },
      {
        key: "Players",
        value: "One, against 1 to 3 AI players, free-for-all"
      },
      {
        key: "Difficulty",
        value: "Easy, Normal and Hard"
      },
      {
        key: "A match",
        value: "Around 20 minutes"
      },
      {
        key: "Languages",
        value: "English and Spanish, interface and text"
      },
      {
        key: "Maps",
        value: "3 official maps and a built-in editor"
      },
      {
        key: "Saving",
        value: "Save slots with autosave"
      }
    ],
    nowTitle: "Where it is now",
    nextTitle: "What is left",
    next: [
      {
        head: "Licences, credits and music",
        body: "File the licences of the art, the font and the sounds, and add the credits screen."
      },
      {
        head: "Polish and controller",
        body: "Controller support with the Steam Deck in mind, and the pending polish of the game and the editor."
      },
      {
        head: "Distribution and store",
        body: "Icon, versioning, automated builds and the Steam page with its capsules, screenshots and trailer."
      }
    ],
    nextNote: "This is the roadmap, not a promise: there is no date and no commitment to publish yet.",
    faqTitle: "Questions",
    faq: [
      {
        q: "When does it come out, and what will it cost?",
        a: "There is no date and no price yet. The game can be played from start to finish, but the three phases above are still to do and I would rather not promise a date I do not control."
      },
      {
        q: "Is there a demo?",
        a: "Not yet. If there is one, it will be announced here."
      },
      {
        q: "Will it have multiplayer?",
        a: "No. TinyRTS is designed as a single-player game against the AI, and there is no networking on the roadmap."
      },
      {
        q: "Does the AI cheat?",
        a: "No. It pays the same costs and follows the same rules as you. Difficulty changes how well it runs its economy and how big its attack waves are."
      },
      {
        q: "Can I make and share maps?",
        a: "Yes. The editor comes with the game, its checker tells you when a map is ready to publish, and each map is a single .json file you can pass on."
      },
      {
        q: "What is it made with?",
        a: "Godot 4 .NET and C#, with the Tiny Swords art packs by Pixel Frog. The details are in the Tech section."
      }
    ],
    now: "Playable from start to finish: economy, building, training, combat, technology, AI for two and four players, neutral camps, saving, audio, editor, two languages. Development started on 8 September 2026. The roadmap points at a Steam release, which is why game statistics already live in the simulation and saves are one file per slot."
  },
  guide,
  footer: {
    rights: "Screenshots, video and text © 2026 9n-dev.",
    attribution: "Art: Tiny Swords by Pixel Frog.",
    top: "Back to top"
  },
  ui: {
    close: "Close",
    prev: "Previous",
    next: "Next",
    trailerTitle: "TinyRTS trailer",
    mapLabel: "Map"
  }
};
