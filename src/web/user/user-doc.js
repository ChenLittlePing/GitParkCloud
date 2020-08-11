/**
 * 搜素关键字段模板字符串
 *
 * @author ChenLittlePing
 * @date 2018.04.25
 */

export default {

  login: () => `
    query {
      viewer {
        login
        url
        id
      }
    }
  `,

  userInfo: (login, after) => `
    query {
      user(login: "${login}") {
        id
        name
        login
        avatarUrl
        bio
        location

        starredRepositories {
          totalCount
        }

        followers {
          totalCount
        }

        following {
          totalCount
        }

        repositories(first: 15 ${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          nodes {
            id
            name
            description
            pushedAt
            viewerHasStarred
            forkCount
            stargazers {
              totalCount
            }
            owner {
              login
            }
            refs(first: 10, refPrefix: "refs/heads/") {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `,

  orgInfo: (login, after) => `
    query {
      organization(login: "${login}") {
        id
        login
        name
        avatarUrl
        email
        location

        members {
          totalCount
        }

        repositories(first: 15 ${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          nodes {
            id
            name
            description
            pushedAt
            viewerHasStarred
            forkCount
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `,

  staredRepos: (login, after) => `
    query {
      user(login: "${login}") {
        starredRepositories(first: 15, orderBy: {field: STARRED_AT, direction:DESC} ${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          nodes {
            id
            name
            description
            pushedAt
            viewerHasStarred
            forkCount
            stargazers {
              totalCount
            }
            owner {
              login
            }
            refs(first: 10, refPrefix: "refs/heads/") {
              nodes {
                name
              }
            }
          }
        }
      }
    }
    `,

  followers: (login, after) => `
    query {
      user(login: "${login}") {
        followers(first: 15 ${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          nodes {
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

  following: (login, after) => `
    query {
      user(login: "${login}") {
        following(first: 15 ${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          nodes {
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

  followUser: (userId, followId) => `
    mutation {
      followUser(input: {clientMutationId: "${userId}", userId: ${followId}}) {
        clientMutationId
      }
    }
  `,

  unfollowUser: (userId, followId) => `
    mutation {
      unfollowUser(input: {clientMutationId: "${userId}", userId: ${followId}}) {
        clientMutationId
      }
    }
  `
}
