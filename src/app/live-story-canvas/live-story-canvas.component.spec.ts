import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStoryCanvasComponent } from './live-story-canvas.component';

describe('LiveStoryCanvasComponent', () => {
  let component: LiveStoryCanvasComponent;
  let fixture: ComponentFixture<LiveStoryCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveStoryCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveStoryCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
