import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpropComponent } from './listprop.component';

describe('ListpropComponent', () => {
  let component: ListpropComponent;
  let fixture: ComponentFixture<ListpropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListpropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
