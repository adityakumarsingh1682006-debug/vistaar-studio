import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CustomCursor } from './components/common/CustomCursor';
import { PortfolioHome } from './components/portfolio/PortfolioHome';
import { GymWebsite } from './components/demos/gym/GymWebsite';
import { RestaurantWebsite } from './components/demos/restaurant/RestaurantWebsite';
import { SalonWebsite } from './components/demos/salon/SalonWebsite';
import { BoutiqueWebsite } from './components/demos/boutique/BoutiqueWebsite';
import { RealEstateWebsite } from './components/demos/realestate/RealEstateWebsite';

const AppRouter: React.FC = () => {
  const { currentPath } = useNavigation();

  // Update document title and scroll position based on current view
  useEffect(() => {
    switch (currentPath) {
      case '/gym':
        document.title = 'Forge Athletics — Elite Strength Club (Vistaar Demo)';
        break;
      case '/restaurant':
        document.title = "L'Atelier Aura — Haute Gastronomie & Cave (Vistaar Demo)";
        break;
      case '/salon':
        document.title = 'Atelier Lumière — Haute Coiffure & Trichologie (Vistaar Demo)';
        break;
      case '/boutique':
        document.title = 'Édition Noire — Architectural Fashion Capsule (Vistaar Demo)';
        break;
      case '/real-estate':
        document.title = 'Monolith Estates — Modernist Sanctuaries & Advisory (Vistaar Demo)';
        break;
      default:
        document.title = 'Vistaar Studio — Web Design & Development Studio';
    }
  }, [currentPath]);

  switch (currentPath) {
    case '/gym':
      return <GymWebsite />;
    case '/restaurant':
      return <RestaurantWebsite />;
    case '/salon':
      return <SalonWebsite />;
    case '/boutique':
      return <BoutiqueWebsite />;
    case '/real-estate':
      return <RealEstateWebsite />;
    case '/':
    default:
      return <PortfolioHome />;
  }
};

export default function App() {
  return (
    <NavigationProvider>
      <CustomCursor />
      <AppRouter />
    </NavigationProvider>
  );
}
