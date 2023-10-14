import { Shell } from "@/shared/components/shells/shell"

function AccountPageHeader() {
  return (
    <header className="w-full border-b border-border">
      <Shell as="div">
        <div className="relative flex flex-1 flex-col">
          <div className="my-10">
            <h1 className="text-3xl/10 font-medium">Настройки Аккаунта</h1>
          </div>
        </div>
      </Shell>
    </header>
  )
}

export default AccountPageHeader
