import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EncuestasRealizada, User } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  currentUser: User | null;
  userSubscription: Subscription | null = null;
  surveys: EncuestasRealizada[] = [];


  constructor(public router: Router, public authService: AuthenticationService)  {}

  ngOnInit() {
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
  }

  async logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

  async try() {
    this.authService.getCurrentUser().subscribe((user) => {
      console.log(user);
    });

  }
}
