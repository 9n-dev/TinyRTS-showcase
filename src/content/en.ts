/** Sections with a link in the navigation, in page order. 'home' and 'features' exist on the page but not in the menu. */
export const SECTIONS = ['game', 'maps', 'gallery', 'built', 'credits'] as const;
export type MapId = 'valley' | 'crossroads' | 'cuatro-vientos';
type Media = { id: string; alt: string; caption: string };
/** Words the map explorer paints and says. '{n}', '{t}', '{w}'… are filled in by MapExplorer. */
export type MapText = {
  gold: string; goldAmount: string; forest: string; water: string; grass: string; plateau: string; cliff: string; stairs: string;
  campGeneric: string; campDetail: string; tierLabel: string; tiers: Record<string, string>; neutrals: Record<string, string>;
  neutralDetail: string; start: string; startDetail: string; mapInfo: string; loading: string; loadError: string; camps: Record<string, string>;
};
export type Content = {
  skip: string; description: string;
  nav: Record<(typeof SECTIONS)[number] | 'home' | 'main' | 'language', string>;
  hero: { tagline: string; watch: string; explore: string; note: string };
  game: { title: string; paragraphs: string[]; clips: Media[] };
  features: { title: string; list: { head: string; body: string }[] };
  maps: { title: string; intro: string; list: { id: MapId; name: string; desc: string }[]; legend: { color: string; name: string }[]; text: MapText };
  gallery: { title: string; shots: Media[] };
  /** A number in braces, as in 'About {16000} lines', counts up when it scrolls into view. */
  built: { title: string; before: string[]; facts: { key: string; value: string }[]; after: string[] };
  credits: { title: string; statusTitle: string; status: string; list: { before: string; link?: { href: string; text: string }; after?: string }[] };
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
    maps: "Maps",
    gallery: "Screenshots",
    built: "Tech",
    credits: "Credits"
  },
  hero: {
    tagline: "A small real-time strategy game, built from scratch in Godot 4 and C#.",
    watch: "Watch the trailer",
    explore: "Explore the maps",
    note: "52 seconds, with sound."
  },
  game: {
    title: "What you do in a game",
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
        head: "Real-time simulation",
        body: "at a fixed 20 Hz step, rendered at 60 fps with interpolation between ticks."
      },
      {
        head: "Free movement in pixels.",
        body: "A* on the 64 px grid without corner cutting, path smoothing and local separation via a spatial hash. Units never block cells; buildings, resources and terrain do. 200 units cross the map at 60 fps."
      },
      {
        head: "An economy of trips.",
        body: "Finite trees and gold veins, Pawns that gather, load up and deliver, passive food from sheep pens, expansion with a second Castle. Neutral market, mercenaries and tavern."
      },
      {
        head: "Elevation that matters.",
        body: "Plateaus and cliffs joined only by one-tile side stairs. Ranged units and towers gain range and vision from above; melee never crosses an edge."
      },
      {
        head: "21 kinds of neutral camp",
        body: "with 24 creatures from the Enemy Pack, including static water guardians like the harpoon shark and the bomb fish. The four-player map has 33 camps."
      },
      {
        head: "AI opponents",
        body: "for two to four players that expand, trade at the market, build towers on the way to the enemy and pick wave targets by path length or weakness. Tuned by playing hundreds of simulated games, because the simulation has no randomness and a single game is a chaotic sample rather than a measure."
      },
      {
        head: "Fog of war",
        body: "with three states, a minimap with alerts, and Warcraft 3 controls: box select, contextual right click, attack-move, stop and hold, control groups, edge and WASD scrolling. Every key can be rebound."
      },
      {
        head: "Map editor",
        body: "in the Mario Maker spirit. Paint terrain, resources, camps and start positions over the real world, press P to play the map in under a tenth of a second, Esc to keep editing. Brush, rectangle, fill and selection tools, copy and paste, rotate and mirror, and a validator that warns about unreachable bases, guarded resources or missing building room."
      },
      {
        head: "Three official maps.",
        body: "The Valley (96×64, two players), the Crossroads (160×160, four players, rotational symmetry) and Four Winds, made with the editor. The first two come from Python generators that validate symmetry, connectivity, choke widths and travel distances between bases."
      },
      {
        head: "",
        body: "Save slots with autosave, Spanish and English, 59 sound effects, music and ambience."
      }
    ]
  },
  maps: {
    title: "The maps, drawn from their data",
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
      }
    ],
    after: [
      "Terrain and static layers are retained draw commands, not nodes; sprites exist only for what animates; selection rings, foam and shadows are single nodes that redraw when something changes. The whole scene stays around a dozen draw calls with hundreds of units on screen.",
      "The project was built with Claude Code doing the programming and me leading the design, playing every build and deciding what goes in and what gets cut. The source repository is private; this site is the public presentation."
    ]
  },
  credits: {
    title: "Credits",
    statusTitle: "Status",
    status: "Playable from start to finish: economy, building, training, combat, technology, AI for two and four players, neutral camps, saving, audio, editor, two languages. Development started on 8 September 2026. The roadmap points at a Steam release, which is why game statistics already live in the simulation and saves are one file per slot.",
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
