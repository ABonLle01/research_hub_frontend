import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../interfaces';

const apiRestUrl = environment.apiRestUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${apiRestUrl}category/all`);
  }


  addSurvey(id_user:string, id_category:string): Observable<Category[]>{
    console.log("añadiendo encuesta a id_user: "+id_user)
    return this.http.post<any>(`${apiRestUrl}user/${id_user}/encuestas/${id_category}`, {observe: 'response'}).pipe(
      catchError((error: HttpErrorResponse) => {
        let message:string ="";
        
        switch(error.status){
          case 400: message = "Solo puedes hacer la encuesta una vez";  break;
          case 404: message = "Usuario o categoria no encontrada";      break;
          case 500: message = "Error al agregar encuesta";              break;
          default:  message = "Error al agregar encuesta";
        }

        return throwError(()=> new Error(message));
      })
    );  
  }

}
