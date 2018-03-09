import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputProcessComponent } from './output-process.component';

describe('OutputProcessComponent', () => {
  let component: OutputProcessComponent;
  let fixture: ComponentFixture<OutputProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
