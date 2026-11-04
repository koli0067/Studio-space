# StudioSpace – Creative Studio Booking Platform

**Live Website:** https://studio-space-six.vercel.app/

## About

StudioSpace is a peer-to-peer creative workspace booking platform where creators can discover, explore, and book professional studios. Studio owners can also list and manage their creative spaces.

## Key Features

- Explore photography studios and creative workspaces.
- Browse studios by different categories.
- View studio details, pricing, location, and facilities.
- Add, update, and delete studio listings.
- Book studios and manage reservations.
- User authentication and protected routes.
- Responsive design for all devices.

## Technology Stack

**Frontend:**
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB
- Better Auth
- Nodemon

## Local Setup

Local Setup

1. Clone the repository
git clone https://github.com/koli0067/Studio-space.git
cd Studio-space

2. Setup Backend
cd server
npm install
npm run dev

3. Setup Frontend
(Open another terminal)
cd client
npm install
npm run dev

4. Run the Application
Open your browser:
http://localhost:3000

Configure the required environment variables before running the application.

## Environment Variables

Create a `.env` file in the client root with the following keys:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SERVER_BASE_URL` | Base URL of the Express server (e.g. `http://localhost:5000`) |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Free API key from [ImgBB](https://api.imgbb.com) used for studio image uploads |
| `MONGODB_URI` | MongoDB connection string (used by the auth adapter) |
| `BETTER_AUTH_SECRET` | Secret for Better Auth session signing |
| `BETTER_AUTH_URL` | Base URL of the client (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google sign-in credentials |

> **Note:** Studio image uploads go directly from the browser to ImgBB and the
> resulting image URL is stored in MongoDB. Without
> `NEXT_PUBLIC_IMGBB_API_KEY`, the upload button shows an error toast — you
> can still paste an image URL manually.

## Routes

Private routes require authentication (redirects to `/login` when signed out):

- `/add-studio` – Add a new studio
- `/studios/edit/[id]` – Update an existing studio
- `/my-listings` – Manage your studio listings
- `/my-bookings` – Manage your bookings
- `/studios` – Explore studios
- `/studios/[id]` – Studio details

> `/studios` and `/studios/[id]` redirect to their `/explore-studios`
> equivalents, keeping a single canonical UI while the spec URLs keep working.

## Author

**Koli Khatun**

Frontend Developer | Aspiring Full-Stack Developer
