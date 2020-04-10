import { Component, OnInit } from '@angular/core'
import { IProduct } from './product'
import { ProductService } from './product.service'

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductList implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products
    }

    filteredProducts: IProduct[];
    products: IProduct[] = []

    constructor(private productService: ProductService) {}

    performFilter(value: string): IProduct[] {
        return this.products.filter(product => product.productName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1)
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.products = this.productService.getProducts()
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
}