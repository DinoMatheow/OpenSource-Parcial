import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Attendes } from '../interfaces/attendes.interface';

const baseUrl = 'http://localhost:3000/attendees';

@Injectable({providedIn: 'root'})
export class AttendesService {

  private http = inject(HttpClient);
  private attendes = signal<Attendes[]>([]);

  getAtttende(params: {_limit: number}): Observable<Attendes[]>{
    return this.http.get<Attendes[]>(baseUrl, {
      params: params || { _limit: 3}
    }).pipe(
      tap(resp => {
        this.attendes.set(resp);
      })
    )
  }

  // Método para contar asistentes por evento
  getAttendeesCountByEvent(eventId: string): Observable<number> {
    return this.http.get<Attendes[]>(baseUrl).pipe(
      map(attendees => attendees.filter(a => a.eventId === eventId).length)
    );
  }

  // Método para obtener asistentes por evento
  getAttendeesByEvent(eventId: string): Observable<Attendes[]> {
    return this.http.get<Attendes[]>(baseUrl).pipe(
      map(attendees => attendees.filter(a => a.eventId === eventId))
    );
  }
}