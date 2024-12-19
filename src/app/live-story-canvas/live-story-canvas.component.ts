import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-live-story-canvas',
  imports: [],
  templateUrl: './live-story-canvas.component.html',
  standalone: true,
  styleUrl: './live-story-canvas.component.css'
})
export class LiveStoryCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>|undefined;
  @ViewChild('canvaslogo', { static: false }) canvaslogo: ElementRef<HTMLCanvasElement>|undefined;
  @ViewChild('canvasbg', { static: false }) canvasbg: ElementRef<HTMLCanvasElement>|undefined;
  @ViewChild('canvasoverlay', { static: false }) canvasoverlay: ElementRef<HTMLCanvasElement>|undefined;
  private ctx: CanvasRenderingContext2D|undefined;
  private ctxlogo: CanvasRenderingContext2D|undefined;
  private ctxbg: CanvasRenderingContext2D|undefined;
  private ctxoverlay: CanvasRenderingContext2D|undefined;

  img: HTMLImageElement|undefined;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.canvas) {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.ctx = canvasEl.getContext('2d')!;
    }

    if(this.canvaslogo) {
      const canvasEl: HTMLCanvasElement = this.canvaslogo.nativeElement;
      this.ctxlogo = canvasEl.getContext('2d')!;
    }

    if(this.canvasbg) {
      const canvasEl: HTMLCanvasElement = this.canvasbg.nativeElement;
      this.ctxbg = canvasEl.getContext('2d')!;
    }

    if(this.canvasoverlay) {
      const canvasEl: HTMLCanvasElement = this.canvasoverlay.nativeElement;
      this.ctxoverlay = canvasEl.getContext('2d')!;
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.img = new Image();
        this.img.onload = () => {
          // this.ecc = qrcodegen.QrCode.Ecc.HIGH;
          this.inputChange();
        };
        this.img.src = e.target!.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  inputChange(): void {
    if(this.ctx==null)
      return;
    if(this.ctxlogo==null)
      return;
    if(this.ctxbg==null)
      return;
    if(this.ctxoverlay==null)
      return;
    this.ctx.clearRect(0,0,324,498);
    this.ctx.drawImage(this.img!,0,0,324,498);

    this.ctx.beginPath();
    this.ctx.rect(78,72,168,168);
    this.ctx.fillStyle = "black";
    this.ctx.stroke();

    this.ctxbg.clearRect(0,0,324,498);
    this.ctxbg.drawImage(this.img!,0,0,324,498);

    this.ctxlogo.clearRect(0,0,168,168);
    this.ctxlogo.drawImage(this.img!,-78,-72,324,498);

    this.ctxoverlay.clearRect(0,0,324,498);
    this.ctxoverlay.rect(0,0,324,498);
    this.ctxoverlay.fillStyle = "rgba(128, 128, 128, 0.6)";
    this.ctxoverlay.fill();
    this.ctxoverlay.save();
    this.ctxoverlay.globalCompositeOperation = 'destination-out';
    this.ctxoverlay.beginPath();
    this.ctxoverlay.arc(78+168/2,72+168/2,168/2,0, 2*Math.PI, false);
    this.ctxoverlay.fill();
    this.ctxoverlay.restore();
    // this.ctxoverlay.beginPath();
    // this.ctxoverlay.rect(0,0,324,498);
    // this.ctxoverlay.fillStyle = "rgba(0, 255, 255, 0.3)";
    // this.ctxoverlay.fill();
    //
    // this.ctxoverlay.globalCompositeOperation = 'destination-out'
    //
    // this.ctxoverlay.beginPath();
    // this.ctxoverlay.fillStyle = "rgba(255, 255, 255, 1)";
    // this.ctxoverlay.arc(78,72,168/2,0, 2*Math.PI)
    // this.ctxoverlay.fill();
  }

  download(event: Event) {
    this.downloadLogo(event);
    this.downloadBg(event);
  }

  downloadLogo(event: Event) {
    if(this.ctxlogo) {
      var link = document.createElement('a');
      link.download = 'logo.png';
      link.href = this.ctxlogo.canvas.toDataURL('image/png');
      link.click();
    }
  }

  downloadBg(event: Event) {
    if(this.ctxbg) {
      var link = document.createElement('a');
      link.download = 'background.png';
      link.href = this.ctxbg.canvas.toDataURL('image/png');
      link.click();
    }
  }
}
