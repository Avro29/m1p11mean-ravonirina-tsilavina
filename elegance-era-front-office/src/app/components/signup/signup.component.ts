import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { HttpService } from '../../services/http.service';

declare interface FormDataValue {
  [key: string]: string | number | File; // Example types
}

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly httpService: HttpService
  ) {
    this.userForm = this.fb.group({
      number: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData: FormData = new FormData();
      const jsonData: FormDataValue = {};
      for (const key in this.userForm.value) {
        formData.append(key, this.userForm.value[key]);
        jsonData[key as string] = this.userForm.value[key];
      }

      // Send the FormData using your HTTP service
      this.httpService.signup(jsonData).subscribe({
        next: (responseFromServer: any) => {
          console.log(responseFromServer);
          this.httpService.router.navigate(['/signin']);
          this.userForm.reset(); // Reset form after successful submission
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
