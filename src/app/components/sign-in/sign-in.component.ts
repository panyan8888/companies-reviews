import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ILoginData} from "../../models/ILoginData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  noSuchUser: boolean;

  signInData: ILoginData = {
    email: '',
    password: ''
  };

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.signIn();
    }
  }

  dontHaveAnAccount(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  signIn(): void {
    this.authService.loginUser(this.signInData).subscribe(user => {
      if (user) {
        this.router.navigate(['/main']);
      }
    });
  }
}
