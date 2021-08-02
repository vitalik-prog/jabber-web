enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCAST = '/podcast',
  PODCAST_$ID = '/podcasts/:id',
  PODCAST_EDIT = '/podcasts/edit',
  PODCAST_EDIT_$ID = '/podcasts/edit/:id?',
  PODCAST_$ID_EPISODE_$ID  = '/podcasts/:podcastId/episode/:episodeId',
  EPISODE_CREATE = '/podcasts/:podcastId/episode/create',
  ANY = '*',
}

export { AppRoute };
