import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoralPartyComponent } from './electoralparty.component';

describe('ElectoralPartyComponent', () => {
  let component: ElectoralPartyComponent;
  let fixture: ComponentFixture<ElectoralPartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectoralPartyComponent]
    });
    fixture = TestBed.createComponent(ElectoralPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
