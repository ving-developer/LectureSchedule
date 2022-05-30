/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LectureService } from './lecture.service';

describe('Service: Lecture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureService]
    });
  });

  it('should ...', inject([LectureService], (service: LectureService) => {
    expect(service).toBeTruthy();
  }));
});
