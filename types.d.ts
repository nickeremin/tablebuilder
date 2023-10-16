interface UserPublicMetadata {
  notificationPreferences: {
    web: {
      tableFailures: boolean
      newUpdates: boolean
      subscriptionExpiration: boolean
      teamTableChanges: boolean
      teamJoinRequests: boolean
      warnings: boolean
    }
    email: {
      tableFailures: boolean
      newUpdates: boolean
      subscriptionExpiration: boolean
      teamTableChanges: boolean
      teamJoinRequests: boolean
      warnings: boolean
    }
  }
}
