import { Photo } from './photo.model';

export interface Product {
  shippingCountryISOCode: string,
  category: string,
  brand: string,
  model: string,
  condition: string,
  details: string,
  bagDTO: BagDTO,
  shoesDTO: ShoesDTO,
  photos: Photo[]
  blemishPhotos: Photo[]
}

export interface BagDTO {
  size: string,
  extras: string[],
}


export interface ShoesDTO {
  size: number,
}
