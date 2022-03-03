export interface TradeInRequestDTO {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  shippingCountryISOCode: string,
  products: ProductsDTO[]
}

export interface ProductsDTO {
  category: string,
  brand: string,
  model: string,
  condition: string,
  details: string,
  photosFolderURL: string,
  bagDTO: {
    size: string,
    extras: string[]
  },
  shoesDTO: {
    size: number
  }
}
