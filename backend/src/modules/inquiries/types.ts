export type InquiryRequestStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'quote_accepted'
  | 'completed'
  | 'misdial'
  | 'closed'

export interface InquiryRequestDto {
  id: string
  referenceCode: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: InquiryRequestStatus
  createdAt: string
  updatedAt: string
}

export interface InquiryRequestCreateInput {
  referenceCode: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
