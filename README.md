# Akubrecah Entertainment Developer Console

A next-generation, unified API dashboard for exploring and testing Government of Kenya (eCitizen) and Safaricom (Daraja) services. Reimagined with the sleek "Landed" design aesthetic.

![Akubrecah Entertainment](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)

## 🚀 The Future Has Landed

Akubrecah Entertainment provides a unified developer platform for all interactive fiscal and utility services. Integrate real-time PIN validation, automatic tax returns, and M-PESA payments directly into your application with a premium developer experience.

### Key Features

-   **Unified API Catalog**: Access 25+ APIs from KRA and Safaricom in one console.
-   **"Landed" Aesthetic**: A premium deep charcoal (`#1c1d26`) and pink-accent (`#e44c65`) theme inspired by HTML5 UP.
-   **Simulation Mode**: Zero-config mock server for instant testing.
-   **Live Production Mode**: Switch seamlessy to live endpoints.
-   **Visualizers**:
    -   **M-PESA Express**: Simulated mobile phone interface for STK Push.
    -   **PIN Checker**: Verified identity card visualization.

## 🛠️ Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Design**: Tailwind CSS v4 (Landed Theme)
-   **Routing**: React Router v7
-   **Motion**: Framer Motion

## 📦 API Modules

### M-PESA (Safaricom)
-   **M-PESA Express (STK Push)**: Trigger instant payment prompts.
-   **C2B Register**: Automated payment confirmation URLs.
-   **B2C**: Bulk payouts/salary processing.

### KRA (eCitizen)
-   **PIN Checker**: KYC and identity validation.
-   **Tax Compliance**: Real-time TCC verification.
-   **Returns**: Automated NIL return filing.
-   **Customs**: Import entry status tracking.

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

3.  **Run the console**
    ```bash
    npm run dev
    ```

## 🔐 Configuration

Access the **Settings** page to toggle between Mock and Live modes.
-   MOCK MODE: No keys required. Returns simulated success responses.
-   LIVE MODE: Requires valid Consumer Key/Secret or Bearer Token.

## 📄 License

MIT License. Designed by Akubrecah Entertainment.
