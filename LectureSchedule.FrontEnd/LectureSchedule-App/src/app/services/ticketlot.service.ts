import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketLot } from '@app/models/TicketLot';
import { Observable, take } from 'rxjs';

@Injectable()
export class TicketlotService {

  baseUrl = 'https://localhost:5001/TicketLot';

  constructor(private _http: HttpClient) { }

  getTicketLotByLectureId(lectureId: number): Observable<TicketLot[]>{
    return this._http
    .get<TicketLot[]>(`${this.baseUrl}/${lectureId}`)
    .pipe(take(1));
  }

  put(lectureId: number, TicketLots: TicketLot[]): Observable<any>{
    return this._http
    .put<any>(`${this.baseUrl}/${lectureId}`,TicketLots)
    .pipe(take(1));
  }

  delete(lectureId: number, ticketLotId: number): Observable<any>{
    return this._http
    .delete<any>(`${this.baseUrl}/${lectureId}/${ticketLotId}`)
    .pipe(take(1));
  }
}
