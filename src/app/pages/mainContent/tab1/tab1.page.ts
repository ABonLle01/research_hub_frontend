import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsService: NewsService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.newsService.getTopHeadlines()
    .subscribe( articles => { this.articles.push( ...articles ) } );
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory( 'general', true )
      .subscribe(articles => {

        if(articles.length === this.articles.length){
          this.infiniteScroll.disabled=true;
          return;
        }
        
        this.articles=articles;
        setTimeout(()=>{
          this.infiniteScroll.complete();  
        },1500)
      } )
  }

}
