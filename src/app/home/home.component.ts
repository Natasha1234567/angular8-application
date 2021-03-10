import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Users } from '../store/users.model';
import { EUserActions } from '../store/users.actions';
import { UserState } from './../store/user.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  search: string = "";
  searchedResult: any = [];
  displayedColumns: string[] = ['id', 'name', 'type'];
  dataSource: MatTableDataSource<any> | null
  storeData : any;
  message: string = "";

  constructor(private usersService: UsersService, private router: Router, private store: Store<{user : UserState}>) {
    this.store.pipe(select('user')).subscribe(data => {
      this.storeData = data;
    })
  }

  ngOnInit(): void {
        if(this.storeData === undefined) {
          this.getAllUsersData();
        } else {
          if(this.storeData.searchedUserData.searchedUserData !== undefined) {
            this.dataSource = new MatTableDataSource([this.storeData.searchedUserData.searchedUserData])
            this.search = this.storeData.searchedUserData.searchedUserData.login
          } else {
             this.getAllUsersData(); 
          }
        }
      }

  getSearchValue(event: any) {
    this.search = (event.target as HTMLInputElement).value;
    if (this.search !== "") {
      this.getSearchResults()
    } else {
      this.getAllUsersData();
    }
  }

  getSearchResults(): void {
    let selectedUserData: any = {};
    let count = 0;
    this.users.forEach(element => {
      if (element.login === this.search) {
        this.dataSource.filter = this.search.trim().toLowerCase();
        selectedUserData = element
      } else {
        count = count + 1;
      }
    });
    if(this.users.length === count) {
        this.message = "No such user present";
        this.dataSource = new MatTableDataSource([]);
    }
    this.store.dispatch({
      "type": EUserActions.GetSelectedUserSuccess,
      payload: <Users>{
        searchedUserData: selectedUserData
      }
    })
  }

  getAllUsersData(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.users = data;
      if (this.users.length > 0) {
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.data = this.users;
        this.message = ""
        this.store.dispatch({
          "type": EUserActions.GetUsersSuccess,
          payload: <Users>{
            users: this.users
          }
        })
      }
    });
  }

}
