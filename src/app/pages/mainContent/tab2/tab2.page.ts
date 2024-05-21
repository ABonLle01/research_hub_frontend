import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/interfaces';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public all_categories: Category[] = [];
  public category_names: Category[] = [];
  public category_children: Category[] = [];
  private selectedSurvey: Category;
  public displayedCategories: Category[] = [];
  private categoryHistory: Category[][] = [];

  public inCategory: boolean = false;

  public currentUser: User | null;
  
  constructor(
    private categoriesService:CategoriesService,
    private iab: InAppBrowser,
    private platform: Platform, 
    public authService: AuthenticationService,
    private toastController: ToastController
  ) {}

  //TO FIX: Cuando se cambia de tab, el boton desaparece y el contenido no se muestra correctamente

  ngOnInit(){
    this.displayedCategories = [];
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.all_categories.push(...categories)
      console.log(categories);
      let names:Category[] = [];
      for( let category of categories ){
        if(category.level==0){
          names.push(category)
        }
      }
      this.category_names.push( ...names );
      this.displayedCategories = this.category_names;
    });

    this.authService.getCurrentUser().subscribe((user) => {this.currentUser = user});
  }


  cardClick(name: string) {
    this.category_children = []; 
    const childrenNames = this.all_categories.filter(category => category.parent === name);
    
    if (childrenNames.length === 0) {
      const category = this.all_categories.find(category => category.name === name);
      
      console.log("Has pulsado sobre la categoria "+ category.name +" con el id "+category._id)


      if(category.url_survey){
        this.selectedSurvey = category;
        this.confirmSurvey();
        //todo: si selected survey ya existe en el usuario, no se hace la funcion
      }else{
        const message = `No hay encuestas disponibles para ${category.name} por el momento.`
        this.presentToast(message, 'bottom', "warning");
      }

    } else {
      this.category_children.push(...childrenNames);
      console.log(`Categorías hija de ${name}:`, childrenNames);
      
      this.categoryHistory.push(this.displayedCategories);
      this.displayedCategories = this.category_children;
      this.inCategory = true;
    }
  }

  async confirmSurvey() {
    if (this.selectedSurvey && this.currentUser) {
      this.categoriesService.addSurvey(this.currentUser._id, this.selectedSurvey._id).subscribe({
        next: () => {
          console.log('Encuesta añadida exitosamente');
          if (this.platform.is('ios') || this.platform.is('android')) {
            const browser = this.iab.create(this.selectedSurvey.url_survey);
            browser.show();
            return;
          }
          window.open(this.selectedSurvey.url_survey, '_blank');
        },
        error: async (error) => {
          console.error('Error al añadir la encuesta:', error);
          await this.presentToast(error.message, 'bottom', "danger");
        }
      });
    }
  }

  goBack() {
    if (this.categoryHistory.length > 0) {
      const previousCategories    =   this.categoryHistory.pop();
      if (previousCategories) {
        this.displayedCategories  =   previousCategories;
        this.inCategory           =   this.categoryHistory.length>0
      }
    }
  }


  async presentToast(message:string, position: 'top' | 'middle' | 'bottom', toastColor:string) {
    const toast = await this.toastController.create({
      message:        message,
      duration:       3000,
      position:       position,
      color:          toastColor,
      mode:           "ios",
      translucent:    true,
      swipeGesture:   "vertical",
    });

    await toast.present();
  }

}
