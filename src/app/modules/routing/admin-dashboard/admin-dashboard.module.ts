import { NgModule } from '@angular/core';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CategoriesComponent } from '../../categories/categories.component';
import { ContactRequestsComponent } from '../../contact-requests/contact-requests.component';
import { CouponsComponent } from '../../coupons/coupons.component';
import { CustomersComponent } from '../../customers/customers.component';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { ProductsComponent } from '../../products/products.component';
import { OrdersComponent } from '../../orders/orders.component';
import { UserActivityComponent } from '../../user-activity/user-activity.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    CategoriesComponent,
    ContactRequestsComponent,
    CouponsComponent,
    CustomersComponent,
    FeedbackComponent,
    ProductsComponent,
    OrdersComponent,
    UserActivityComponent,
  ],
  imports: [
    AdminDashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
  ],
})
export class AdminDashboardModule {}
