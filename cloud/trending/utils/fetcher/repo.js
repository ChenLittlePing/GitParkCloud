
class TrendingRepoModel {
  constructor() {
    this.fullName = null;
    this.url = null;
    this.description = null;
    this.language = null;
    this.contributors = null;
    this.contributorsUrl = null;
    this.forkCount = null;
    this.stargazers = {'totalCount':null};
    this.owner = {'login': null};
  }
}

module.exports = TrendingRepoModel