import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/StateService';

@Component({
  selector: 'app-register-part1',
  templateUrl: './register-part1.component.html',
  styleUrls: ['./register-part1.component.css']
})
export class RegisterPart1Component implements OnInit {

  regiterForm: FormGroup;
  hide = true;
  constructor(public stateService: StateService, private formBuilder: FormBuilder) { }


  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  regiterPart1(): void {
    this.stateService.registerStatus();
    this.stateService.newUser.id = this.id.value
    this.stateService.newUser.email = this.email.value
    this.stateService.newUser.password = this.password.value
  }
  ngOnInit(): void {
    this.regiterForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30),
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)]],
      confirmPassword: ['', [Validators.required]]
    },
      { validator: this.mustMatch('password', 'confirmPassword') }
    )
  }
  get id() {
    return this.regiterForm.get('id');
  }
  get email() {
    return this.regiterForm.get('email');
  }
  get password() {
    return this.regiterForm.get('password');
  }
  get confirmPassword() {
    return this.regiterForm.get('confirmPassword');
  }


}

