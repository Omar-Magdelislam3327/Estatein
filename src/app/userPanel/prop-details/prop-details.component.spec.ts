import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropDetailsComponent } from './prop-details.component';

describe('PropDetailsComponent', () => {
  let component: PropDetailsComponent;
  let fixture: ComponentFixture<PropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
