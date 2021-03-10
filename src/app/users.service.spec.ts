import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from './store/users.model';

describe('UsersService', () => {
  let userService: UsersService;
  let httpMock: HttpTestingController

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [UsersService]
  })
  userService = TestBed.get(UsersService);
  httpMock = TestBed.get(HttpTestingController)
  });

  it(`should fetch users as an Observable`, async(inject([HttpTestingController, UsersService],
    (httpClient: HttpTestingController, userService: UsersService) => {

      const users = [
        {
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
        },
      ];


      userService.getAllUsers()
        .subscribe((data: any) => {
          expect(data.length).toBe(2);
        });

      let req = httpMock.expectOne('https://api.github.com/users');
      expect(req.request.method).toBe("GET");

      req.flush(users);
      httpMock.verify();

    })));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it(`should fetch followers as an Observable`, async(inject([HttpTestingController, UsersService],
    (httpClient: HttpTestingController, userService: UsersService) => {

      const followers = [
        {
          login: "tokuda109",
          id: 108762,
          node_id: "MDQ6VXNlcjEwODc2Mg==",
          avatar_url: "https://avatars3.githubusercontent.com/u/108762?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/tokuda109",
          html_url: "https://github.com/tokuda109",
          followers_url: "https://api.github.com/users/tokuda109/followers",
          following_url: "https://api.github.com/users/tokuda109/following{/other_user}",
          gists_url: "https://api.github.com/users/tokuda109/gists{/gist_id}",
          starred_url: "https://api.github.com/users/tokuda109/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/tokuda109/subscriptions",
          organizations_url: "https://api.github.com/users/tokuda109/orgs",
          repos_url: "https://api.github.com/users/tokuda109/repos",
          events_url: "https://api.github.com/users/tokuda109/events{/privacy}",
          received_events_url: "https://api.github.com/users/tokuda109/received_events",
          type: "User",
          site_admin: false
          },
          {
          login: "svallory",
          id: 117560,
          node_id: "MDQ6VXNlcjExNzU2MA==",
          avatar_url: "https://avatars1.githubusercontent.com/u/117560?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/svallory",
          html_url: "https://github.com/svallory",
          followers_url: "https://api.github.com/users/svallory/followers",
          following_url: "https://api.github.com/users/svallory/following{/other_user}",
          gists_url: "https://api.github.com/users/svallory/gists{/gist_id}",
          starred_url: "https://api.github.com/users/svallory/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/svallory/subscriptions",
          organizations_url: "https://api.github.com/users/svallory/orgs",
          repos_url: "https://api.github.com/users/svallory/repos",
          events_url: "https://api.github.com/users/svallory/events{/privacy}",
          received_events_url: "https://api.github.com/users/svallory/received_events",
          type: "User",
          site_admin: false
          }
      ];


      userService.getTotalFollowers('https://api.github.com/users/mojombo/followers')
        .subscribe((data: any) => {
          expect(data.length).toBe(2);
        });

      let req = httpMock.expectOne('https://api.github.com/users/mojombo/followers');
      expect(req.request.method).toBe("GET");

      req.flush(followers);
      httpMock.verify();

    })));

    it(`should fetch repos as an Observable`, async(inject([HttpTestingController, UsersService],
      (httpClient: HttpTestingController, userService: UsersService) => {
  
        const repos = [
          {
            id: 26899533,
            node_id: "MDEwOlJlcG9zaXRvcnkyNjg5OTUzMw==",
            name: "30daysoflaptops.github.io",
            full_name: "mojombo/30daysoflaptops.github.io",
            private: false,
            owner: {
            login: "mojombo",
            id: 1,
            node_id: "MDQ6VXNlcjE=",
            avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/mojombo",
            html_url: "https://github.com/mojombo",
            followers_url: "https://api.github.com/users/mojombo/followers",
            following_url: "https://api.github.com/users/mojombo/following{/other_user}",
            gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
            starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
            subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
            organizations_url: "https://api.github.com/users/mojombo/orgs",
            repos_url: "https://api.github.com/users/mojombo/repos",
            events_url: "https://api.github.com/users/mojombo/events{/privacy}",
            received_events_url: "https://api.github.com/users/mojombo/received_events",
            type: "User",
            site_admin: false }
            },  
            {
              id: 17358646,
              node_id: "MDEwOlJlcG9zaXRvcnkxNzM1ODY0Ng==",
              name: "asteroids",
              full_name: "mojombo/asteroids",
              private: false,
              owner: {
              login: "mojombo",
              id: 1,
              node_id: "MDQ6VXNlcjE=",
              avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/mojombo",
              html_url: "https://github.com/mojombo",
              followers_url: "https://api.github.com/users/mojombo/followers",
              following_url: "https://api.github.com/users/mojombo/following{/other_user}",
              gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
              starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
              subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
              organizations_url: "https://api.github.com/users/mojombo/orgs",
              repos_url: "https://api.github.com/users/mojombo/repos",
              events_url: "https://api.github.com/users/mojombo/events{/privacy}",
              received_events_url: "https://api.github.com/users/mojombo/received_events",
              type: "User",
              site_admin: false
              } }
        ];
  
  
        userService.getTotalRepos('https://api.github.com/users/mojombo/repos')
          .subscribe((data: any) => {
            expect(data.length).toBe(2);
          });
  
        let req = httpMock.expectOne('https://api.github.com/users/mojombo/repos');
        expect(req.request.method).toBe("GET");
  
        req.flush(repos);
        httpMock.verify();
  
      })));
  

});
