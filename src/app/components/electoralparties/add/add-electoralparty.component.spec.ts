import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AddElectoralPartyComponent} from "./add-electoralparty.component";


describe('AddElectoralPartyComponent', () => {
  let component: AddElectoralPartyComponent;
  let fixture: ComponentFixture<AddElectoralPartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddElectoralPartyComponent]
    });
    fixture = TestBed.createComponent(AddElectoralPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
