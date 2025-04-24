import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private httpClient: HttpClient) { }

  //method to fetch game data from api
  getGames(): Observable<any> 
  {
    //returns an observable containing the api response
    return this.httpClient.get('https://jsonblob.com/api/jsonblob/1364614857613303808');
  }

}
