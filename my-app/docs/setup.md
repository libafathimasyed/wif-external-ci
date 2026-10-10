# Setup checklist

## GitHub repository

- [ ] Commit project files.
- [ ] Confirm default branch is `main`.
- [ ] Enable Actions.
- [ ] Protect `main`.
- [ ] Create `production` environment and add reviewers if available.

## Google Cloud

- [ ] Confirm project ID and project number.
- [ ] Confirm pool `github-pool` and provider `github-provider` exist.
- [ ] Confirm issuer `https://token.actions.githubusercontent.com/`.
- [ ] Confirm `google.subject` maps to `assertion.sub`.
- [ ] Confirm `attribute.repository` maps to `assertion.repository`.
- [ ] Confirm provider condition exactly restricts `libafathimasyed/wif-external-ci`.
- [ ] Confirm service-account IAM binding is scoped to the repository principal set.
- [ ] Do not create a JSON key.

## Local app

- [ ] Copy `.env.example` to `.env`.
- [ ] Set strong `POSTGRES_PASSWORD`.
- [ ] Start PostgreSQL.
- [ ] Run `npm ci`, `npx prisma generate`, `npx prisma db push`, `npm run db:seed`.
- [ ] Start `npm run dev`.
- [ ] Test `/api/health`.

## Server deployment

- [ ] Install Docker and Docker Compose plugin.
- [ ] Create restricted deployment user and directory.
- [ ] Configure server `.env` outside Git.
- [ ] Configure SSH secrets and verified `SSH_KNOWN_HOSTS`.
- [ ] Configure `DEPLOY_PATH`.
- [ ] Test staging before production.
