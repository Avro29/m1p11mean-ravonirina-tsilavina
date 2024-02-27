import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
})
export class DepensesComponent implements OnInit {
  model!: NgbDateStruct;
  depenseForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.depenseForm = this.fb.group({
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      purchaseDate: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.depenseForm.valid) {
      const formData = new FormData();
      for (const key in this.depenseForm.value) {
        formData.append(key, this.depenseForm.value[key]);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      //   // Send the FormData using your HTTP service (replace with your implementation)
      //   // this.yourHttpService.submitExpense(formData).subscribe(
      //   //   (response) => {
      //   //     // Handle successful submission (e.g., reset form, show feedback)
      //   //     console.log('Expense submitted successfully:', response);
      //   //     this.depenseForm.reset(); // Reset form after successful submission
      //   //   },
      //   //   (error) => {
      //   //     // Handle errors (e.g., display error message)
      //   //     console.error('Error submitting expense:', error);
      //   //   }
      //   // );
    }
  }
}
