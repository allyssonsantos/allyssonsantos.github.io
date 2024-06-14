# allysson.me

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

My personal website/blog to share some front-end ideas with everyone!

## Made with

- Framework: [NextJS](https://nextjs.org/)
- Styling: [CSS Modules](https://github.com/css-modules/css-modules)
- Content: [Contentlayer + MDX](https://www.contentlayer.dev/)
- Auth: [Firebase](https://firebase.google.com/docs/auth)
- Error Tracking: [Sentry](https://sentry.io/)

## Running

Clone and install the dependencies:

```bash
git@github.com:allyssonsantos/allyssonsantos.github.io.git
cd allyssonsantos.github.io.git
npm install
```

Create a `.env` file with the following content:

```bash
GH_PERSONAL_TOKEN=your-github-personal-token
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

Just type `npm run dev` on your terminal.

If you plan to deploy this project, make sure to update the `deploy.yml` file
with your own information.

## Contributing

Feel free to open any kind of issues and pull-requests in this project, just
make sure to follow the [`conventional-commits`](https://www.conventionalcommits.org/en/v1.0.0/)
specification when commiting your changes. We have a npm script to do that:

```bash
npm run commit
```
