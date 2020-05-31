import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {IReview} from "../../models/IReview";

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent extends SimpleModalComponent<ReviewModalComponent, IReview> implements OnInit {
  result: IReview = {
    review: 'adsfasdf',
    score: 5,
  } as IReview;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  submit(): void {
    // do POST /reviews request
    this.close();
  }
}
