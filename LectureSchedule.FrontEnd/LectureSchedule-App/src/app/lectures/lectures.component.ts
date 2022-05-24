import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  public lectures: any = [];
  public imageWidth = 100;
  public imageMargin = 2;
  public hideImage = true;
  private _listFilter = '';
  public filteredLectures: any = [];

  public get listFilter(): string{
    return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.filteredLectures = this.listFilter ? this.filterLectures(this._listFilter) : this.lectures;
  }

  filterLectures(filter: string): any{
    filter = filter.toLowerCase();
    return this.lectures.filter(
      (lecture: any) => lecture.theme.toLowerCase().indexOf(filter) !== -1 ||
            lecture.local.toLowerCase().indexOf(filter) !== -1
    );
  }

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.loadLectures()
  }

  controlImageVisibility(){
    this.hideImage = !this.hideImage;
  }

  public loadLectures() : void {
    this._http.get('https://localhost:5001/Lectures').subscribe(
      res => {
        this.lectures = res;
        this.filteredLectures = res;
      },
      error => console.log(error)
    );
  }

}
