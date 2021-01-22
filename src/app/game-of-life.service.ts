import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GameOfLifeService {

  updater$: Observable<any>;
  private updateSubject: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.updater$ = this.updateSubject.asObservable();
  }

  // example POST:
  // this.httpClient.post('http://localhost:8080/generation/', {...JSON of the alive cells on the board...}).subscribe();

  getGenerationOne(): void{
    this.httpClient.get('http://localhost:8080/generation/1').subscribe(generation => {
      this.updateSubject.next(generation);
    });
  }

}
