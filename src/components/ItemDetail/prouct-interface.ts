export interface Product{
    id:string;
    img: string;
    images?: image[];
    description: string;
    price: number;
    productName:string;
    name: string;


}
interface image{
    id:string;
    url: string;
}