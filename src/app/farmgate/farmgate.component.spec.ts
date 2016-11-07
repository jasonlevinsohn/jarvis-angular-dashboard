/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FarmgateComponent } from './farmgate.component';

describe('FarmgateComponent', () => {
  let component: FarmgateComponent;
  let fixture: ComponentFixture<FarmgateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmgateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmgateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
