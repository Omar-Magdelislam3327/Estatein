import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOrdersComponent } from './agent-orders.component';

describe('AgentOrdersComponent', () => {
  let component: AgentOrdersComponent;
  let fixture: ComponentFixture<AgentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
