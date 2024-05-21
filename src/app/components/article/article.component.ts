import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';

import { ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})

export class ArticleComponent {

  @Input() index: number = 0;
  @Input() article!: Article;
  

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
  ) { }

  openArticle(){

    if(this.platform.is('ios') || this.platform.is('android') ){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }
    
    window.open(this.article.url, '_blank');

  }

  async onOpenMenu(){

    const normalBtns = [
      {
        text: 'Favorito',
        icon: 'heart-outline',
        handler: () => this.onToggleFavorite()
      },{
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      }
    ]

    const shareBtn = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareActicle()
    }

    //el metodo share solo funciona si se utiliza capacitor, por lo que si el dispositivo no lo tiene disponible, no se verá el boton
    if(this.platform.is('capacitor')){
      normalBtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });

    await actionSheet.present();

  }

  onShareActicle(){
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      '',
      this.article.url
    );
  }

  onToggleFavorite(){
    //console.log('toggle favorite');
  }


}
