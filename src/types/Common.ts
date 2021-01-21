export interface Route {
  path: string;
  component: React.ComponentType<any>;
  label: string;
}

export interface Quote {
  author: string;
  quote: string;
  description: string;
}
