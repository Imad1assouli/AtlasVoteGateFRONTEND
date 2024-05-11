import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EditElectoralPartyComponent} from "./edit-electoralparty.component";

describe('EditElectoralPartyComponent', () => {
    let component: EditElectoralPartyComponent;
    let fixture: ComponentFixture<EditElectoralPartyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditElectoralPartyComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditElectoralPartyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
