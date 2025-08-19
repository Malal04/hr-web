import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesAddComponent } from './taches-add.component';

describe('TachesAddComponent', () => {
  let component: TachesAddComponent;
  let fixture: ComponentFixture<TachesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
