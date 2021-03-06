enum ErrorMessage {
  NOT_FOUND = 'Entity not found.',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_NOT_FOUND = 'User not found',
  WRONG_PASSWORD = 'Wrong password',
  UNAUTHORIZED_TOKEN = 'No token provided',
  BAD_TOKEN = 'Token is invalid',
  EMAIL_IS_ALREADY_TAKEN = 'Email is already taken',
  PODCAST_NOT_FOUND = 'Podcast not found',
  EPISODE_NOT_FOUND = 'Episode not found',
  COMMENT_NOT_FOUND = 'Comment not found',
  PLAYLIST_NOT_FOUND = 'Playlist not found',
  NOT_YOURS_PODCAST = 'This podcast not yours',
  NOT_YOURS_EPISODE = 'This episode not yours',
  NOT_YOURS_COMMENT = 'This comment not yours',
  NOT_YOURS_PLAYLIST = 'This playlist not yours',
  NO_PERMISSION_TO_EDIT_USER = 'You do not have permission to edit',
  ALREADY_FOLLOWING = 'Already following',
  THIS_IS_A_PRIVATE_PODCAST = 'This is a private podcast',
  THIS_IS_A_PRIVATE_EPISODE = 'This is a private episode',
  EMAIL_DOES_NOT_EXIST = 'Email does not exist',
  EMAIL_SENDING_ERROR = 'Email sending error',
  ALREADY_IN_FAVOURITES = 'Already in favourites',
  INVITATION_CODE_DOES_NOT_EXIST = 'Invitation code does not exist',
  ALREADY_IN_PLAYLIST = 'Already in playlist',
  THIS_IS_A_PRIVATE_PLAYLIST = 'This is a private playlist',
}

export { ErrorMessage };
