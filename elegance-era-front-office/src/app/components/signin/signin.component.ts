import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { HttpService } from '../../services/http.service';
import { HttpClientModule } from '@angular/common/http';

declare interface FormDataValue {
  [key: string]: string | number | File; // Example types
}

@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class SigninComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  focus: any;
  focus1: any;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly httpService: HttpService
  ) {
    this.userForm = this.fb.group({
      email: [
        'tsilavinarakotomavo2002@gmail.com',
        [Validators.email, Validators.required],
      ],
      password: ['client12345', Validators.required],
    });
    this.httpService.checkIsLogedIn().subscribe({
      next: (x: any) => {
        if (x == true) {
          this.httpService.isLogedIn = true;
        } else {
          this.httpService.isLogedIn = false;
        }
        this.httpService.router.navigate(['/home']);
      },
      error: () => {},
      complete: () => {},
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
      this.httpService.login(jsonData).subscribe({
        next: (responseFromServer: any) => {
          console.log(responseFromServer);
          localStorage.setItem('token', responseFromServer.userDetails.token);
          localStorage.setItem('id', responseFromServer.userDetails.userId);
          this.httpService.isLogedIn = true;
          this.httpService.router.navigate(['/home']);
          this.userForm.reset(); // Reset form after successful submission
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
