import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {IReview, Score} from '../../models/IReview';
import {Category, IUser} from '../../models/IUser';
import {AuthService} from '../../services/auth.service';
import {ReviewsService} from '../../services/reviews.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent extends SimpleModalComponent<ReviewModalComponent, IReview> implements OnInit {
  company: IUser;
  score = Score;

  result: IReview = {
    userId: this.authService.user.id,
    review: null,
    score: null,
  } as IReview;

  constructor(
    private authService: AuthService,
    private reviewsService: ReviewsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.result.companyId = this.company.id;
  }

  submit(): void {
    this.reviewsService.saveReview(this.result).subscribe(resp => {
      if (resp) {
        this.close();
      }
    });
  }
}
