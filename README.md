# eCitizen & Safaricom API Dashboard

A unified, modern dashboard for exploring and testing Government of Kenya (eCitizen) and Safaricom (Daraja) APIs. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

-   **Unified API Catalog**: Access 25+ APIs from KRA, eCitizen, and Safaricom in one place.
-   **Simulation Mode**: Test APIs instantly with a built-in Mock Server (no credentials required).
-   **Live Mode**: Switch to production ready mode to make real HTTP requests (requires API keys).
-   **Dynamic Forms**: Input fields are automatically generated based on API parameters.
-   **Premium UI**:
    -   Dark mode aesthetic with glassmorphism effects.
    -   Smooth animations using `framer-motion`.
    -   Toast notifications via `sonner`.
    -   Visual result cards for key transactions (e.g., STK Push success).
-   **Request Console**: View raw JSON responses, latency, and status codes.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite
-   **Styling**: Tailwind CSS v4
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Routing**: React Router DOM
-   **Notifications**: Sonner

## 📦 Supported APIs

### eCitizen / KRA
-   **Checkers**: PIN Checker, TCC Checker, Import Certificate Checker, etc.
-   **Payments**: VAT Withholding PRN, Rental Withholding.
-   **Returns**: NIL Return Filing.
-   **Customs**: Declaration Status.

### Safaricom (Daraja)
-   **M-PESA Express**: STK Push (Lipa Na M-PESA Online).
-   **C2B**: Register URL, Validation, Confirmation.
-   **B2C**: Business to Customer Payments.
-   **Utility**: Transaction Status, Account Balance, Tax Remittance.

## 🏁 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Akubrecah/kra-dashboard.git
    cd kra-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173`

## 🔐 Configuration

To use **Live Mode**:
1.  Go to the **Settings** page in the dashboard.
2.  Enter your **eCitizen/KRA Sandbox API Key** or **Bearer Token**.
3.  For Safaricom APIs, currently the code structure supports a single key, but you can extend `apiClient.ts` to handle OAuth tokens for Daraja.

## 📄 License

MIT License
