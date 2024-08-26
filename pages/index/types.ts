interface ApiResponse {
  places: PlaceDetails[];
}

interface PlaceDetails {
  _id: string;
  owner: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  maxGuests: number;
  price: number;
}

interface Place {
  _id: string;
  owner: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  maxGuests: number;
  price: number;
}