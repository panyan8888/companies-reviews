import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser, Role} from '../../models/IUser';
import {UsersService} from '../../services/users.service';
import {ReviewsService} from '../../services/reviews.service';
import {IReview} from '../../models/IReview';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user = this.authService.user;
  companies: IUser[];
  reviews: IReview[];

  get isCompany(): boolean {
    return this.user?.role === Role.company;
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private reviewsService: ReviewsService,
  ) { }

  ngOnInit(): void {
    if (this.isCompany) {
      this.getReviews();
      console.log(this.reviewsService.getCompanyReview(this.authService.user.id));
    } else {
      this.getCompanies();
    }
  }

  private getCompanies(): void {
    this.usersService.getCompanies().subscribe(companies => this.companies = companies);
  }
  private getReviews(): void {
    this.reviewsService.getCompanyReview(this.authService.user.id).subscribe(reviews => this.reviews = reviews);
  }
}
