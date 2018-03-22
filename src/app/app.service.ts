import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable()
export class AppService {

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http:Http) { }

  getPeopleData(){
    return this.http.get("http://localhost:3000/People").map(r=>r.json());  
  }

  getContentData(){
    return this.http.get("http://localhost:3000/Content").map(r=>r.json());
  }

}
