import {Injectable} from '@angular/core';
import {IUser, Role} from '../models/IUser';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = `http://localhost:${environment.serverPort}/users`;

  constructor(private client: HttpClient) {
  }

  createUser(body: IUser) {
    return this.client.get(this.baseUrl).pipe(
      switchMap((allUsers: IUser[]) => {
        const emailExists = allUsers.some(user => user.email === body.email);
        if (emailExists) {
          return throwError(new Error('User with typed email already exists.'));
        }
        const lastUser = allUsers[allUsers.length - 1];

        return this.client.post(this.baseUrl, {
          ...body,
          id: lastUser ? lastUser.id + 1 : 1
        });
      })
    );
  }

  getCompanies(): Observable<IUser[]> {
    return this.client.get<IUser[]>(`${this.baseUrl}?role=${Role.company}`);
  }
}
