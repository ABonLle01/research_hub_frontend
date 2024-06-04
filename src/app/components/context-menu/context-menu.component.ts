import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})

export class ContextMenuComponent {
  @Input() category: any;

  constructor(private popoverController: PopoverController, private router: Router) {}

  async editCategory() {
    await this.popoverController.dismiss();
    // Navegar a tab3 con la información de la categoría
    this.router.navigate(['tabs/tab3'], { state: { category: this.category } });
  }

  async cancelCategory() {
    await this.popoverController.dismiss();
    // Lógica para cancelar la categoría
    console.log('Cancelar', this.category);
  }
}