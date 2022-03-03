import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Photo } from './../../models/photo.model';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  @Input()
  photoName!: string;

  @Input()
  photoTag!: string;

  @Input()
  photo!: Photo;

  @Input()
  url!: string;

  @Input()
  blemishPhoto !: boolean;

  @Output() emitAddImage = new EventEmitter<Photo>();

  constructor() {
  }

  ngOnInit(): void {
  }

  processFile(file: any): void {
    const newFile: File = file.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photo.file = newFile;
      this.photo.tag = this.photoTag;
      this.photo.url = event.target.result;
      this.url = event.target.result;
      this.addImage(this.photo);
      this.resetImage();
      this.url = '';
    });

    reader.readAsDataURL(newFile);
  }

  addImage(photo: Photo) {
    this.emitAddImage.emit(photo);
  }

  resetImage() {
    this.photo = {
      tag: '',
      name: '',
      url: '',
      file: null
    };
  }

}
