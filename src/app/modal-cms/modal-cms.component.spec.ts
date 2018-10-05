import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCmsComponent } from './modal-cms.component';

describe('ModalCmsComponent', () => {
  let component: ModalCmsComponent;
  let fixture: ComponentFixture<ModalCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
