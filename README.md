# Rental Property Management System

## Overview
This project is a comprehensive rental property management system built using NextJS. It provides property owners, managers, and tenants with tools to efficiently manage rental properties, leases, payments, maintenance requests, and tenant vetting.

## Tech Stack
- **Framework**: NextJS 15+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API
- **Payment Processing**: Stripe
- **Email Services**: Resend
- **Tenant Screening**: Integration with background check APIs
- **Deployment**: Vercel

## Project Structure
```
/app
  /api            # API routes for server-side operations
  /(auth)         # Authentication-related pages
  /dashboard      # Dashboard views for different user roles
  /properties     # Property listing and management
  /tenants        # Tenant management
  /applications   # Rental applications and tenant vetting
  /leases         # Lease creation and management  
  /maintenance    # Maintenance request handling
  /payments       # Payment processing and history
  /settings       # User and system settings
/components       # Reusable UI components
/lib              # Utility functions and shared logic
/prisma           # Database schema and migrations
/public           # Static assets
/styles           # Global styles
```

## Core Features

### Property Management
- Property listing creation and management
- Unit/room tracking within properties
- Image gallery and virtual tours
- Amenity tracking
- Maintenance history
- Financial performance metrics

### Tenant Management
- Tenant profiles and history
- Application processing
- Document storage
- Communication history
- Payment history

### Tenant Vetting & Screening
- Online rental application submission
- Application fee processing
- Background check integration
- Credit score verification
- Income and employment verification
- Previous landlord references
- Rental history verification
- Automated scoring and recommendation system
- Document collection and verification
- Compliance with fair housing laws
- Customizable screening criteria per property

### Lease Management
- Digital lease creation
- E-signature integration
- Rent and fee calculation
- Renewal processing
- Document storage

### Financial Operations
- Rent collection
- Payment processing
- Late fee management
- Expense tracking
- Financial reporting

### Maintenance
- Request submission and tracking
- Work order management
- Vendor coordination
- Scheduled maintenance

## Development Guidelines

### Database Schema Design
- Use Prisma for type-safe database operations
- Implement proper relations between entities
- Consider soft delete patterns for important records
- Include audit fields (createdAt, updatedAt) on all models

### API Implementation
- Create RESTful API routes under `/app/api/`
- Use server-side validation with zod
- Implement proper error handling and status codes
- Use middleware for authentication checks
- Cache responses where appropriate

### Authentication & Authorization
- Implement role-based access control (Owner, Manager, Tenant, Maintenance)
- Use NextAuth.js for authentication providers
- Secure API routes with session validation
- Implement proper CSRF protection

### Tenant Screening Implementation
- Create secure API routes for handling sensitive applicant data
- Implement third-party API integrations for background checks
- Build configurable screening criteria per property
- Develop approval workflow with notification system
- Ensure secure storage of verification documents
- Implement compliant adverse action notice system
- Build customizable application forms

### Performance Considerations
- Use Static Site Generation for public property listings
- Implement Incremental Static Regeneration for frequently updated data
- Use Server Components for data-heavy pages
- Optimize image loading with NextJS Image component
- Implement pagination for large data sets

### Third-party Integrations
- Payment processing (Stripe)
- Email notifications (Resend)
- Document signing (DocuSign or similar)
- Background checks (TransUnion SmartMove, Checkr, etc.)
- Credit reports (Experian, Equifax, TransUnion)
- Income verification (The Work Number, Truework)
- Map services (Google Maps API)

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in required values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This application is designed to be deployed on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy the application
4. Set up a database (e.g., Vercel Postgres, Neon, or PlanetScale)

## Scalability Considerations

- Implement database connection pooling
- Use edge functions for geo-distributed API routes
- Consider implementing caching strategies (SWR/React Query)
- Optimize image assets and use CDN
- Implement database sharding for multi-tenant scenarios with large datasets

## Security Best Practices

- Never expose sensitive information in client components
- Validate all input data both client and server-side
- Implement rate limiting on authentication endpoints
- Use HTTPS for all communications
- Store sensitive information in environment variables
- Encrypt sensitive tenant information in the database
- Implement proper logging and monitoring
- Regularly update dependencies
- Ensure compliance with data protection regulations (GDPR, CCPA)