import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable, take } from 'rxjs';
import { Lecture } from '@app/models/Lecture';
import { environment } from '@environments/environment';
import { PaginatedResult } from '@app/models/Pagination';

@Injectable(
  // {providedIn: 'root'} one way of receiving LectureService by dependency injection. The best approach is including in module.ts
)

export class LectureService {
  baseUrl = environment.apiURL + '/Lectures';

  constructor(private _http: HttpClient) { }

  getLectures(page?:number, itemsPerPage?:number, term?: string): Observable<PaginatedResult<Lecture[]>>{
    const paginatedResult: PaginatedResult<Lecture[]> = new PaginatedResult<Lecture[]>();
    let params = new HttpParams;
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    if(term && term !== '')
      params = params.append('term', term);
    return this._http
    .get<Lecture[]>(this.baseUrl, {observe: 'response', params: params})
    .pipe(take(1),
          map(
            (response) =>{
              paginatedResult.result = response.body;
              if(response.headers.has('Pagination')){
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
            }
    ));
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

  postUpload(lectureId: number, file: File): Observable<string>{
    const formData = new FormData();
    formData.append('file',file);

    return this._http
    .post<string>(`${this.baseUrl}/update-picture/${lectureId}`, formData)
    .pipe(take(1));
  }
}
