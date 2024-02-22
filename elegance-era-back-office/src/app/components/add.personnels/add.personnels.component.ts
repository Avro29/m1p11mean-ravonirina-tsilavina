import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-add.personnels',
  templateUrl: './add.personnels.component.html',
  styleUrls: ['./add.personnels.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
})
export class AddPersonnelsComponent implements OnInit {
  personnelForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personnelForm = this.fb.group({
      nom: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.personnelForm.valid) {
      const formData = new FormData();
      for (const key in this.personnelForm.value) {
        formData.append(key, this.personnelForm.value[key]);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      //   // Send the FormData using your HTTP service (replace with your implementation)
      //   // this.yourHttpService.submitExpense(formData).subscribe(
      //   //   (response) => {
      //   //     // Handle successful submission (e.g., reset form, show feedback)
      //   //     console.log('Expense submitted successfully:', response);
      //   //     this.personnelForm.reset(); // Reset form after successful submission
      //   //   },
      //   //   (error) => {
      //   //     // Handle errors (e.g., display error message)
      //   //     console.error('Error submitting expense:', error);
      //   //   }
      //   // );
    }
  }
}
