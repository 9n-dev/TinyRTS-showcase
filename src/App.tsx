import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { TrailerModal } from './components/TrailerModal';
import { Home } from './sections/Home';
import { Game } from './sections/Game';
import { Features } from './sections/Features';
import { Maps } from './sections/Maps';
import { Gallery } from './sections/Gallery';
import { Built } from './sections/Built';
import { Credits } from './sections/Credits';
import { WorldCanvas } from './world/WorldCanvas';
import { useContent } from './i18n';

export default function App() {
  const { t } = useContent();
  const [trailer, setTrailer] = useState(false);
  return <div className="app">
    <a href="#main" className="skip-link">{t.skip}</a>
    <Navigation />
    <div className="world">
      <WorldCanvas />
      <main id="main"><Home onTrailer={() => setTrailer(true)} /><Game /><Features /><Maps /><Gallery /><Built /><Credits /></main>
      <Footer />
    </div>
    {trailer && <TrailerModal onClose={() => setTrailer(false)} />}
  </div>;
}
