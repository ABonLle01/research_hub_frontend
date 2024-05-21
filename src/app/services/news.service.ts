import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage:ArticlesByCategoryAndPage={}

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint:string){
    return this.http.get<T>(`${apiUrl}${endpoint}`,{
      params: {
        apiKey: apiKey,
        country: 'us'
      }
    });
  }


  getTopHeadlines(): Observable<Article[]>{
    return this.getTopHeadLinesByCategory('general');
  }

  getTopHeadLinesByCategory(category:string, loadMore:boolean=false):Observable<Article[]>{
  
    if(loadMore){
      return this.getArticlesByCategory(category);
    }
   
    //si ya existe la categoria, se devuelven los articulos de dicha categoria
    if(this.articlesByCategoryAndPage[category]){
      // la funcion of permite contruir un observable basada en el argumento
      // convierte en observable lo que se le pasa como argumento
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    //si no, se obtienen esos articulos para la categoria elegida
    return this.getArticlesByCategory(category);
  }

  
  private getArticlesByCategory(category:string):Observable<Article[]>{
    //se verifica primero si le objeto existe, en caso negativo se crea
    if( !Object.keys(this.articlesByCategoryAndPage).includes(category) ){
      //No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page+1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
    .pipe(
      map(({articles})=>{

        if(articles.length===0)  return this.articlesByCategoryAndPage[category].articles;

          this.articlesByCategoryAndPage[category] = {
            page:page,
            articles:[ ...this.articlesByCategoryAndPage[category].articles, ...articles ] //acumulo los articulos anteriores y le sumo los nuevos
          }

        //devuelvo todos los elementos de la categoria
        return this.articlesByCategoryAndPage[category].articles;
      })
    );

  }

}
