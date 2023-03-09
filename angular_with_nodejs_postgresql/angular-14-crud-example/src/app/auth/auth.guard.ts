import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

interface Token {
    message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        var token = localStorage.getItem('tokenUserSession')

        return new Promise((resolve: Function, reject: Function) => {
            this.http.post<Token>('http://localhost:8080/api/auth/verification', { token: token }).subscribe({
                next: (res) => { 
                    if (res.message === "Token verify") {
                        resolve(true);
                    } else {
                        localStorage.removeItem("tokenUserSession");
                        this.router.navigate(['/sign-in']);
                        reject(false);
                    }
                },
                error: (e) => {
                    localStorage.removeItem("tokenUserSession");
                    this.router.navigate(['/sign-in']);
                    console.error(e);
                }
              });
        });
    }
}

/*
            .subscribe({
                next: (res) => { 
                    console.log("route = " + res.message);
                    if (res.message === "Token verify") {
                        console.log("ok");
                        resolve(true);
                    } else {
                        console.log("op");
                        this.router.navigate(['/sign-in']);
                        reject(false);
                    }
                },
                error: (e) => console.error(e)
            });
            */
            /*
            .subscribe(data => {
                console.log("route = " + data.message);
                if (data.message === "Token verify") {
                    console.log("ok");
                    resolve(true);
                } else {
                    console.log("op");
                    this.router.navigate(['/sign-in']);
                    reject(false);
                }
            })
        });
*/

/*
async verificationToken() {
    var token = localStorage.getItem('token')

    new Promise((resolve, reject) => {
        this.http.post<Token>('http://localhost:8080/api/auth/verification', { token: token }).subscribe(data => {
            console.log("route = " + data.message);
            if (data.message === "Token verify") {
                console.log("ok");
                return true;
            } else {
                console.log("op");
                this.router.navigate(['/sign-in']);
                return false;
            }
        })
      });
    console.log("lol");
    return false;
}
*/

         /*
            if (this._Guard4DependencyService.valid()) {
                resolve(true);
            } else {
                reject(false);
            }*/
        //});
/*
        this.http.post<Token>('http://localhost:8080/api/auth/verification', { token: token }).subscribe(data => {
            console.log("route = " + data.message);
            if (data.message === "Token verify") {
                console.log("ok");
                //return true;
                return Promise.resolve(true);

            } else {
                console.log("op");
                this.router.navigate(['/sign-in']);
                //return false;
                return Promise.resolve(false);

            }
        })
*/
/*
        return this._authGuard.canActivate(route, state).then((auth: boolean) => {
            if(!auth) {
               return Promise.resolve(false);
            }
            //... your role guard check code goes here
        });
*/

/*
        let promise = new Promise((resolve, reject) => {
        });
        */
        //console.log("snif");
        //return Promise.resolve(false);

        //return promise;
        //return this.verificationToken();
/*
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    verificationToken(): boolean {
        var token = localStorage.getItem('token')

        this.http.post<Token>('http://localhost:8080/api/auth/verification', { token: token }).subscribe(data => {
            console.log("route = " + data.message);
            if (data.message === "Token verify") {
                //console.log("ok");
                return true;
            } else {
                //console.log("op");
                this.router.navigate(['/sign-in']);
                return false;
            }
        })
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.verificationToken();
    }
}
*/



        //const currentUser = this.authenticationService.currentUserValue;
        //var value = window.localStorage.getItem('tokenUserSession'); //"gridGrid" is component name + component id.
        //console.log("value = " + value);
        //var model: Object = JSON.parse("token");
        //console.log("model = " + model);

                /*
        var test = this.http.post<Article>('http://localhost:8080/api/auth/verification', { token: value });
        console.log("test = " + test);
*/

        /*
        const currentUser = true;
        
        if (currentUser) {
            console.log("route = " + route.data);
            
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return false;
        }
*/