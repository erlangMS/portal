import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenvolvimentoComponent } from './desenvolvimento.component';

describe('DesenvolvimentoComponent', () => {
  let component: DesenvolvimentoComponent;
  let fixture: ComponentFixture<DesenvolvimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesenvolvimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesenvolvimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
