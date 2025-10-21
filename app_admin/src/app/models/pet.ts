export interface Pet {
  // internal primary key in MongoDB
  _id: string,
  code: string,
  name: string,
  petType: string,
  petAge: Number,
  amountDays: Number,
  amountDue: Number,
  image: string
}
