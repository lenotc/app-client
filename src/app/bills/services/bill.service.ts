import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../model/bill';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlEndPoint = 'http://localhost:8080/api/bills';

  constructor(private http: HttpClient) {
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filterProduct(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/products/${name}`);
  }

  save(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.urlEndPoint, bill);
  }
}
