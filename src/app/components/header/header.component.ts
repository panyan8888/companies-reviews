import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  userProfile(): void {
    this.router.navigate([ '/main/profile' ]);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate([ '/' ]);
  }
}
