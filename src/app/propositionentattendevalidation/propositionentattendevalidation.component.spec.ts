import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionentattendevalidationComponent } from './propositionentattendevalidation.component';

describe('PropositionentattendevalidationComponent', () => {
  let component: PropositionentattendevalidationComponent;
  let fixture: ComponentFixture<PropositionentattendevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionentattendevalidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionentattendevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
