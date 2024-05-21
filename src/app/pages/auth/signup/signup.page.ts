import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  regForm!: FormGroup;

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, 
    public authService: AuthenticationService, public router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name:['',[Validators.required]],
      surnames:['',[Validators.required]],
      genre:['',[Validators.required]],
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['',[
          Validators.required,
          Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
        ]
      ],
      confirmPassword: ['',[
          Validators.required,
          Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
        ]
      ]
    }, { 
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const confirmPasswordInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        return confirmPasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmPasswordInput.setErrors(null);
      }
    };
  }


  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    if (this.regForm.valid) {
      try {
        this.authService.registerUser(
          this.regForm.value.name, this.regForm.value.surnames, this.regForm.value.genre,
          this.regForm.value.email, this.regForm.value.password
        ).subscribe({
          next: (data) => {
            this.authService.setCurrentUser(data);
            loading.dismiss();
            this.router.navigate(['/tabs']);
          },
          error: (error) => {
            loading.dismiss();
            console.error(error);

            this.presentToast('Error durante el registro', 'bottom');
          }
        });
      } catch (error) {
        loading.dismiss();
        console.error(error);
        this.presentToast('Error durante el registro', 'bottom');
      }
    } else {
      loading.dismiss();
      this.presentToast('Por favor, complete el formulario correctamente', 'bottom');
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
