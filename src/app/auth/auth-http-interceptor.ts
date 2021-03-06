import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // modify or log the outgoing request
        // clone the request and modify it
        const modifiedReq = req.clone({
            // make user stay signin in after signing in
            withCredentials: true
        });
        // returns an observable
        // take the cloned request as parameter
        return next.handle(modifiedReq); 
            // .pipe(
            //     filter(val => val.type === HttpEventType.Sent),

            //     tap(val => {
            //         if(val.type === HttpEventType.Sent) {
            //             console.log("Request was sent to server");
            //         }

            //         if(val.type === HttpEventType.Response) {
            //             console.log("Got a response from the API", val);
            //         }
            //     })
            // );

    }
}
