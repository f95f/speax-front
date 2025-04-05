import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export function JwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.warn("Adding JWT token to request headers");
    const authToken = inject(AuthService).getAuthToken();
    if (authToken) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
    }
    return next(request);
}