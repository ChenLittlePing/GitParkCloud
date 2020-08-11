/**
 * TrendingFetcher
 * 工具类：用于将github trending html 转换成 TrendingRepoModel
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @flow
 */

import TrendingRepoModel from './repo';
import StringUtil from '../string-util';

export default class TrendingFetcher {
    static htmlToRepo(responseData) {
        responseData = responseData.substring(responseData.indexOf('<li class="repo-list-item'), responseData.indexOf('</ol>')).replace(/\n/, '');
        var repos = [];
        var splitWithH3 = responseData.split('<h3');
        splitWithH3.shift();
        for (var i = 0; i < splitWithH3.length; i++) {
            var repo = new TrendingRepoModel();
            var html = splitWithH3[i];

            this.parseRepoBaseInfo(repo, html);

            var metaNoteContent = this.parseContentOfNode(html, 'f6 text-gray mt-2');
            this.parseStars(repo, metaNoteContent);
            this.parseForks(repo, metaNoteContent);
            this.parseRepoContributors(repo, metaNoteContent);
            repos.push(repo);
        }
        return repos;
    }

    static parseContentOfNode(htmlStr, classFlag) {
        var noteEnd = htmlStr.indexOf(' class="' + classFlag);
        var noteStart = htmlStr.lastIndexOf('<', noteEnd) + 1;
        var note = htmlStr.substring(noteStart, noteEnd);

        var sliceStart = htmlStr.indexOf(classFlag) + classFlag.length + 2;
        var sliceEnd = htmlStr.indexOf('</' + note + '>', sliceStart);
        var content = htmlStr.substring(sliceStart, sliceEnd);
        return StringUtil.trim(content);
    }

    static parseRepoBaseInfo(repo, htmlBaseInfo) {
        var urlIndex = htmlBaseInfo.indexOf('<a href="') + '<a href="'.length;
        var url = htmlBaseInfo.slice(urlIndex, htmlBaseInfo.indexOf('">', urlIndex));
        repo.url = url;
        repo.fullName = url.slice(1, url.length);
        repo.owner.login = repo.fullName.split('/')[0]
        repo.name = repo.fullName.split('/')[1]

        var description = this.parseContentOfNode(htmlBaseInfo, 'col-9 d-inline-block text-gray m-0 pr-4');//'repo-list-description'
        var index = description.indexOf('</g-emoji>');
        if (index !== -1) {
            var indexEmoji = description.indexOf('</g-emoji>');
            var emoji = description.substring(description.indexOf('>') + 1, indexEmoji)
            description = emoji + description.substring(indexEmoji + '</g-emoji>'.length);
        }
        repo.description = description;
    }

    static parseForks(repo, htmlMeta) {
      var flag = `muted-link d-inline-block mr-3" href="${repo.url}/network"`;
      var forksInfo = this.parseContentOfNode(htmlMeta, flag);
      var forks = forksInfo.substring(forksInfo.indexOf('</svg>') + 6).replace('/\s/g', '')
      repo.forkCount = StringUtil.trim(forks)
    }

    static parseStars(repo, htmlMeta) {
      var flag = `muted-link d-inline-block mr-3" href="${repo.url}/stargazers"`;
      var startsInfo = this.parseContentOfNode(htmlMeta, flag);
      var stars = startsInfo.substring(startsInfo.indexOf('</svg>') + 6).replace('/\s/g', '')
      repo.stargazers.totalCount = StringUtil.trim(stars)
    }

    static parseRepoContributors(repo, htmlContributors) {
        var splitWitSemicolon = htmlContributors.split('"');
        repo.contributorsUrl = splitWitSemicolon[1];
        var contributors = [];
        for (var i = 0; i < splitWitSemicolon.length; i++) {
            var url = splitWitSemicolon[i];
            if (url.search('http') !== -1) {
                contributors.push(url);
            }
        }
        repo.contributors = contributors;
    }
}
