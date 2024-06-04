import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Category, EncuestasRealizada, User } from 'src/app/interfaces';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  currentUser: User | null;
  userSubscription: Subscription | null = null;
  surveys: EncuestasRealizada[] = [];
  regForm: FormGroup;
  selectedImage: any;
  pickedImage: any;

  constructor(
    public router: Router,
    public authService: AuthenticationService,
    public categoryService: CategoriesService,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  )  {}

  ngOnInit() {
    
    this.regForm = this.formBuilder.group({
      name: ['', Validators.required],
      parent:null,
      level: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      url_img: ['', Validators.required],
      url_survey:null,
    });

    

    this.userSubscription = this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.surveys = this.currentUser.surveys.map(survey => ({
          name: survey.name,
          parent: survey.parent,
          reward: survey.reward,
          fx_taken: new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(new Date(survey.fx_taken))
        }));
      }
    });

    if (this.categoryService.selectedCategory) {
      console.log("se ha seleccionado una categoria")
      const selectedCategory = this.categoryService.selectedCategory;

      this.regForm.patchValue({
        name: selectedCategory.name,
        parent: selectedCategory.parent,
        level: selectedCategory.level,
        url_img: this.pickedImage || selectedCategory.url_img,
        url_survey: selectedCategory.url_survey,
      });

    }

  }

  async logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
    this.categoryService.selectedCategory=null;
    this.pickedImage=null;
  }

  get errorControl() {
    return this.regForm.controls;
  }

  async addCategory() {
    if (this.regForm.valid) {
      const newCategory: Category = this.regForm.value;
      this.categoryService.addNewCategory(newCategory).subscribe({
        next: (category: Category) => {
          console.log('Categoria añadida con exito:', category);
          this.presentToast('Categoría añadida con éxito', 'bottom', 'success');
          this.regForm.reset(); // Reiniciar el formulario después de agregar la categoría
        },
        error: (error: any) => {
          console.error('Error al añadir categoría:', error.message);
          this.presentToast('Error al añadir categoría', 'bottom', 'danger');
        }
      });
    } else {
      this.presentToast('Formulario no válido', 'bottom', 'danger');
    }
  }

  async modifyCategory() {
    if (this.categoryService.selectedCategory) {
      const modifiedCategory: Category = this.regForm.value;
      modifiedCategory._id = this.categoryService.selectedCategory._id; 
      
      this.categoryService.updateCategory(modifiedCategory).subscribe({
        next: (category: Category) => {
          console.log('Categoría actualizada con éxito:', category);
          this.presentToast('Categoría actualizada con éxito', 'bottom', 'success');
          this.regForm.reset(); 
          this.categoryService.selectedCategory = null; 
        },
        error: (error: any) => {
          console.error('Error al actualizar categoría:', error.message);
          this.presentToast('Error al actualizar categoría', 'bottom', 'danger');
        }
      });
    } else {
      this.presentToast('Formulario no válido', 'bottom', 'danger');
      console.log(this.regForm)
    }
  }
  
  async openImagePicker(event: { target: { files: any[]; }; }) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.addEventListener('load', () => {
      this.pickedImage = reader.result;
      this.regForm.patchValue({
        url_img: this.pickedImage
      });

    });
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

  clearForm(){
    this.regForm.reset();
    this.categoryService.selectedCategory=null;
    this.pickedImage=null;
  }

}
