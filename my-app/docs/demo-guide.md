# Presentation demo guide

## 5–7 minute walkthrough

1. **Problem:** long-lived service-account JSON keys are risky in CI.
2. **Architecture:** GitHub OIDC → Google WIF → short-lived credentials → authorized Google Cloud access.
3. **Cloud configuration:** show pool, provider, attribute mappings, condition, and repository-scoped IAM binding.
4. **Live authentication:** run `Test Google Cloud WIF` in Actions and show the auth step succeeding.
5. **CI quality gates:** show lint, security static checks, and build results.
6. **Dashboard:** open Overview, Deployments, Pipelines, Security Center, and Audit Events.
7. **Deployment:** if server setup is complete, run the production deployment job and verify `/api/health`.
8. **Security caveat:** explain WIF is the Google Cloud identity path; SSH is a separate path to the Linux server.

Do not describe seeded data as live cloud telemetry. Be explicit about which integrations are live and which are illustrative.
