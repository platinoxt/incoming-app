import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  public initAuthListener(): void {
    this.auth.onAuthStateChanged((user)=>{
      console.log(user);
    });
  }

  public async createUser(name:string,email:string,password:string): Promise<void>{
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
    return updateProfile(credentials.user, { displayName: name, photoURL: '' });
  }

  public login(email:string,password:string): Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public logout(): Promise<void>{
    return this.auth.signOut();
  }

  public isAuth(): boolean{
    return this.auth.currentUser ? true : false;
  }
}
