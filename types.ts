export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface HeroContent {
  creativeSlogan: string;
  strategySlogan: string;
}
