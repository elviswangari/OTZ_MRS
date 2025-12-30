# OTZ_MRS - Operation Triple Zero Management Reporting System

OTZ_MRS is a comprehensive management and reporting system designed for the **Operation Triple Zero (OTZ)** initiative, focusing on Children and Adolescents Living with HIV (CALHIV). The system streamlines patient tracking, clinical workflows, and reporting for healthcare workers (HCW) and patients (ROC - Retention of Care).

## 🏗️ Architecture Overview

The project is built using a modern full-stack architecture:

- **Backend**: Node.js/Express with an MVC (Model-View-Controller) pattern.
  - **Services Layer**: All database operations are abstracted into service classes in `backend/utils/db.js` to ensure consistency and reusability.
  - **Database**: MongoDB (via Mongoose) for persistent storage.
  - **Caching**: Redis for session management and token blacklisting.
  - **Authentication**: JWT-based authentication with role-based access control (HCW vs. ROC).
- **Frontend**: React 19 powered by Vite.
  - **UI Framework**: Tailwind CSS with Radix UI/shadcn components.
  - **State Management**: React hooks and custom hooks for data fetching.
  - **Authentication**: Integrated with `react-auth-kit` for secure route protection.

## 🚀 Features

### 🩺 Healthcare Worker (HCW) Dashboard
- **Patient Management**: Comprehensive registration and profile updates for Children and Adolescents Living with HIV (CALHIV).
- **Clinical Workflows**:
  - **Triage**: Record and track vitals (Weight, Height, Blood Pressure).
  - **Lab Orders**: Manage Viral Load (VL) results and historical data.
  - **Pharmacy**: Track ART regimens, start dates, and regimen lines.
  - **Appointments**: Schedule and monitor follow-up visits to ensure retention in care.
- **Automated Reporting**: Generate complex, facility-ready Excel reports with a single click:
  - **OTZ Monthly Report**: Comprehensive monthly statistics.
  - **STF (Suspected Treatment Failure) Report**: Track patients with high viral loads.
  - **Viral Load Summary**: Detailed VL tracking across the facility.
- **Content Management**: Create, update, and manage educational modules for patients.
- **User Management**: Administer HCW accounts and roles.

### 👤 Patient (ROC - Recipient of Care) Dashboard
- **Personal Health Record**: Secure access to personal clinical data.
- **Vitals Tracking**: View historical weight, height, and BP trends.
- **Lab Results**: Access Viral Load results and dates.
- **Treatment History**: Monitor current ART regimens and pharmacy history.
- **Appointment Reminders**: View upcoming clinic dates to improve adherence.

### 🛡️ System Capabilities
- **Role-Based Access Control (RBAC)**: Strict separation between HCW and ROC functionalities.
- **Secure Authentication**: JWT-based auth with Redis-backed token management for enhanced security.
- **Data Visualization**: Interactive charts and progress indicators for clinical metrics.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and Radix UI components, optimized for both desktop and mobile use.
- **Excel Integration**: High-fidelity Excel export using `exceljs` for official reporting.
- **System Health Monitoring**: Built-in status checks for Database and Redis connectivity.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Radix UI, Chart.js |
| **Backend** | Node.js, Express, Mongoose, Redis, JWT |
| **Testing** | Mocha, Chai, Sinon |
| **Reporting** | ExcelJS |
| **Auth** | React Auth Kit, Bcrypt |

## 📂 Project Structure

```text
OTZ_MRS/
├── backend/                # Express Server
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & validation middleware
│   ├── model/              # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Services (db.js), Redis, Errors
│   └── server.js           # Entry point
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # UI & Role-specific components
│   │   ├── lib/            # Utilities
│   │   ├── Axios.js        # API client wrapper
│   │   └── visitData.js    # Custom data fetching hooks
│   └── vite.config.js      # Vite configuration
└── .github/                # Copilot instructions & CI
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis Server

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/elviswangari/OTZ_MRS.git
   cd OTZ_MRS
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in `backend/`:
   ```env
   PORT=3001
   DB_URL=mongodb://localhost:27017/otz_mrs
   SECRET_KEY=your_jwt_secret
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

- **Start Backend (Dev)**:
  ```bash
  cd backend
  npm run dev
  ```
- **Start Frontend (Dev)**:
  ```bash
  cd frontend
  npm run dev
  ```

## 🧪 Testing

Backend tests are written using Mocha and Chai.
```bash
cd backend
npm test
```

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📧 Contact

Elvis Wangari - [elviswangari@gmail.com](mailto:elviswangari@gmail.com)

Project Link: [https://github.com/elviswangari/OTZ_MRS](https://github.com/elviswangari/OTZ_MRS)
