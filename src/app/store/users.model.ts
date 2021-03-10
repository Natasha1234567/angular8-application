export interface User {
   "login": string,
   "id": number,
   "node_id": string,
   "avatar_url": string,
   "gravatar_id": string,
   "url": string,
   "html_url": string,
   "followers_url": string,
   "following_url": string,
   "gists_url": string,
   "starred_url": string,
   "subscription_url": string,
   "organisation_url": string,
   "repos_url": string,
   "events_url": string,
   "received_events_url": string,
   "type": string,g,
   "site_admin": false
}

export interface searchedUser {
    id: number,
    name: string,
    type: string
}

export interface Users {
    users: User[],
    searchedUserData: searchedUser
}
