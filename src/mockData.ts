
import { Route, Ticket, User } from "./types";

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@nunesvan.com",
    role: "admin",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@example.com",
    role: "customer",
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria@example.com",
    role: "customer",
  },
];

// Mock routes data
export const routes: Route[] = [
  {
    id: "1",
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    departureTime: "2025-05-10T08:00:00",
    arrivalTime: "2025-05-10T14:00:00",
    price: 120.0,
    seatsAvailable: 15,
  },
  {
    id: "2",
    origin: "Rio de Janeiro",
    destination: "São Paulo",
    departureTime: "2025-05-10T16:00:00",
    arrivalTime: "2025-05-10T22:00:00",
    price: 120.0,
    seatsAvailable: 10,
  },
  {
    id: "3",
    origin: "São Paulo",
    destination: "Belo Horizonte",
    departureTime: "2025-05-11T09:30:00",
    arrivalTime: "2025-05-11T15:30:00",
    price: 100.0,
    seatsAvailable: 12,
  },
  {
    id: "4",
    origin: "Belo Horizonte",
    destination: "São Paulo",
    departureTime: "2025-05-12T10:00:00",
    arrivalTime: "2025-05-12T16:00:00",
    price: 100.0,
    seatsAvailable: 8,
  },
];

// Mock tickets data
export const tickets: Ticket[] = [
  {
    id: "1",
    userId: "2",
    routeId: "1",
    purchaseDate: "2025-04-30T14:25:00",
    status: "active",
    seatNumber: 5,
    qrCode: "ticket-qrcode-1",
    route: routes.find(route => route.id === "1"),
  },
  {
    id: "2",
    userId: "2",
    routeId: "4",
    purchaseDate: "2025-05-01T09:15:00",
    status: "active",
    seatNumber: 3,
    qrCode: "ticket-qrcode-2",
    route: routes.find(route => route.id === "4"),
  },
  {
    id: "3",
    userId: "3",
    routeId: "2",
    purchaseDate: "2025-04-29T17:30:00",
    status: "active",
    seatNumber: 7,
    qrCode: "ticket-qrcode-3",
    route: routes.find(route => route.id === "2"),
  },
];
