import React from "react"

import UpdateNotificationPreferencesForm from "@/features/forms/account/update-notification-preferences-form"

function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Мои Уведомления</h1>
        <p className="text-sm text-muted-foreground">
          Управляйте настройками личных уведомлений
        </p>
      </div>
      <div className="rounded border">
        <div className="border-b bg-muted/50 px-4 py-3">
          <p className="text-xl font-semibold">Сайт</p>
        </div>
        <div className="p-4">
          <UpdateNotificationPreferencesForm type="web" />
        </div>
      </div>
      <div className="rounded border">
        <div className="border-b bg-muted/50 px-4 py-3">
          <p className="text-xl font-semibold">Почта</p>
        </div>
        <div className="p-4">
          <UpdateNotificationPreferencesForm type="email" />
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
