import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {IReview} from "../models/IReview";

@Injectable({ providedIn: 'root' })

export class ReviewsService {
  private baseUrl = `http://localhost:${environment.serverPort}/reviews`;

  constructor(private client: HttpClient) {
  }

  saveReview(body: IReview) {
    return this.client.get(this.baseUrl).pipe(
      switchMap((allReview: IReview[]) => {
        const lastReview = allReview[allReview.length - 1];

        return this.client.post(this.baseUrl, {
          ...body,
          id: lastReview ? lastReview.id + 1 : 1
        });
      })
    );
  }

  getCompanyReview(companyId: number): Observable<IReview[]> {
    return this.client.get<IReview[]>(`${this.baseUrl}?companyId=${companyId}`);
  }
}
