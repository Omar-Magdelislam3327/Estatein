import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgenetComponent } from './add-agenet.component';

describe('AddAgenetComponent', () => {
  let component: AddAgenetComponent;
  let fixture: ComponentFixture<AddAgenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAgenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
