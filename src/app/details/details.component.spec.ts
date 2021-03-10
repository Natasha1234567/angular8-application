import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, select, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService} from '../users.service';
import { UserState } from '../store/user.state';
import { of } from 'rxjs';

class StoreMock {
  users = [{
    "login": "mojombo",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/mojombo",
    "html_url": "https://github.com/mojombo",
    "followers_url": "https://api.github.com/users/mojombo/followers",
    "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
    "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
    "organizations_url": "https://api.github.com/users/mojombo/orgs",
    "repos_url": "https://api.github.com/users/mojombo/repos",
    "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
    "received_events_url": "https://api.github.com/users/mojombo/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "defunkt",
    "id": 2,
    "node_id": "MDQ6VXNlcjI=",
    "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/defunkt",
    "html_url": "https://github.com/defunkt",
    "followers_url": "https://api.github.com/users/defunkt/followers",
    "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
    "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
    "organizations_url": "https://api.github.com/users/defunkt/orgs",
    "repos_url": "https://api.github.com/users/defunkt/repos",
    "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
    "received_events_url": "https://api.github.com/users/defunkt/received_events",
    "type": "User",
    "site_admin": false
  }] 
  select =  jasmine.createSpy().and.returnValue(of(this.users)); 
  dispatch = jasmine.createSpy();
}


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: Store<UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports : [RouterTestingModule.withRoutes([]), StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [{provide: UsersService, useValue: jasmine.createSpyObj('UsersService', ['getTotalFollowers'])}, {
        provide: Store,
        useClass: StoreMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
   });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialize some data`, async(() => {
    const data = {
      "name" : "",
      "followers": 0,
      "repos": 0
    }
    const totalFollowers = 0;
    const totalRepos = 0;
    const isLoading = true;

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.userDetails).toEqual(data);
    expect(component.totalFollowers).toEqual(totalFollowers);
    expect(component.isLoading).toEqual(isLoading);
    expect(component.totalRepos).toEqual(totalRepos);
  }));

  it('call getUserDetails', ()=>{
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.debugElement.componentInstance;
    spyOn(component, 'getUsersDetails');

    component.getUsersDetails();

    expect(component.userDetails).toEqual({
      "name": "",
      "followers": 0,
      "repos": 0
    }); 
  })
});
