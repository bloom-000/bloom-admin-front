import { NgModule } from '@angular/core';
import { StatCardComponent } from './stat-card/stat-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [NzCardModule, NzGridModule, CommonModule],
  declarations: [StatCardComponent],
  exports: [StatCardComponent],
})
export class ComponentsModule {}
