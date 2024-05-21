import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(public formBuilder: FormBuilder, public loadingCtrl:LoadingController, 
    public authService: AuthenticationService, public router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['',[
          Validators.required,
          //Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
        ]
      ]
    });
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm.valid) {
      try {
        const userResponse = await firstValueFrom(this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password));
        loading.dismiss();
        
        if (userResponse.body) {
          this.authService.setCurrentUser(userResponse.body);
          this.router.navigate(['/tabs']);
        } else {
          await this.presentToast("No se ha encontrado usuario", 'bottom');
        }
      } catch (error) {
        loading.dismiss();
        await this.presentToast(error.message, 'bottom');
      }
    } else {
      loading.dismiss();
      await this.presentToast("Formulario no válido", 'bottom');
    }
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      color: "danger",
      mode: "ios",
      translucent: true,
      swipeGesture: "vertical",
    });

    await toast.present();
  }

}
