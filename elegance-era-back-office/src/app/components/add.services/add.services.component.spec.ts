/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddServicesComponent } from './add.services.component';

describe('Add.servicesComponent', () => {
  let component: AddServicesComponent;
  let fixture: ComponentFixture<AddServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddServicesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
