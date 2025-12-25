export interface ApiParameter {
  name: string;
  type: 'string' | 'number' | 'date';
  required: boolean;
  label: string;
  placeholder?: string;
  pattern?: string;
  description?: string;
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
      { 
        name: 'pin', 
        type: 'string', 
        required: true, 
        label: 'KRA PIN', 
        placeholder: 'A000000000Z', 
        pattern: '^[A-Z]\\d{9}[A-Z]$',
        description: 'The 11-digit alphanumeric KRA PIN.'
      }
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
      { name: 'certificateNumber', type: 'string', required: true, label: 'Certificate Number', placeholder: 'KRA/TCC/...' }
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
  },
  // Safaricom - M-PESA Express (STK Push)
  {
    id: 'mpesa-express',
    name: 'M-PESA Express (STK Push)',
    category: 'M-PESA',
    description: 'Initiate an online payment request to a customer\'s phone (Lipa Na M-Pesa Online).',
    method: 'POST',
    endpoint: '/mpesa/stkpush/v1/processrequest',
    parameters: [
      { name: 'BusinessShortCode', type: 'string', required: true, label: 'Business Shortcode', placeholder: '174379' },
      { name: 'PhoneNumber', type: 'string', required: true, label: 'Phone Number', placeholder: '2547XXXXXXXX', pattern: '^254\\d{9}$' },
      { name: 'Amount', type: 'number', required: true, label: 'Amount', placeholder: '100' },
      { name: 'AccountReference', type: 'string', required: true, label: 'Account Reference', placeholder: 'Invoice #123' },
      { name: 'TransactionDesc', type: 'string', required: true, label: 'Transaction Description', placeholder: 'Payment for goods' }
    ]
  },
  // Safaricom - Customer to Business (C2B)
  {
    id: 'c2b-register',
    name: 'C2B Register Verification/Confirmation',
    category: 'M-PESA',
    description: 'Register validation and confirmation URLs for C2B transactions.',
    method: 'POST',
    endpoint: '/mpesa/c2b/v1/registerurl',
    parameters: [
      { name: 'ShortCode', type: 'string', required: true, label: 'Shortcode' },
      { name: 'ResponseType', type: 'string', required: true, label: 'Response Type (Completed/Cancelled)' },
      { name: 'ConfirmationURL', type: 'string', required: true, label: 'Confirmation URL' },
      { name: 'ValidationURL', type: 'string', required: true, label: 'Validation URL' }
    ]
  },
  // Safaricom - Business to Customer (B2C)
  {
    id: 'b2c-payment',
    name: 'Business to Customer (B2C)',
    category: 'M-PESA',
    description: 'Send money from a business shortcode to a customer phone number (Salary, Promotion, etc).',
    method: 'POST',
    endpoint: '/mpesa/b2c/v1/paymentrequest',
    parameters: [
      { name: 'InitiatorName', type: 'string', required: true, label: 'Initiator Name' },
      { name: 'SecurityCredential', type: 'string', required: true, label: 'Security Credential' },
      { name: 'CommandID', type: 'string', required: true, label: 'Command ID' },
      { name: 'Amount', type: 'number', required: true, label: 'Amount' },
      { name: 'PartyA', type: 'string', required: true, label: 'Party A (Shortcode)' },
      { name: 'PartyB', type: 'string', required: true, label: 'Party B (Phone)' },
      { name: 'Remarks', type: 'string', required: true, label: 'Remarks' }
    ]
  },
  // Safaricom - Transaction Status
  {
    id: 'mpesa-status',
    name: 'Transaction Status',
    category: 'M-PESA',
    description: 'Check the status of an M-PESA transaction.',
    method: 'POST',
    endpoint: '/mpesa/transactionstatus/v1/query',
    parameters: [
      { name: 'Initiator', type: 'string', required: true, label: 'Initiator' },
      { name: 'SecurityCredential', type: 'string', required: true, label: 'Security Credential' },
      { name: 'CommandID', type: 'string', required: true, label: 'Command ID (TransactionStatusQuery)' },
      { name: 'TransactionID', type: 'string', required: true, label: 'Transaction ID' },
      { name: 'PartyA', type: 'string', required: true, label: 'Party A (Shortcode/Phone)' },
      { name: 'IdentifierType', type: 'string', required: true, label: 'Identifier Type' },
      { name: 'Remarks', type: 'string', required: true, label: 'Remarks' }
    ]
  },
  // Safaricom - Account Balance
  {
    id: 'mpesa-balance',
    name: 'Account Balance',
    category: 'M-PESA',
    description: 'Check the balance of an M-PESA BuyGoods or Paybill account.',
    method: 'POST',
    endpoint: '/mpesa/accountbalance/v1/query',
    parameters: [
      { name: 'Initiator', type: 'string', required: true, label: 'Initiator' },
      { name: 'SecurityCredential', type: 'string', required: true, label: 'Security Credential' },
      { name: 'CommandID', type: 'string', required: true, label: 'Command ID (AccountBalance)' },
      { name: 'PartyA', type: 'string', required: true, label: 'Party A (Shortcode)' },
      { name: 'IdentifierType', type: 'string', required: true, label: 'Identifier Type' },
      { name: 'Remarks', type: 'string', required: true, label: 'Remarks' }
    ]
  },
  // Safaricom - Tax Remittance
  {
    id: 'tax-remittance',
    name: 'Tax Remittance',
    category: 'M-PESA',
    description: 'Remit taxes directly to KRA from your M-PESA account.',
    method: 'POST',
    endpoint: '/mpesa/b2b/v1/remittax',
    parameters: [
      { name: 'Initiator', type: 'string', required: true, label: 'Initiator' },
      { name: 'SecurityCredential', type: 'string', required: true, label: 'Security Credential' },
      { name: 'CommandID', type: 'string', required: true, label: 'Command ID (PayTaxToKRA)' },
      { name: 'SenderIdentifierType', type: 'string', required: true, label: 'Sender Identifier Type' },
      { name: 'RecieverIdentifierType', type: 'string', required: true, label: 'Receiver Identifier Type' },
      { name: 'Amount', type: 'number', required: true, label: 'Amount' },
      { name: 'PartyA', type: 'string', required: true, label: 'Party A (Shortcode)' },
      { name: 'PartyB', type: 'string', required: true, label: 'Party B (KRA Shortcode)' },
      { name: 'AccountReference', type: 'string', required: true, label: 'Account Reference' },
      { name: 'Remarks', type: 'string', required: true, label: 'Remarks' }
    ]
  }
];
