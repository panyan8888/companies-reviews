import {Injectable} from '@angular/core';
import {IUser, Role} from '../models/IUser';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {IReview} from "../models/IReview";

@Injectable({ providedIn: 'root' })
export class UsersService {
  public baseUrl = `http://localhost:${environment.serverPort}/users`;

  constructor(private client: HttpClient,
              private authService: AuthService) {
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

  editUserInfo(body: IUser) {
    return this.client.get(this.baseUrl).pipe(
      switchMap((allUsers: IUser[]) => {

        return this.client.put(this.baseUrl, {
          ...body,
          id: this.authService.user.id
        });
      })
    );
  }

  getCompanies(): Observable<IUser[]> {
    return this.client.get<IUser[]>(`${this.baseUrl}?role=${Role.company}`);
  }

  // getReviews(): Observable<IReview[]> {
  //   return this.client.get<IReview[]>(`${this.baseUrl}?role=${Role.company}`);
  // }
}
