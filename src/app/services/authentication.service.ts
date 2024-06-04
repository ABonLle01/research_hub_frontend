import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  private apiRestUrl = environment.apiRestUrl;
  private currentUser: BehaviorSubject<User | null>;
  private isAdmin:boolean=false;

  constructor(private http: HttpClient) { 
    this.currentUser = new BehaviorSubject<User | null>(null);
  }


  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: User | null): void {
    this.currentUser.next(user);
  }
  

  isUserAdmin():boolean{
    return this.isAdmin;
  }
  
  private setAdminStatus(status:boolean):void{
    this.isAdmin=status;
  }

  getUser(): Observable<any> {
    return this.currentUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<any>(`${this.apiRestUrl}user/${user.email}`).pipe(
            catchError(this.handleError)
          );
        } else {
          return throwError(() => new Error('No hay usuario actual'));
        }
      })
    );
  }

  registerUser(name: string, surnames: string, genre: string, email: string, password: string): Observable<any> {
    const body = { name, surnames, genre, email, password };
    const user =  this.http.post<any>(`${this.apiRestUrl}user/new`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        let message:string ="";
        
        switch(error.status){
          case 500: message = "Error al crear usuario"; break;
          default:  message = "Error al crear usuario";
        }

        return throwError(()=> new Error(message));
      })
    );

    return user;
  }

  loginUser(email: string, password: string): Observable<any> {
    console.log("body - (loginUser):", email, password);
    
    if(email=='prueba@admin.com' && password=='Password@1' ){
      console.log("admin detected!");
      this.setAdminStatus(true);
    } else {
      this.setAdminStatus(false);
    }

    const user = this.http.get<HttpResponse<any>>(`${this.apiRestUrl}user/login/?email=${email}&password=${password}`, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        let message:string ="";
        
        switch(error.status){
          case 400: message = "Los parámetros de email y contraseña son requeridos";  break;
          case 401: message = "La contraseña proporcionada es incorrecta";            break;
          case 404: message = "El usuario no existe";                                 break;
          case 500: message = "Error al obtener usuario";                             break;
          default:  message = "Error al obtener usuario";
        }

        return throwError(()=> new Error(message));
      })
    );

    return user;
  }

  logoutUser(): void {
    this.setCurrentUser(null);
    this.isAdmin=false;
  }

  resetPassword(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiRestUrl}user/reset-password`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = "Error al restablecer la contraseña";
        if (error.status === 404) {
          message = "El usuario no existe";
        } else if (error.status === 400) {
          message = "Parámetros inválidos";
        }
        return throwError(() => new Error(message));
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Ocurrió un error en la red o del lado del cliente.'));
    } else {
      return throwError(() => new Error(`Backend returned code ${error.status}, body was: ${error.message}`));
    }
  }
}