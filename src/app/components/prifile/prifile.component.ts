import { Component, OnInit } from '@angular/core';
import {Category, IUser, Product, Role} from '../../models/IUser';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-prifile',
  templateUrl: './prifile.component.html',
  styleUrls: ['./prifile.component.scss']
})
export class PrifileComponent implements OnInit {

  showEditButton = true;
  editable = false;
  simpleUser: boolean;
  companyUser: boolean;
  userToCompany: boolean;

  user = this.authService.user;
  roles = Role;
  products = Product;
  categories = Category;

  editInfoData: IUser = {
    ...this.authService.user,
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    if (this.isCompany) {
      this.simpleUser = false;
      this.companyUser = true;
    } else {
      this.simpleUser = true;
      this.companyUser = false;
    }
  }

  get isCompany(): boolean {
    return this.user?.role === Role.company;
  }

  editInfo(): void {
    this.showEditButton = false;
    this.editable = true;
  }

  saveInfo(): void {
    console.log(this.editInfoData);
    this.usersService.editUserInfo(this.editInfoData).subscribe(user => {
      if (user) {
        this.router.navigate([ '/main' ]);
      }
    });
    this.showEditButton = true;
    this.editable = false;
  }
  onChangeRole(searchValue: Role) {
    this.userToCompany = this.editInfoData.role === Role.company;
  }

}
