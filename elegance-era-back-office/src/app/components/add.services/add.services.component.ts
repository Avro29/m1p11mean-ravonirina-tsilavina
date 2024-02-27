import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add.services',
  templateUrl: './add.services.component.html',
  styleUrls: ['./add.services.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddServicesComponent implements OnInit {
  serviceForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      nom: ['', Validators.required],
      duree: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      commission: [
        '',
        [Validators.required, Validators.pattern(/^\d+\.?\d*$/)],
      ],
      prix: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.serviceForm.valid) {
      const formData = new FormData();
      for (const key in this.serviceForm.value) {
        formData.append(key, this.serviceForm.value[key]);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      //   // Send the FormData using your HTTP service (replace with your implementation)
      //   // this.yourHttpService.submitExpense(formData).subscribe(
      //   //   (response) => {
      //   //     // Handle successful submission (e.g., reset form, show feedback)
      //   //     console.log('Expense submitted successfully:', response);
      //   //     this.serviceForm.reset(); // Reset form after successful submission
      //   //   },
      //   //   (error) => {
      //   //     // Handle errors (e.g., display error message)
      //   //     console.error('Error submitting expense:', error);
      //   //   }
      //   // );
    }
  }
}
