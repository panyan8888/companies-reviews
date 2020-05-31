import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrifileComponent } from './prifile.component';

describe('PrifileComponent', () => {
  let component: PrifileComponent;
  let fixture: ComponentFixture<PrifileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrifileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrifileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
