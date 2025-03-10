import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {
  private baseUrl = 'http://localhost:5240/StockInventory';
  private loginUrl = 'http://localhost:5240';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getTokenHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/LoginPage`, loginData);
  }
  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/Registration`, registerData);
  }
  getAllProducts(): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/ListOfProducts`, { headers });
  }

  createProduct(productData: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.post<any>(`${this.baseUrl}/ProductCreation`, productData, { headers });
  }
  getProductById(productId: number): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/ProductById?productId=${productId}`, { headers });
  }

  updateProduct(productId: number, productDetails: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.put<any>(`${this.baseUrl}/UpdateProduct/${productId}`, productDetails, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.delete<any>(`${this.baseUrl}/ProductDeletion/${productId}`, { headers });
  }

  getAllPurchases(): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/ListOfPurchases`, { headers });
  }
  createPurchase(purchaseData: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.post<any>(`${this.baseUrl}/PurchaseCreation`, purchaseData, { headers });
  }

  getPurchaseById(purchaseId: number): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/PurchaseById?purchaseId=${purchaseId}`, { headers });
  }

  updatePurchase(purchaseId: number, purchaseDetails: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.put<any>(`${this.baseUrl}/UpdatePurchase/${purchaseId}`, purchaseDetails, { headers });
  }

  getAllSales(): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/ListOfSale`, { headers });
  }

  createSale(saleData: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.post<any>(`${this.baseUrl}/SaleCreation`, saleData, { headers });
  }
  getSaleById(saleId: number): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/SaleById?saleId=${saleId}`, { headers });
  }

  updateSale(saleId: number, saleDetails: any): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.put<any>(`${this.baseUrl}/UpdateSale/${saleId}`, saleDetails, { headers });
  }
  checkStock(productId: number): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.post<any>(`${this.baseUrl}/CheckingStock`, productId, { headers });
  }

  getAllStock(): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.get<any>(`${this.baseUrl}/ListOfStock`, { headers });
  }
}
