/**
 * 搜素关键字段模板字符串
 *
 * @author ChenLittlePing
 * @date 2018.04.25
 */

export default {
  searchRepos: (query, after) => `
    query {
      search(query: "${query}", type: REPOSITORY, first: 15 ${after ? `, after: "${after}"` : ''}) {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Repository {
            id
            name
            description
            pushedAt
            viewerHasStarred
            forkCount
            owner {
              login
            }
            stargazers {
              totalCount
            }
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
            languages(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `,
  searchIssue: (query, after) => `
    query {
      search(query: "${query}", type: ISSUE, first: 15${after ? `, after: "${after}"` : ''}) {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Issue {
            id
            pushedAt
          }
        }
      }
    }
  `,
  searchUsers: (query, after) => `
    query {
      search(query: "${query}", type: USER, first: 15${after ? `, after: "${after}"` : ''}) {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          __typename
          ... on User {
            id
            login
            name
            location
            avatarUrl
            bio
          }
        }
      }
    }
  `,
  queryStargazers: ({ owner, name, before }) => `
    query {
      repository(owner:"${owner}", name: "${name}") {
        stargazers(last: 100${before ? `, after: "${before}"` : ''}) {
          totalCount
          pageInfo {
            startCursor
            hasPreviousPage
          }
          edges {
            starredAt
          }
        }
      }
    }
  `,
}
