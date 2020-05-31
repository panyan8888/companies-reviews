import {Component, OnInit} from '@angular/core';
import {Category, IUser, Product, Role} from '../../models/IUser';
import {UsersService} from '../../services/users.service';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  roles = Role;
  products = Product;
  categories = Category;

  emailValidationExpression: string;
  passwordValidationExpression: string;

  showCompanyFields = false;

  emptyEmailField = false;
  emptyPasswordField = false;
  comparePasswords = true;
  emptyUsernameField = false;
  emptyAddressField = false;
  emptyNameField = false;

  checkEmail = true;
  checkPassword = true;
  checkUsername = true;
  checkName = true;


  signUpData: IUser = {
    email: '',
    password: '',
    confpass: '',
    username: '',
    role: Role.user,
    name: '',
    address: '',
    category: Category.IT,
    product: Product.ITProduct

  };

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.emailValidationExpression = '([a-z0-9][-a-z0-9_\\+\\.]*[a-z0-9])@([a-z0-9][-a-z0-9\\.]*[a-z0-9]\\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\\.{3}[0-9]{1,3}))';
    this.passwordValidationExpression = '^.{6,}$';
    this.showCompanyFields = false;
  }

  onChangeEmail(searchValue: string) {
    this.signUpData.email = searchValue;
  }

  onChangePassword(searchValue: string) {
    this.signUpData.password = searchValue;
  }

  onChangeConfirmPassword(searchValue: string) {
    this.signUpData.confpass = searchValue;
  }

  onChangeUsername(searchValue: string) {
    this.signUpData.username = searchValue;
  }

  onChangeAddress(searchValue: string) {
    this.signUpData.address = searchValue;
  }

  onChangeName(searchValue: string) {
    this.signUpData.name = searchValue;
  }
  onChangeRole(searchValue: Role) {
    this.signUpData.role = searchValue;
    console.log(this.signUpData.role);
    if (this.signUpData.role === Role.company) {
      console.log(this.showCompanyFields);
      this.showCompanyFields = true;
    } else {
      this.showCompanyFields = false;
    }
  }
  onChangeCategory(searchValue: Category) {
    this.signUpData.category = searchValue;
  }
  onChangeProduct(searchValue: Product) {
    this.signUpData.product = searchValue;
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.signUp();
    }
  }
  signUp(): void {

    if (this.signUpData.email === '') {
      this.emptyEmailField = true;
    } else {
      this.emptyEmailField = false;
    }

    if (this.signUpData.password === '') {
      this.emptyPasswordField = true;
    } else {
      this.emptyPasswordField = false;
    }
    if (this.signUpData.password === this.signUpData.confpass) {
      this.comparePasswords = true;
    } else {
      this.comparePasswords = false;
    }
    if (this.signUpData.username === '') {
      this.emptyUsernameField = true;
    } else {
      this.emptyUsernameField = false;
    }
    if (this.signUpData.email.match(this.emailValidationExpression)) {
      this.checkEmail = true;
    } else {
      this.checkEmail = false;
    }
    if (this.signUpData.password.match(this.passwordValidationExpression)) {
      this.checkPassword = true;
    } else {
      this.checkPassword = false;
    }
    if (this.signUpData.username.length > 4) {
      this.checkUsername = true;
    } else {
      this.checkUsername = false;
    }
    if (this.signUpData.role === Role.company) {
      console.log(this.signUpData.name.length);
      if (this.signUpData.address === '') {
        this.emptyAddressField = true;
      } else {
        this.emptyAddressField = false;
      }
      if (this.signUpData.name === '') {
        this.emptyNameField = true;
      } else {
        this.emptyNameField = false;
      }
      if (this.signUpData.name.length > 4) {
        this.checkName = true;
      } else {
        this.checkName = false;
      }

      // if (this.checkEmail && this.checkPassword && this.comparePasswords
      //   && this.checkUsername && this.checkName && !this.emptyAddressField) {
      //   console.log(this.signUpData);
      //   this.usersService.createUser(this.signUpData).subscribe(
      //     response => {
      //       console.log('ura');
      //     }, error => {
      //       console.log('error');
      //       if (error.status === 404) {
      //
      //       }
      //     });
      //   this.authService.loginUser().subscribe(
      //     response => {
      //       console.log(response);
      //       this.usersService.dbData = response;
      //       for ( let i = 0; i < this.usersService.dbData.length; i++) {
      //         console.log(this.usersService.dbData);
      //         this.lastElementId = this.usersService.dbData[this.usersService.dbData.length - 1].id;
      //       }
      //     });
      // }

    }
    if ((this.checkEmail && this.checkPassword && this.comparePasswords && this.checkUsername) ||
      (this.checkEmail && this.checkPassword && this.comparePasswords
        && this.checkUsername && this.checkName && !this.emptyAddressField)) {
      this.usersService.createUser(this.signUpData).subscribe(user => {
        if (user) {
          this.router.navigate(['auth', 'sign-in']);
        }
      });
    }
  }

}
