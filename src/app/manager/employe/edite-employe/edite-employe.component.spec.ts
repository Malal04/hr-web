import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeEmployeComponent } from './edite-employe.component';

describe('EditeEmployeComponent', () => {
  let component: EditeEmployeComponent;
  let fixture: ComponentFixture<EditeEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
