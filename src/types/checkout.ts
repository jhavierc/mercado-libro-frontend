export interface InvoiceData {
  invoice: {
    total: number,
    user_id: number,
    date_created: string,
  },
  invoice_item: [
    {
      book_id: number,
      quantity: number,
      unit_price: number
    }
  ]
}

export interface ICheckoutData {
  shippingData: IShippingData,
  paymentData: IPaymentData
}

export interface IShippingData {
  email: string,
  phoneNumber: string,
  street: string,
  streetNumber: number,
  apartment?: string,
  district?: string,
  city: string,
  province: string,
  dniOrCuil: number,
  shippingType: 'RETIRO_SUCURSAL' | 'ENVIO_DOMICILIO',
  shippingPrice: number
}

export interface IPaymentData {
  paymentMethod: string,
  cardOwner: string,
  cardNumber:string,
  cardExpiryDate: string,
  cardCVV: number,
  documentType: string,
  cardOwnerDocument: number,
  orderNotes?: string
}