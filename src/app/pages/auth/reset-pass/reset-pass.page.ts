import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  email:string;
  
  resetPassForm: FormGroup;

  constructor(public router: Router, public authService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}'
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password && confirmPassword) {
      const error = password.value === confirmPassword.value ? null : { notEquivalent: true };
      confirmPassword.setErrors(error);
    }
  }

  async resetPassword() {
    if (this.resetPassForm.valid) {
      const email = this.resetPassForm.value.email;
      const password = this.resetPassForm.value.password;

      try {
        await this.authService.resetPassword(email, password);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    }
  }

}
