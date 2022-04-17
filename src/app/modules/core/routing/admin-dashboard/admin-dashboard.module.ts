import { NgModule } from '@angular/core';
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CategoriesComponent } from '../../../categories/categories.component';
import { ContactRequestsComponent } from '../../../contact-requests/contact-requests.component';
import { CouponsComponent } from '../../../coupons/coupons.component';
import { CustomersComponent } from '../../../customers/customers.component';
import { FeedbackComponent } from '../../../feedback/feedback.component';
import { ProductsComponent } from '../../../products/products.component';
import { OrdersComponent } from '../../../orders/orders.component';
import { UserActivityComponent } from '../../../user-activity/user-activity.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzOverflowModule } from 'ng-zorro-antd/cdk/overflow';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NewProductComponent } from '../../../new-product/new-product.component';
import { NewCategoryComponent } from '../../../new-category/new-category.component';
import { CustomerComponent } from '../../../customer/customer.component';
import { OrderComponent } from '../../../order/order.component';
import { NewCouponComponent } from '../../../new-coupon/new-coupon.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxsModule } from '@ngxs/store';
import { NewCategoryState } from '../../../new-category/state/new-category.state';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CategoriesState } from '../../../categories/state/categories.state';
import { ProductsState } from '../../../products/state/products.state';

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
    NewProductComponent,
    NewCategoryComponent,
    CustomerComponent,
    OrderComponent,
    NewCouponComponent,
  ],
  imports: [
    NgxsModule.forFeature([NewCategoryState, CategoriesState, ProductsState]),
    AdminDashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    ComponentsModule,
    CommonModule,
    NzTabsModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzOverflowModule,
    NzDropDownModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
  ],
})
export class AdminDashboardModule {}
