import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Lecture } from '@app/models/Lecture';

@Injectable(
  // {providedIn: 'root'} one way of receiving LectureService by dependency injection. The best approach is including in module.ts
)

export class LectureService {
  baseUrl = 'https://localhost:5001/Lectures';

  constructor(private _http: HttpClient) { }

  getLectures(): Observable<Lecture[]>{
    return this._http
    .get<Lecture[]>(this.baseUrl)
    .pipe(take(1));
  }

  getLecturesByTheme(theme: string): Observable<Lecture[]>{
    return this._http
    .get<Lecture[]>(`${this.baseUrl}/search-theme?theme=${theme}`)
    .pipe(take(1));;
  }

  getLectureById(id: number): Observable<Lecture>{
    return this._http
    .get<Lecture>(`${this.baseUrl}/${id}`)
    .pipe(take(1));
  }

  post(lecture: Lecture): Observable<Lecture>{
    return this._http
    .post<Lecture>(this.baseUrl, lecture)
    .pipe(take(1));
  }

  put(lecture: Lecture): Observable<any>{
    return this._http
    .put<any>(`${this.baseUrl}/${lecture.id}`,lecture)
    .pipe(take(1));
  }

  delete(id: number): Observable<any>{
    return this._http
    .delete<any>(`${this.baseUrl}/${id}`)
    .pipe(take(1));
  }
}
