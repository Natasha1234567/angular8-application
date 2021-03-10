import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any = [];
  result: any;
  followers: any;
  repos: any;

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get('https://api.github.com/users').pipe(map(result => this.users = result));
  }

  getTotalFollowers(url: any) {
      return this.http.get(url).pipe(map(res => this.followers = res))
  }

  getTotalRepos(url: any) {
    return this.http.get(url).pipe(map(res => this.repos = res))
  }
}
