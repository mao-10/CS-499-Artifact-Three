import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetListing } from './pet-listing';

describe('PetListing', () => {
  let component: PetListing;
  let fixture: ComponentFixture<PetListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
