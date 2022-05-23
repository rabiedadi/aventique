import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "src/models";
import { products } from "src/mock/products";
@Injectable({
    providedIn: "root",
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    fetchProducts(): Observable<Product[]> {
        // return this.http.get<Product[]>("https://api-privee/info");
        return of(products)
    }

    command(product: Product) {
        return this.http.post("https://api-privee/envoyer-commande", product);
    }

    cancel(product: Product) {
        return this.http.post("https://api-privee/cancel-commande", product);
    }

    revival(product: Product) {
        return this.http.post("https://api-privee/relance", product);
    }
}