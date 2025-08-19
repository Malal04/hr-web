import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEmployerComponent } from './index-employer.component';

describe('IndexEmployerComponent', () => {
  let component: IndexEmployerComponent;
  let fixture: ComponentFixture<IndexEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
