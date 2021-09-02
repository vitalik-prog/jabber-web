enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESET_PASSWORD = '/reset-password',
  PODCASTS = '/podcasts',
  PODCASTS_$ID = '/podcasts/:id',
  PODCASTS_EDIT = '/podcasts/edit',
  PODCASTS_EDIT_$ID = '/podcasts/edit/:id?',
  PODCASTS_$ID_EPISODES_EDIT = '/podcasts/:podcastId/episodes/edit',
  PODCASTS_$ID_EPISODES_EDIT_$ID = '/podcasts/:podcastId/episodes/edit/:id?',
  PODCASTS_INVITE = '/podcasts/invite',
  PODCASTS_INVITE_$CODE = '/podcasts/invite/:code',
  EPISODES_$ID_LIVE = '/episodes/:id/live',
  LIVE = '/live',
  EPISODES = '/episodes',
  EPISODES_$ID = '/episodes/:id',
  EPISODES_EDIT = '/episodes/edit',
  EPISODES_EDIT_$ID = '/episodes/edit/:id?',
  USERS = '/users',
  USERS_$ID = '/users/:id',
  USERS_EDIT = '/users/edit',
  USERS_EDIT_$ID = '/users/edit/:id',
  NOTIFICATIONS = '/notifications',
  USERS_$ID_FOLLOWERS = '/users/:id/followers',
  FOLLOWERS = '/followers',
  PLAYLISTS = '/playlists',
  PLAYLISTS_EDIT_$ID = '/playlists/edit/:id?',
  ANY = '*',
}

export { AppRoute };
