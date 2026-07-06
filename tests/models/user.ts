import { Address } from "./address"
export type Gender = 'male' | 'female'

export interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    address: Address
    gender: Gender
}