import { AIRPORTS } from "$lib/data/airports";
import { distanceBetween } from "$lib/utils/distance";
import type { APIFlight } from "$lib/db";
import { toTitleCase } from "$lib/utils/other";
import { AIRLINES } from '$lib/data/airlines';

export const prepareFlightArcData = (data: APIFlight[]) => {
  if (!data) return [];

  return data.map((flight) => {
    const fromAirport = airportFromIata(flight.from);
    const toAirport = airportFromIata(flight.to);
    if (!fromAirport || !toAirport) return null;

    return {
      id: flight.id,
      distance: distanceBetween([fromAirport.longitude, fromAirport.latitude], [toAirport.longitude, toAirport.latitude]) / 1000,
      from: [fromAirport.longitude, fromAirport.latitude],
      to: [toAirport.longitude, toAirport.latitude],
      fromName: fromAirport.name,
      toName: toAirport.name
    };
  });
};

export const formatSeat = (f: APIFlight) => {
  const t = (s: string) => toTitleCase(s);

  return f.seat && f.seatNumber && f.seatClass
    ? `${t(f.seatClass)} (${f.seat} ${f.seatNumber})`
    : f.seat && f.seatNumber
      ? `${f.seat} ${f.seatNumber}`
      : f.seat && f.seatClass
        ? `${t(f.seatClass)} (${f.seat})`
        : f.seat
          ? f.seat
          : null;
};

export const airportFromIata = (iata: string): typeof AIRPORTS[0] | undefined => {
  return AIRPORTS.find((airport) => airport.code === iata);
};

export const airlineFromIata = (iata: string) => {
  return AIRLINES.find((airline) => airline.iata === iata) ?? null;
}
