import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/StateService';

@Component({
  selector: 'app-register-part1',
  templateUrl: './register-part1.component.html',
  styleUrls: ['./register-part1.component.css']
})
export class RegisterPart1Component implements OnInit {

  public regiterFormGroup: FormGroup;
  public idFormControl: FormControl;
  public emailFormControl: FormControl;
  public passwordFormControl: FormControl;
  public passwordConfirmFormControl: FormControl;


  constructor(public stateService: StateService) { }


  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('passwordConfirm');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }


  regiterPart1(): void {
    this.stateService.registerStatus();
    this.stateService.newUser.id = this.idFormControl.value
    this.stateService.newUser.email = this.emailFormControl.value
    this.stateService.newUser.password = this.passwordFormControl.value
    console.log(this.stateService.newUser);
  }
  ngOnInit(): void {
    this.idFormControl = new FormControl("", Validators.required);

    this.emailFormControl = new FormControl("", [Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])
    ]),
      this.passwordFormControl = new FormControl("", [Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)])
      ]),
      this.passwordConfirmFormControl = new FormControl("", [Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)])
      ]),
    {
      validators: this.password.bind(this)
    }


    // Initializing the from group
    this.regiterFormGroup = new FormGroup({
      id: this.idFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      passwordConfirm: this.passwordConfirmFormControl
    });
  }
}

