import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs/Subject';

export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    // use spread operator to return new object,
    // prevents other parts of app from modifying private variable
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }
}
