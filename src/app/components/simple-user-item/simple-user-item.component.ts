import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/IUser";
import {IReview} from "../../models/IReview";

@Component({
  selector: 'app-simple-user-item',
  templateUrl: './simple-user-item.component.html',
  styleUrls: ['./simple-user-item.component.scss']
})
export class SimpleUserItemComponent implements OnInit {
  @Input() simpleUser: IReview;

  constructor() { }

  ngOnInit(): void {
    console.log(this.simpleUser);
  }

}
