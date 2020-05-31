import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/IUser";
import {SimpleModalService} from "ngx-simple-modal";
import {ReviewModalComponent} from "../review-modal/review-modal.component";

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {
  @Input() company: IUser;

  constructor(
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.simpleModalService.addModal(ReviewModalComponent).subscribe();
  }

}
