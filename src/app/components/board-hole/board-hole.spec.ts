import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHole } from './board-hole';

describe('BoardHole', () => {
  let component: BoardHole;
  let fixture: ComponentFixture<BoardHole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardHole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
