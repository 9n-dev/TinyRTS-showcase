# TinyRTS

*[Versión en español](README.es.md)*

A real-time strategy game for Linux and Windows, in pixel art. One faction, you against up to three AI players in a
free-for-all, neutral camps to clear for rewards, plateaus and stairs, fog of war, and a map editor built into the
game. Think a small Warcraft 3 with the expansion economy of Northgard.

Built from scratch in **Godot 4.6 .NET and C#**, with the *Tiny Swords* art pack by Pixel Frog.

![A living village: Pawns gathering wood and gold, building a house and a tower, troops training](docs/media/hero.gif)

## What you do in a game

You start with a Castle, three Pawns and a handful of resources. Pawns cut trees, mine gold and carry every load back
to the Castle by hand; trees leave stumps and gold veins run dry, so sooner or later you build a second Castle on
the next patch of resources. Sheep pens feed you passively. Houses raise the population cap, the Barracks, Archery
and Monastery train Warriors, Archers, Lancers and Monks, and nine technologies in three branches make everything
sharper.

The map is shared with neutral camps: goblins, trolls, spider nests, thief hideouts, pirate coves in the water. Each
one has guardians, a fixed post they defend, regeneration if you leave them alone, and a reward when you clear them.
Neutral markets, mercenaries and taverns sit in the middle of the map for whoever gets there first.

The last player with a Castle standing wins.

| | |
| --- | --- |
| ![Blue and red armies clashing under the red towers](docs/media/battle.gif) | ![Clearing a goblin village guarded by spear and torch goblins](docs/media/camps.gif) |
| A battle between players | Clearing a neutral camp |
| ![Painting a forest, a camp and a tower in the editor, then playing the map](docs/media/editor.gif) | ![Warriors and archers clearing a spider nest beside a pond](docs/media/spiders.gif) |
| The map editor | A spider nest |

## Features

- **Real-time simulation** at a fixed 20 Hz step, rendered at 60 fps with interpolation between ticks.
- **Free movement in pixels**: A* on the 64 px grid without corner cutting, path smoothing and local separation via
  a spatial hash. Units never block cells; buildings, resources and terrain do. 200 units cross the map at 60 fps.
- **An economy of trips**: finite trees and gold veins, Pawns that gather, load up and deliver, passive food from
  sheep pens, and expansion with a second Castle. Neutral market, mercenaries and tavern.
- **Elevation that matters**: plateaus and cliffs joined only by one-tile side stairs. Ranged units and towers gain
  range and vision from above; melee never crosses an edge.
- **21 kinds of neutral camp** with 24 creatures from the Enemy Pack, including static water guardians like the
  harpoon shark and the bomb fish. The four-player map has 33 camps.
- **AI opponents** for two to four players that expand, trade at the market, build towers on the way to the enemy
  and pick wave targets by path length or weakness. Tuned by playing hundreds of simulated games, because the
  simulation has no randomness and a single game is a chaotic sample rather than a measure.
- **Fog of war** with three states, a minimap with alerts, and Warcraft 3 controls: box select, contextual right
  click, attack-move, stop and hold, control groups, edge and WASD scrolling. Every key can be rebound.
- **Map editor** in the Mario Maker spirit: paint terrain, resources, camps and start positions over the real
  world, press P to play the map in under a tenth of a second, Esc to keep editing. Brush, rectangle, fill and
  selection tools, copy and paste, rotate and mirror, and a validator that warns about unreachable bases, guarded
  resources or missing building room.
- **Three official maps**: the Valley (96×64, two players), the Crossroads (160×160, four players, rotational
  symmetry) and Four Winds, made with the editor. The first two come from Python generators that validate
  symmetry, connectivity, choke widths and travel distances between bases.
- Save slots with autosave, Spanish and English, 59 sound effects, music and ambience.

## Screenshots

| | |
| --- | --- |
| ![A large village with houses, a monastery, a barracks and towers](public/media/village.png) | ![Blue and red armies fighting beside a red tower and Castle](public/media/battle.png) |
| ![Warriors and archers fighting spiders beside a pond](public/media/spiders.png) | ![A sheep pen on a plateau above the forest](public/media/plateau.png) |
| ![A goblin village with a troll, closed by forest with a single entrance](public/media/goblin-village.png) | ![A plateau with a side stair cut into its cliff](public/media/stairs.png) |
| ![Main menu on a parchment panel with a blue banner](public/media/menu.png) | ![The Castle panel with the training queue and rally point](public/media/training.png) |
| ![The map editor with its piece bar and tool bar](public/media/editor.png) | ![The victory panel after the enemy Castle falls](public/media/victory.png) |

## How it is built

The game is two halves that never mix. `src/Game` is the simulation: plain C# with no Godot nodes and no frame
delta, advanced by `Sim.Step()` at a fixed rate, tested with xUnit without opening the engine and serialized to
JSON for saving. `src/Scenes` is the Godot layer: scenes and views that draw the simulation state and an interface
that never touches an entity. It only enqueues commands, and so does the AI.

That split is what makes the rest possible. The test suite plays whole games: ten minutes of AI against AI on the
Valley and fifteen minutes with four AIs on the Crossroads run headless in about thirty seconds, and they assert
things like "nobody is eliminated before minute ten" and "no AI sits idle for a minute". A command-line harness
drives the real engine with synthetic input and scripted orders, takes screenshots and measures frame time, so a
change can be verified without a mouse.

| | |
| --- | --- |
| Engine | Godot 4.6.2 .NET, C# 12 on .NET 8, no other dependencies |
| Renderer | Compatibility (OpenGL 3.3), nearest filtering, pixel snapping |
| Code | About 16,000 lines of C# in 88 files, plus 4,300 lines of tests |
| Tests | 181, including full simulated games |
| Performance | 4 AIs and 300 units at 60 fps with a 1.3 ms simulation tick |
| Content | 29 unit types, 7 buildings, 9 technologies, 21 camp kinds, 3 maps |
| Text | 519 localized strings in Spanish and English |

Terrain and static layers are retained draw commands, not nodes; sprites exist only for what animates; selection
rings, foam and shadows are single nodes that redraw when something changes. The whole scene stays around a dozen
draw calls with hundreds of units on screen.

The project was built with Claude Code doing the programming and me leading the design, playing every build and
deciding what goes in and what gets cut. The source repository is private; this one is the public presentation.

## Status

Playable from start to finish: economy, building, training, combat, technology, AI for two and four players,
neutral camps, saving, audio, editor, two languages. Development started on 8 September 2026. The roadmap points at
a Steam release, which is why game statistics already live in the simulation and saves are one file per slot.

## The website

This repository is the website of the game: React, Vite and TypeScript, with the Tiny Swords interface over a living
village painted on a canvas (the same world as my portfolio). Texts live in `src/content/`, one file per language.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run test:e2e   # Playwright; the first time: npx playwright install chromium
```

## Credits

- Art: [Tiny Swords](https://pixelfrog-assets.itch.io/tiny-swords) and its Enemy Pack by Pixel Frog, used under
  their license. The website uses sprites cut from the same packs.
- Font: Pixelify Sans by Stefie Justprince, SIL Open Font License.
- Sounds: Pixabay.
- Engine: Godot Engine.

Screenshots, video and text in this repository are © 2026 9n-dev. See [LICENSE](LICENSE).
