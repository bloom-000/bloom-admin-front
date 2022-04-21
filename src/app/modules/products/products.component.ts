import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActionProducts } from './state/products.actions';
import { Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { Product } from '../../data/model/product/product.interface';
import { ProductsState } from './state/products.state';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(ProductsState.products) products$!: Observable<DataPage<Product>>;
  @Select(ProductsState.pageSize) pageSize$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(ActionProducts.initialLoadRequested());
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionProducts.pageSizeChanged({ pageSize }));
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionProducts.pageChanged({ page }));
  }

  onShowProductDetailsPressed(product: Product) {
    this.store.dispatch(new Navigate([`/products/${product.id}`]));
  }

  onUpdateProductPressed(product: Product) {
    this.store.dispatch(
      new Navigate(['/products/new'], { productId: product.id }),
    );
  }

  onDeleteProductPressed(product: Product) {
    this.store.dispatch(ActionProducts.deleteProductPressed(product));
  }

  composeImagePath(path: string | undefined) {
    return 'http://localhost:3000/' + path;
  }
}
