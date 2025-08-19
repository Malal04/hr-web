import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesListesComponent } from './taches-listes.component';

describe('TachesListesComponent', () => {
  let component: TachesListesComponent;
  let fixture: ComponentFixture<TachesListesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesListesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesListesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
