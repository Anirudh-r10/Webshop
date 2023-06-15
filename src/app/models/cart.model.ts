export interface Cart{

    items: Array<CartItem>;
}

export interface CartItem{
    product:string;
    name:String;
    price:number;
    quantity:number;
    id:number;
}