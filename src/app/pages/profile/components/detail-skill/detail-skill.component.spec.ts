import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSkillComponent } from './detail-skill.component';

describe('DetailSkillComponent', () => {
  let component: DetailSkillComponent;
  let fixture: ComponentFixture<DetailSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
