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

  confpass: string;

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

  userData: IUser = {
    email: '',
    password: '',
    username: '',
    role: Role.user,
  };

  companyData: IUser = {
    name: '',
    address: '',
    category: Category.IT,
    product: Product.ITProduct
  } as IUser;

  constructor(
    public usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.emailValidationExpression = '([a-z0-9][-a-z0-9_\\+\\.]*[a-z0-9])@([a-z0-9][-a-z0-9\\.]*[a-z0-9]\\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\\.{3}[0-9]{1,3}))';
    this.passwordValidationExpression = '^.{6,}$';
    this.showCompanyFields = false;
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.signUp();
    }
  }
  signUp(): void {
    this.validate();
    if ((this.checkEmail && this.checkPassword && this.comparePasswords && this.checkUsername) ||
      (this.checkEmail && this.checkPassword && this.comparePasswords
        && this.checkUsername && this.checkName && !this.emptyAddressField)) {

      const signUpData = this.userData.role === Role.company
        ? { ...this.userData, ...this.companyData}
        : this.userData;
      this.usersService.createUser(signUpData).subscribe(user => {
        if (user) {
          this.router.navigate(['auth', 'sign-in']);
        }
      });
    }
  }
  onChangeRole(searchValue: Role) {
    this.showCompanyFields = this.userData.role === Role.company;
  }
  validate() {
    this.emptyEmailField = this.userData.email === '';
    this.emptyPasswordField = this.userData.password === '';

    this.comparePasswords = this.userData.password === this.confpass;
    this.emptyUsernameField = this.userData.username === '';
    this.checkEmail = !!this.userData.email.match(this.emailValidationExpression);
    this.checkPassword = !!this.userData.password.match(this.passwordValidationExpression);
    this.checkUsername = this.userData.username.length > 4;

    if (this.userData.role === Role.company) {
      this.emptyAddressField = this.companyData.address === '';
      this.emptyNameField = this.companyData.name === '';
      this.checkName = this.companyData.name.length > 4;
    }
  }

  haveAnAccount(): void {
    this.router.navigate(['/auth/sign-in']);
}

}
