export interface Route {
  title: string;
  startPosition: {
    lat: number;
    lng: number;
  };
  endPosition: {
    lat: number;
    lng: number;
  };
}
