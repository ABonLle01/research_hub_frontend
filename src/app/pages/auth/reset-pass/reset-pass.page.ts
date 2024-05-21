import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  email:string;
  constructor(public router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  async resetPassword(){  
    /* this.authService.resetPassword(this.email).then(()=>{
      console.log('Enlace enviado');
      this.router.navigate(['/login']);
    }).catch((error)=>{
      console.log(error);
      
    }); */
  }

}
