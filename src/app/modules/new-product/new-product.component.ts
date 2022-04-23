import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewProductState } from './state/new-product.state';
import { Observable } from 'rxjs';
import { Product } from '../../data/model/product/product.interface';
import { ActionNewProduct } from './state/new-product.actions';
import { Category } from '../../data/model/category/category.interface';
import { patternDecimal, patternInteger } from '../../common/patterns';
import { FormHelper } from '../core/util/form.helper';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly formHelper: FormHelper,
  ) {}

  @Select(NewProductState.initialProduct) initialProduct$?: Observable<Product>;
  @Select(NewProductState.categories) categories?: Observable<Category[]>;

  form!: FormGroup;
  productImageBuffers: (string | ArrayBuffer | null)[] = [null];

  @ViewChild('inputElement') input?: ElementRef<HTMLInputElement>;
  private lastProductImageClickIndex = -1;

  get imagesFormArray() {
    return this.form.controls['images'] as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      categoryId: [-1, Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.pattern(patternDecimal)]],
      oldPrice: ['', [Validators.pattern(patternDecimal)]],
      stockQuantity: [
        '',
        [Validators.required, Validators.pattern(patternInteger)],
      ],
      images: this.formBuilder.array([this.createEmptyProductImageForm()]),
    });

    this.route.queryParams.subscribe((params) => {
      const productId = params['productId'];

      this.store.dispatch(
        ActionNewProduct.init({
          productId: parseInt(productId),
        }),
      );
    });

    this.initialProduct$?.subscribe((initialProduct) =>
      this.form.patchValue({
        name: initialProduct?.name,
        description: initialProduct?.description,
        categoryId: initialProduct?.category?.id,
        price: initialProduct?.price,
        oldPrice: initialProduct?.oldPrice,
        stockQuantity: initialProduct?.stockQuantity,
      }),
    );
  }

  onSavePressed() {
    if (this.form.invalid) {
      this.formHelper.markFormGroupDirty(this.form);
      return;
    }

    this.store.dispatch(ActionNewProduct.savePressed(this.form.value));
  }

  onUploadClick(index: number) {
    this.lastProductImageClickIndex = index;
    this.input?.nativeElement?.click();
  }

  onUploadNewImagePressed() {
    this.productImageBuffers.push(null);
    this.imagesFormArray.push(this.createEmptyProductImageForm());
  }

  onRemoveImageClick(index: number) {
    if (
      this.imagesFormArray.length < 2 ||
      this.productImageBuffers.length < 2
    ) {
      return;
    }

    this.productImageBuffers.splice(index, 1);
    this.imagesFormArray.removeAt(index);
  }

  handleFileInput(event: any) {
    const [file] = event?.target?.files;
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.productImageBuffers[this.lastProductImageClickIndex] =
        fileReader.result;
      this.imagesFormArray.controls[this.lastProductImageClickIndex].patchValue(
        { file },
      );
    };
    fileReader.readAsDataURL(file);
  }

  private createEmptyProductImageForm(): FormGroup {
    return this.formBuilder.group({
      order: ['', [Validators.required, Validators.pattern(patternInteger)]],
      file: [null, Validators.required],
    });
  }
}
