# UNI360 Master Admin Portal

A fully functional, responsive master admin portal built with React, Vite, TailwindCSS, Redux, and Framer Motion.

## 🚀 Features

### Authentication

- **Login Page**: Email + Password authentication with Google OAuth option
- **Protected Routes**: Role-based access control for master admin

### Dashboard

- **Welcome Section**: Personalized greeting with admin name and UUID
- **Statistics Cards**: Total Students, Applications, Universities, Revenue
- **Analytics**: Conversion funnel, revenue forecasting, agent performance
- **Real-time Notifications**: Platform-wide updates with read/unread status

### Core Management Features

- **User & Role Management**: Comprehensive user administration
- **Partner Institute Management**: University CRUD operations with filters
- **Application Oversight**: Global application monitoring and status management
- **Commission & Revenue Tracking**: Financial oversight and reporting
- **Payment Management**: Transaction monitoring and processing
- **Document Management**: Centralized file repository
- **Appointment Oversight**: Booking management and approval system
- **Reports & Analytics**: Advanced data visualization and insights
- **AI Tools**: SOP/APS generators and chatbot analytics

### UI/UX Features

- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Country Toggle**: Switch between UK and Germany operations
- **Smooth Animations**: Framer Motion powered transitions
- **Modern Design**: Tiger Eye (#e08d3c), Gunmetal (#2a3439), Columbia Blue (#c4d8e2) color scheme
- **Interactive Components**: Hover effects, loading states, notifications

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom color palette
- **State Management**: Redux Toolkit with organized slices
- **Routing**: React Router DOM with protected routes
- **Animations**: Framer Motion for smooth transitions
- **HTTP Client**: Axios with interceptors
- **Charts**: Chart.js with React integration
- **Icons**: Heroicons for consistent iconography

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm package manager

### Installation & Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:

   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment with proper SPA routing configured.

1. **Connect to Vercel**:

   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect the Vite configuration

2. **Configuration**:

   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**:
   - Add any environment variables in Vercel dashboard
   - Prefix client-side variables with `VITE_`

For detailed deployment instructions, see `DEPLOYMENT.md`.

### Demo Login

- **Email**: `admin@uni360.com`
- **Password**: admin123

## 🎨 Design System

- **Primary (Tiger Eye)**: #e08d3c
- **Secondary (Gunmetal)**: #2a3439
- **Accent (Columbia Blue)**: #c4d8e2
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 📱 Features Implemented

✅ **Authentication System** - Login with email/password and Google OAuth  
✅ **Master Dashboard** - Complete analytics and overview  
✅ **Navigation** - Responsive sidebar with country toggle  
✅ **State Management** - Redux with organized slices  
✅ **API Integration** - Axios with placeholder endpoints  
✅ **Responsive Design** - Mobile, tablet, desktop support  
✅ **Animations** - Framer Motion for smooth UX  
✅ **Component Library** - Reusable, themed components

## 🔧 Configuration

The application uses placeholder APIs that can be easily connected to a Django backend. All API endpoints are centralized in `src/services/apiServices.js`.

## 📊 Architecture

```text
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts (Auth, Main)
├── pages/          # Route components
├── services/       # API integration
├── store/          # Redux store and slices
└── utils/          # Helper functions
```

## 🚀 Production Ready

- ✅ Build optimization with Vite
- ✅ Code splitting and lazy loading ready
- ✅ Environment configuration
- ✅ Error boundaries and handling
- ✅ SEO optimization ready
- ✅ Cross-browser compatibility

---

**UNI360 Master Admin Portal** - Ready for production deployment!
