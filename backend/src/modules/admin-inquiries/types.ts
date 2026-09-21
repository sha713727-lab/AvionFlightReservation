export type AdminInquiryStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'quote_accepted'
  | 'completed'
  | 'misdial'
  | 'closed'

export type AdminInquiryDto = {
  id: string
  referenceCode: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: AdminInquiryStatus
  createdAt: string
  updatedAt: string
}

export type AdminInquiryListResult = {
  items: AdminInquiryDto[]
}
