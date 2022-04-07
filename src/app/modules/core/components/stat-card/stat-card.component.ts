import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() valueType: 'MONEY' | 'NUMBER' = 'NUMBER';
  @Input() relativePercentage = 0;
}
