import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/constant/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _apiUrl: string;

  constructor(private http: HttpClient) {
    this._apiUrl = environment.API_BASE_PATH;
  }

  post<T>(url: string, data: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this._apiUrl + url, data);
  }

  delete<T>(url: string, query?: any): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(this._apiUrl + url, {
      params: query,
    });
  }

  patch<T>(url: string, data: any, option?: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(this._apiUrl + url, data, {
      params: option,
    });
  }

  get<T>(url: string, httpParams?: any): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this._apiUrl + url, {
      params: httpParams,
    });
  }
}
