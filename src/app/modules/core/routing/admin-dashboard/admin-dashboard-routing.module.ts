import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { ProductsComponent } from '../../../products/products.component';
import { CategoriesComponent } from '../../../categories/categories.component';
import { UserActivityComponent } from '../../../user-activity/user-activity.component';
import { ContactRequestsComponent } from '../../../contact-requests/contact-requests.component';
import { FeedbackComponent } from '../../../feedback/feedback.component';
import { CouponsComponent } from '../../../coupons/coupons.component';
import { OrdersComponent } from '../../../orders/orders.component';
import { CustomersComponent } from '../../../customers/customers.component';
import { NewProductComponent } from '../../../new-product/new-product.component';
import { NewCategoryComponent } from '../../../new-category/new-category.component';
import { CustomerComponent } from '../../../customer/customer.component';
import { OrderComponent } from '../../../order/order.component';
import { NewCouponComponent } from '../../../new-coupon/new-coupon.component';
import { RolesComponent } from '../../../roles/role.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'contact-requests', component: ContactRequestsComponent },
      { path: 'user-activity', component: UserActivityComponent },
      { path: 'products/new', component: NewProductComponent },
      { path: 'categories/new', component: NewCategoryComponent },
      { path: 'customers/customer', component: CustomerComponent },
      { path: 'orders/order', component: OrderComponent },
      { path: 'coupons/new', component: NewCouponComponent },
      { path: 'roles', component: RolesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
