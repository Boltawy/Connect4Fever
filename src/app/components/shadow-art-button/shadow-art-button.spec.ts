import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowArtButton } from './shadow-art-button';

describe('ShadowArtButton', () => {
  let component: ShadowArtButton;
  let fixture: ComponentFixture<ShadowArtButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowArtButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadowArtButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
