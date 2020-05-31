import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ILoginData} from '../models/ILoginData';
import {map, tap} from 'rxjs/operators';
import {IUser} from '../models/IUser';
import {Observable} from 'rxjs';
import {USER_STORAGE_KEY} from '../constants/storage.const';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `http://localhost:${environment.serverPort}/users`;
  user: IUser;
  signInError: boolean;

  get loggedIn(): boolean {
    return !!this.user;
  }

  constructor(private client: HttpClient) {
    this.user = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));
  }

  loginUser(data: ILoginData): Observable<IUser> {
    return this.client.get<IUser[]>(`${this.baseUrl}?email=${data.email}`).pipe(
      map(users => {
        const user = users[0];
        if (!user || user.password !== data.password) {
          this.signInError = true;
          throw new Error('The email/password is invalid');
        }
        return {
          ...user,
          password: null,
        } as IUser;
      }),
      tap(user => this.setUser(user)),
    );
  }

  setUser(user: IUser): void {
    this.user = user;
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  signOut(): void {
    this.setUser(null);
    window.localStorage.clear();
  }
}
