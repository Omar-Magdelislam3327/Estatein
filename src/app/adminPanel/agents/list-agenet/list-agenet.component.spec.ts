import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgenetComponent } from './list-agenet.component';

describe('ListAgenetComponent', () => {
  let component: ListAgenetComponent;
  let fixture: ComponentFixture<ListAgenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAgenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAgenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
