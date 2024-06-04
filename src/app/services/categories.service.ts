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

  public selectedCategory:Category | null = null;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${apiRestUrl}category/all`);
  }

  addNewCategory(category: Category): Observable<Category> {
    console.log("\nAñadiendo categoria (addNewCategory - category.service)\n")
    return this.http.post<Category>(`${apiRestUrl}category/new`, category).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = "Error al agregar nueva categoría";
        if (error.error instanceof ErrorEvent) {
          message = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400: message = "Solicitud incorrecta"; break;
            case 500: message = "Error del servidor al agregar categoría"; break;
            default: message = "Error inesperado al agregar categoría";
          }
        }
        return throwError(() => new Error(message));
      })
    );
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

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${apiRestUrl}category/delete/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = "Error al eliminar categoría";
        return throwError(() => new Error(message));
      })
    );
  }


  updateCategory(category: Category): Observable<Category> {
    const url = `${apiRestUrl}category/update/${category._id}`;
    return this.http.put<Category>(url, category).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = "Error al actualizar la categoría";
        if (error.error instanceof ErrorEvent) {
          message = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400: message = "Solicitud incorrecta"; break;
            case 404: message = "Categoría no encontrada"; break;
            case 500: message = "Error del servidor al actualizar categoría"; break;
            default: message = "Error inesperado al actualizar categoría";
          }
        }
        return throwError(() => new Error(message));
      })
    );
  }

}
