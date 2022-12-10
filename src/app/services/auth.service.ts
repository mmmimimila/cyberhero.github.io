import { delay, map, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  public email: Subject<string | null> = new Subject<string | null>();

   postRegistrationData(body: any): any {
    return of( {success: true} ).pipe(delay(2000));
  }

  postCode(body: any): any {
    return of( {success: true} ).pipe(delay(2000));
    }

    getProfileInfo(): Observable<any>{
      return this.http.get(`https://randomuser.me/api/`, {}).pipe(
        map((response: any) => {
          return response.results;
        })
      );

    }
}
