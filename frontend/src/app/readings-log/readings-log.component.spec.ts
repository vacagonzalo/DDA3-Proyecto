import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsLogComponent } from './readings-log.component';

describe('ReadingsLogComponent', () => {
  let component: ReadingsLogComponent;
  let fixture: ComponentFixture<ReadingsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
