
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
};

export type Route = {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
};

export type Ticket = {
  id: string;
  userId: string;
  routeId: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
  seatNumber: number;
  qrCode: string;
  route?: Route;
};
