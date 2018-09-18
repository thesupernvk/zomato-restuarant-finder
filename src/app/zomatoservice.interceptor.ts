import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ZomatoServiceInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dupRequest = req.clone({
            headers : req.headers.set('user-key','41579c9d46399bce9018510b6db4f587')
        });
        return next.handle(dupRequest);
    }
};

@NgModule({
    providers : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass : ZomatoServiceInterceptor,
            multi : true
        }
    ]
})
export class InterceptorModule{}