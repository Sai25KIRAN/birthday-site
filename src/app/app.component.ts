// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'birthday';
// }


import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  name = '';

  showGallery = false;
  showMessage = false;
  showConfetti = false;
  showModal = false;

  sPhotos = [
    'assets/sai/photo (1).jpg',
    'assets/sai/photo (2).jpg',
    'assets/sai/photo (3).jpg',
    'assets/sai/photo (4).jpg',
    'assets/sai/photo (5).jpg'
  ];

  

  photos: string[] = [];

  pphotos = [
    'assets/pandu/photo (1).jpg',
    'assets/pandu/photo (2).jpg',
    'assets/pandu/photo (3).jpg'
    ,
    'assets/pandu/photo (4).jpg'
    ,
    'assets/pandu/photo (5).jpg'
        ,
    'assets/pandu/photo (6).jpg'    ,
    'assets/pandu/photo (7).jpg'    ,
    'assets/pandu/photo (8).jpg'    ,
    'assets/pandu/photo (9).jpg'    ,
    'assets/pandu/photo (10).jpg'
  ];

  currentPhotoIndex = 0;
  slideshowInterval: any;

  fireworkArray = Array(8);

  ngOnInit() {}

  ngOnDestroy() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  startSurprise() {
    if (!this.name.trim()) {
      this.showModal = true;
      return;
    }

    this.photos = this.getPhotosForName();

    this.showGallery = true;
    this.showMessage = true;
    this.showConfetti = true;
    this.startSlideshow();
    
    // Play the birthday song
    if (this.audioPlayer) {
      const audio = this.audioPlayer.nativeElement;
      audio.play();
      
      // Stop animations when the song ends
      audio.onended = () => {
        if (this.slideshowInterval) {
          clearInterval(this.slideshowInterval);
        }
        this.showConfetti = false;
      };
    }
  }

  startSlideshow() {
    this.slideshowInterval = setInterval(() => {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    }, 6000); // Change every 6 seconds
  }

  getPhotosForName(): string[] {
    const lowerName = this.name.toLowerCase();
    if (lowerName.includes('sai')) {
      return this.sPhotos;
    } else if (lowerName.includes('pandu')) {
      return this.pphotos ;
    } else {
      return this.sPhotos; // default
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
