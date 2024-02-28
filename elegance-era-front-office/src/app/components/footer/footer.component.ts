import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule],
})
export class FooterComponent implements OnInit {
  data: Date = new Date();
  constructor() {}

  ngOnInit() {}
}
