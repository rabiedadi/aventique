import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProductsService } from 'src/store/services/products.service';
import { Product } from 'src/models';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>
  constructor(
    private _products: ProductsService
  ) {
    this.products$ = _products.fetchProducts().pipe(map(products => {
      return products.map(p => ({
        ...p, 
        infos: this.getQuantutyInfos(p),
        data: this.getInfoData(p)
      }))
    }))
  }

  ngOnInit(): void {
  }

  productsTracker(i: number, p: Product) {
    return p.title
  }

  getQuantutyInfos(product: Product): string {
    return product.quantite > 10
      ? `${product.quantite} ${product.title}` 
      : `commander des ${product.title}`;
  }

  getInfoData(p: Product): string {
    return `
      ${ p.commentaire ? `Commentaire: ${ p.commentaire } ` : '' }
      ${ p.couleur ? `Couleur: ${ p.couleur } ` : '' }
      ${ p.materiaux ? `materiaux: ${ JSON.stringify(p.materiaux) } ` : '' }`
  }

  command(product: Product) {
    this._products.command(product).pipe(first()).subscribe(_ => {
      alert('success')
    }, error => {
      console.log('something wrong happend');
    })
  }

  cancel(product: Product) {
    this._products.cancel(product).subscribe(_ => {
      alert('success')
    }, error => {
      console.log('something wrong happend');
    })
  }

  revival(product: Product) {
    this.actionDeVerification() 
    && this._products.revival(product).subscribe(_ => {
      alert('success')
    }, error => {
      console.log('something wrong happend');
    })
  }

  actionDeVerification() {
    return true;
  }
}
