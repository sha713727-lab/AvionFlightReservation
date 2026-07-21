import AvionLogo from '@/components/brand/AvionLogo'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { BRAND_NAME } from '@/constants/brand'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminLoginForm from '@/modules/admin/components/AdminLoginForm'
import AdminLoginSessionRedirect from '@/modules/admin/components/AdminLoginSessionRedirect'

export default function AdminLoginPage() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-dvh items-center justify-center bg-background px-4 py-12 sm:px-6"
    >
      <AdminLoginSessionRedirect />
      <section className="relative z-10 w-full max-w-3xl">
        <div className="mb-2 flex justify-center">
          <AvionLogo size="lg" tone="light" hideName />
        </div>

        <LayeredSectionHeading
          titleId="admin-login-heading"
          watermark={BRAND_NAME}
          title={ADMIN_COPY.headline}
          description={ADMIN_COPY.description}
          className="mb-10 lg:mb-12"
        />

        <div className="mx-auto max-w-md">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  )
}
