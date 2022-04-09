import { NgModule } from '@angular/core';
import { StatCardComponent } from './stat-card/stat-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    NzCardModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
  ],
  declarations: [StatCardComponent, MenuButtonComponent],
  exports: [StatCardComponent, MenuButtonComponent],
})
export class ComponentsModule {}
