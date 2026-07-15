import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../../sections/Hero';
import { FullMenu } from '../../sections/FullMenu';
import { PopularDishes } from '../../sections/PopularDishes';
import { Gallery } from '../../sections/Gallery';
import { About } from '../../sections/About';
import { Visit } from '../../sections/Visit';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <div id="speisekarte"><FullMenu /></div>
      <div id="highlights"><PopularDishes /></div>
      <div id="galerie"><Gallery /></div>
      <div id="besuch-planen"><Visit /></div>
      <div id="ueber-uns"><About /></div>
    </>
  );
}
