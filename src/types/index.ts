export type RoutePath = '/' | '/gym' | '/restaurant' | '/salon' | '/boutique' | '/real-estate';

export interface IndustryDemo {
  id: string;
  number: string;
  name: string;
  category: string;
  route: RoutePath;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  textColor: string;
  previewHighlights: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}
