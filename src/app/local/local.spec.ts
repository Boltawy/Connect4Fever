import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Local } from './local';

describe('Local', () => {
  let component: Local;
  let fixture: ComponentFixture<Local>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Local]
    })
    .compileComponents();

    fixture = TestBed.createComponent(local);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
