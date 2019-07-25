import {Injectable} from '@angular/core';
import {Client} from './client';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Region} from './region';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.url}/regions`);
  }

  // getClients(): Observable<Client[]> {
  //   return this.http.get<Client[]>(this.url);
  // }

  getClients(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${page}`);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {

        if (e.status != 401 && e.error.message) {

          this.router.navigate(['/clients']);
          console.log(e.error.message);
        }

        return throwError(e);
      })
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.message) {
          console.log(e.error.message);
        }

        console.error(e.error.message);
        return throwError(e);
      })
    );
  }


  updated(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client.id}`, client).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {

        if (e.status === 400) {
          throwError(e);
        }

        this.router.navigate(['/clients']);
        if (e.error.message) {
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.url}/${id}`).pipe(
      catchError(e => {

        this.router.navigate(['/clients']);
        if (e.error.message) {
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }


  uploadImg(file: File, id): Observable<HttpEvent<{}>> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
