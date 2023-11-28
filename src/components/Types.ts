
export interface Color {
    id: string,
    colorName: string
    red: number
    green: number
    blue: number
}

export interface Product {
    id: string
    productName: string
    description: string
    price: number
    image: string
    stock: Stock
    colors: Color[]
}

export interface Stock {
    quantity: number
}

