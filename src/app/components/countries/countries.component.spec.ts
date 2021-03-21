import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { CountriesService } from '../../services/countries.service';
import { FilterService } from 'src/app/services/filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountriesRoutingModule } from './countries-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';

describe('Countries Component', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      providers: [CountriesService, FilterService],
      imports: [
        HttpClientTestingModule,
        CountriesRoutingModule,
        MaterialModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
