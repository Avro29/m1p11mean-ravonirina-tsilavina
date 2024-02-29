import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Rellax from 'rellax';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [RouterModule, HttpClientModule],
})
export class MainComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
