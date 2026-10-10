# Architecture and trust boundaries

## Trust paths

1. **GitHub → Google Cloud:** GitHub issues an OIDC token. Google Security Token Service validates it against the configured OIDC provider. Attribute mappings and conditions restrict which identities are eligible. IAM then allows the federated principal to impersonate the dedicated service account.
2. **GitHub Actions → Linux server:** The current starter deploy workflow uses SSH with a dedicated deploy key and pinned host key. This is separate from WIF.
3. **Application → PostgreSQL:** The Next.js server connects to PostgreSQL through `DATABASE_URL`; the browser never receives database credentials.

## Security boundaries

- GitHub workflow permissions: `contents: read`, `id-token: write`.
- Production deploy job only runs for the expected repository and `main`.
- WIF provider should enforce the exact repository condition. Consider branch/workflow restrictions for production.
- Server deployment should use a restricted Unix account, dedicated SSH key, verified host key, and protected GitHub environment.
- Dashboard values are not a source of truth for live Google Cloud IAM; verify settings in Cloud Console or via `gcloud`.

## Failure handling

The WIF workflow must fail if token exchange/auth action fails. CI fails on lint, tests, or build errors. The server deployment job fails if required secrets or known-hosts data is missing.
