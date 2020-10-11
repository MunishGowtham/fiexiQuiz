import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private httpProvider: HttpClient) {
    }
    getTableData(params): Observable<any> {
        let url = `http://jsonplaceholder.typicode.com/photos?_start=${params.pageStartIndex}&_limit=${params.pageSize}`
        return this.httpProvider.get(url);
    }

}
