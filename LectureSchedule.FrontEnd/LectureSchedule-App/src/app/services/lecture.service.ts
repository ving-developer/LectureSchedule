import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '@app/models/Lecture';

@Injectable(
  // {providedIn: 'root'} one way of receiving LectureService by dependency injection. The best approach is including in module.ts
)

export class LectureService {
  baseUrl = 'https://localhost:5001/Lectures';

  constructor(private _http: HttpClient) { }

  getLectures(): Observable<Lecture[]>{
    return this._http.get<Lecture[]>(this.baseUrl);
  }

  getLecturesByTheme(theme: string): Observable<Lecture[]>{
    return this._http.get<Lecture[]>(`${this.baseUrl}/search-theme?theme=${theme}`);
  }

  getLectureById(id: number): Observable<Lecture>{
    return this._http.get<Lecture>(`${this.baseUrl}/${id}`);
  }

  post(lecture: Lecture): Observable<Lecture>{
    return this._http.post<Lecture>(this.baseUrl, lecture);
  }

  put(lecture: Lecture): Observable<any>{
    return this._http.put<any>(`${this.baseUrl}/${lecture.id}`,lecture);
  }

  delete(id: number): Observable<any>{
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
