import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  public lectures: any;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.loadLectures()
  }

  public loadLectures() : void {
    this._http.get('https://localhost:5001/Lectures').subscribe(
      res => this.lectures = res,
      error => console.log(error)
    );
  }

}
