import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInComponent } from './build-in.component';

describe('BuildInComponent', () => {
  let component: BuildInComponent;
  let fixture: ComponentFixture<BuildInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
