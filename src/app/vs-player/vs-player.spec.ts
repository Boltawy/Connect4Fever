import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsPlayer } from './vs-player';

describe('VsPlayer', () => {
  let component: VsPlayer;
  let fixture: ComponentFixture<VsPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VsPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
