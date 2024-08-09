import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgnetdashboardComponent } from './agnetdashboard.component';

describe('AgnetdashboardComponent', () => {
  let component: AgnetdashboardComponent;
  let fixture: ComponentFixture<AgnetdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgnetdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgnetdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
