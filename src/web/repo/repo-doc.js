/**
 * 仓库相关字段模板字符串
 *
 * @author ChenLittlePing
 * @date 2018.05.02
 */

export default {
  repoOverview: (owner, name) => `
    query {
      repository(owner:"${owner}", name: "${name}") {
        description
        name
        id

        viewerHasStarred
        viewerSubscription

        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
        forks {
          totalCount
        }

        defaultBranchRef {
          name
        }
        refs(first: 100, refPrefix: "refs/heads/") {
          nodes {
            name
          }
        }
      }
    }
  `,

  addStar: (userId, repoId) => `
    mutation {
      addStar(input: {clientMutationId: "${userId}", starrableId: "${repoId}"}) {
        clientMutationId
      }
    }
  `,

  removeStar: (userId, repoId) => `
    mutation {
      removeStar(input: {clientMutationId: "${userId}", starrableId: "${repoId}"}) {
        clientMutationId
      }
    }
  `,

  // viewerSubscription:
  // IGNORED
  // SUBSCRIBED
  // UNSUBSCRIBED
  addWatching: (userId, repoId) => `
    mutation {
      updateSubscription(input: {clientMutationId: "${userId}", subscribableId: "${repoId}", state: SUBSCRIBED}) {
        subscribable {
          viewerSubscription
        }
      }
    }
  `,

  removeWatching: (userId, repoId) => `
    mutation {
      updateSubscription(input: {clientMutationId: "${userId}", subscribableId: "${repoId}", state: UNSUBSCRIBED}) {
        subscribable {
          viewerSubscription
        }
      }
    }
  `
}
