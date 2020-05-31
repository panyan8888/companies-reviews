import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserItemComponent } from './simple-user-item.component';

describe('SimpleUserItemComponent', () => {
  let component: SimpleUserItemComponent;
  let fixture: ComponentFixture<SimpleUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
