import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTachesComponent } from './edit-taches.component';

describe('EditTachesComponent', () => {
  let component: EditTachesComponent;
  let fixture: ComponentFixture<EditTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
