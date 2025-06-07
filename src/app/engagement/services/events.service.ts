import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Events } from '../interfaces/events.interface';

const baseUrl = 'http://localhost:3000/events';




@Injectable({providedIn: 'root'})
export class EventsService {

private http = inject(HttpClient);
private events = signal<Events[]>([]);


getEvents(params?: { _limit: number }): Observable<Events[]> {
  return this.http.get<Events[]>(baseUrl, {
    params: params || { _limit: 3 }
  });
}







}
