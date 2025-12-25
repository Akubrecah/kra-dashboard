export interface ApiParameter {
  name: string;
  type: 'string' | 'number' | 'date';
  required: boolean;
  label: string;
}

export interface ApiDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  method: 'GET' | 'POST';
  endpoint: string;
  parameters: ApiParameter[];
  documentationUrl?: string;
}

export const API_CATALOG: ApiDefinition[] = [
  // Checkers
  {
    id: 'pin-checker',
    name: 'PIN Checker',
    category: 'Checkers',
    description: 'Validate a KRA PIN and retrieve basic details.',
    method: 'POST',
    endpoint: '/checker/v1/pinbypin',
    parameters: [
      { name: 'pin', type: 'string', required: true, label: 'KRA PIN' }
    ]
  },
  {
    id: 'tcc-checker',
    name: 'Tax Compliance Certificate Checker',
    category: 'Checkers',
    description: 'Verify the validity of a Tax Compliance Certificate (TCC).',
    method: 'POST',
    endpoint: '/checker/v1/tcc',
    parameters: [
      { name: 'certificateNumber', type: 'string', required: true, label: 'Certificate Number' }
    ]
  },
  {
    id: 'nill-return',
    name: 'File NIL Return',
    category: 'Tax Returns',
    description: 'File a NIL return for a specific tax obligation.',
    method: 'POST',
    endpoint: '/returns/v1/nil',
    parameters: [
      { name: 'pin', type: 'string', required: true, label: 'KRA PIN' },
      { name: 'obligation', type: 'string', required: true, label: 'Tax Obligation ID' },
      { name: 'returnPeriodFrom', type: 'date', required: true, label: 'Return Period From' },
      { name: 'returnPeriodTo', type: 'date', required: true, label: 'Return Period To' }
    ]
  },
  {
    id: 'vat-withholding',
    name: 'VAT Withholding PRN',
    category: 'Payments',
    description: 'Generate a Payment Registration Number (PRN) for VAT Withholding.',
    method: 'POST',
    endpoint: '/generate/v1/prn/whtvat',
    parameters: [
      { name: 'pin', type: 'string', required: true, label: 'Withholder PIN' },
      { name: 'payeePin', type: 'string', required: true, label: 'Payee PIN' },
      { name: 'invoiceDate', type: 'date', required: true, label: 'Invoice Date' },
      { name: 'invoiceAmount', type: 'number', required: true, label: 'Invoice Amount' }
    ]
  },
  {
    id: 'fetch-obligations',
    name: 'Fetch Taxpayer Obligations',
    category: 'Checkers',
    description: 'Retrieve registered tax obligations for a taxpayer.',
    method: 'POST',
    endpoint: '/dtd/checker/v1/obligation',
    parameters: [
      { name: 'pin', type: 'string', required: true, label: 'KRA PIN' }
    ]
  },
  {
    id: 'customs-status',
    name: 'Customs Declaration Status',
    category: 'Customs',
    description: 'Check the status of a customs declaration.',
    method: 'POST',
    endpoint: '/customs/v1/status',
    parameters: [
      { name: 'entryNumber', type: 'string', required: true, label: 'Entry Number' }
    ]
  }
];
