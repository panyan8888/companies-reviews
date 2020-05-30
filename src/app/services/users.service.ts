import {Injectable} from "@angular/core";
import {IUser} from "../models/IUser";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = `http://localhost:${environment.serverPort}/users`
  constructor(private client: HttpClient) {
  }
  createUser(body: IUser) {
    return this.client.post(this.baseUrl, body);
  }
}
