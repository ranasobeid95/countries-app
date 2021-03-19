import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CountriesComponent } from './countries.component';
import { CountriesService } from './services/countries.service';

describe('CountriesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      providers: [CountriesService],
      imports: [HttpClientTestingModule],
    });
  });

  httpTestingController = TestBed.get(HttpTestingController);
  service = TestBed.get(CountriesService);
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async () => {
    await TestBed.compileComponents();
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
