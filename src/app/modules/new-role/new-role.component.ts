import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActionNewRole } from './state/new-role.actions';
import { ActivatedRoute } from '@angular/router';
import { NewRoleState } from './state/new-role.state';
import { Observable } from 'rxjs';
import { FormHelper } from '../core/util/form.helper';
import { Role } from '../../data/model/role/role.interface';
import { Permission } from '../../data/model/role/permission.interface';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly formHelper: FormHelper,
  ) {}

  @Select(NewRoleState.initialRole) initialRole$!: Observable<Role>;
  @Select(NewRoleState.permissions) permissions$!: Observable<Permission[]>;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      permissionIds: [[], Validators.required],
      description: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      const roleId = params['roleId'];

      this.store.dispatch(ActionNewRole.initialRoleIdLoaded({ roleId }));
    });

    this.initialRole$.subscribe((initialRole) =>
      this.form.patchValue({
        name: initialRole?.name,
        permissionIds: initialRole?.permissions?.map((e) => e.id),
        description: initialRole?.description,
      }),
    );
  }

  onSavePressed() {
    if (this.form.invalid) {
      this.formHelper.markFormGroupDirty(this.form);
      return;
    }

    this.store.dispatch(
      ActionNewRole.savePressed({
        name: this.form.value.name,
        description: this.form.value.description,
        permissionIds: this.form.value.permissionIds,
      }),
    );
  }
}
