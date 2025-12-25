import { API_CATALOG } from '../data/api-definitions';

const BASE_URL = 'https://sbx.kra.go.ke';

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  source: 'MOCK' | 'REAL';
  latency: number;
}

export const invokeApi = async (
  apiId: string,
  params: Record<string, any>,
  isMock: boolean,
  apiKey?: string
): Promise<ApiResponse> => {
  const api = API_CATALOG.find(a => a.id === apiId);
  if (!api) throw new Error('API not found');

  const startTime = Date.now();

  if (isMock) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data based on API ID
    let mockData = {};
    switch (api.id) {
      case 'pin-checker':
        mockData = {
          pin: params.pin,
          status: 'Active',
          taxpayerName: 'JOHN DOE',
          registrationDate: '2020-01-15',
          station: 'West of Nairobi'
        };
        break;
      case 'vat-withholding':
        mockData = {
          prn: 'PRN-' + Math.floor(Math.random() * 1000000),
          amount: params.invoiceAmount,
          generatedDate: new Date().toISOString()
        };
        break;
      default:
        mockData = { message: 'Success', ...params };
    }

    return {
      success: true,
      data: mockData,
      source: 'MOCK',
      latency: Date.now() - startTime
    };
  } else {
    // Real API Call
    try {
      const response = await fetch(`${BASE_URL}${api.endpoint}`, {
        method: api.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey || ''}` // Assumption on Auth scheme
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      
      return {
        success: response.ok,
        data: data,
        error: response.ok ? undefined : (data.message || 'API Error'),
        source: 'REAL',
        latency: Date.now() - startTime
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Network Error (CORS or Offline)',
        source: 'REAL',
        latency: Date.now() - startTime
      };
    }
  }
};
