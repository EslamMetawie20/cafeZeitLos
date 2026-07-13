// React is globally available in Vite or not needed in App.tsx
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { QuickInfo } from './sections/QuickInfo';
import { PopularDishes } from './sections/PopularDishes';
import { FullMenu } from './sections/FullMenu';
import { Gallery } from './sections/Gallery';
import { About } from './sections/About';
import { Visit } from './sections/Visit';
import { FAQ } from './sections/FAQ';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickInfo />
        <PopularDishes />
        <FullMenu />
        <Gallery />
        <About />
        <Visit />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
