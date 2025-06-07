import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Events } from '../interfaces/events.interface';
import { response } from 'express';

const baseUrl = 'http://localhost:3000/events';

interface EventsParams{
  limit: string;
}


@Injectable({providedIn: 'root'})
export class EventsService {

private http = inject(HttpClient);


getEvents(params: EventsParams):Observable<Events[]> {
  return   this.http.get<Events>(baseUrl, {
    params: {

    }
  }).pipe(
    tap((resp)=> console.log(resp))
  )

}






}