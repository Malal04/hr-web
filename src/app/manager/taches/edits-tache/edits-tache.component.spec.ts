import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsTacheComponent } from './edits-tache.component';

describe('EditsTacheComponent', () => {
  let component: EditsTacheComponent;
  let fixture: ComponentFixture<EditsTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
