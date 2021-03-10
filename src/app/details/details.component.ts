import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/user.state';
import { MatTableDataSource } from '@angular/material';
import { UsersService } from './../users.service';
import { EUserActions } from '../store/users.actions';
import { Users } from '../store/users.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number;
  users: any;
  displayedColumns: string[] = ['name', 'followers', 'repos'];
  dataSource: MatTableDataSource<any> | null;
  dataLength: number;
  userDetails: any = {
    "name": "",
    "followers": 0,
    "repos": 0
  }
  totalFollowers = 0;
  totalRepos = 0;
  isLoading = false;
  searchedUserData: any
 
  constructor(private route: ActivatedRoute, private store : Store< {user: UserState}>, private userService: UsersService) {
    this.isLoading = true;
    this.store.pipe(select('user')).subscribe(data => {
      this.users = data.users;
    })
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = params["id"];
    })
    if(this.users.users.length > 0 && this.id !== undefined) {
      this.getUsersDetails();
    }
    
  }

  getUsersDetails() {
     if(this.users.users !== undefined && this.users.users.length > 0) {
       this.id = Math.floor(this.id);
       this.users.users.forEach(element => {
          if(element.id === this.id) {
            this.userDetails.name = element.login;
            this.getNoOfFollowers(element.followers_url);
            this.getNoOfRepos(element.repos_url);
            this.getUserProfile(element.avatar_url);
            this.searchedUserData = element;
          }
       });
       if(this.userDetails.name !== '') {
        this.store.dispatch({
          "type": EUserActions.GetSelectedUserSuccess,
          payload: <Users>{
            searchedUserData: this.searchedUserData
          }
         })
       }   
     } else {
       this.isLoading = false;
     }
     
  }

  getNoOfFollowers(url: string): void {
     this.userService.getTotalFollowers(url).subscribe((data : any[])=> {
       this.totalFollowers = data.length
       this.updateTotalFollowers();
     }); 
  }

  updateTotalFollowers(): void {
     this.userDetails.followers = this.totalFollowers;
  }

  getNoOfRepos(url : string) {
      this.userService.getTotalRepos(url).subscribe((data : any[])=> {
        this.totalRepos = data.length
        this.updateTotalRepos();
      });
  }

  updateTotalRepos(): void {
    this.userDetails.repos = this.totalRepos;
  }
  
  getUserProfile(url: string) {
     this.userDetails.profilePic = url;
     this.isLoading = false;
    }

}
