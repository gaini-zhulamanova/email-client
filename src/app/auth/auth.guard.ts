import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canLoad(
    route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      // skip if value is null
      skipWhile(value => value === null),
      // otherwise take one value
      take(1),
      // if not signed in then send the user to the home page
      tap((authenticated) => {
        if(!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  
}
