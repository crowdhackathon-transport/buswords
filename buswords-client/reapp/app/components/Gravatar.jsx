var _exports = {};

function GitHubGravatarURL (GitHubUserId, size) {
  size = (typeof size == 'undefined') ? 32 : +size;

  var url = 'https://avatars3.githubusercontent.com/u/' + GitHubUserId + '?v=3&s=' + size;

  return url;
}

_exports.GitHubGravatarURL = GitHubGravatarURL;

export default GitHubGravatarURL;
