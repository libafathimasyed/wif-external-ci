export const projectConfig = {
  projectId: process.env.GCP_PROJECT_ID ?? "project-44a57735-8615-4beb-a49",
  projectNumber: process.env.GCP_PROJECT_NUMBER ?? "158792669647",
  poolId: process.env.GCP_WIF_POOL_ID ?? "github-pool",
  providerId: process.env.GCP_WIF_PROVIDER_ID ?? "github-provider",
  serviceAccount:
    process.env.GCP_WIF_SERVICE_ACCOUNT ??
    "github-actions-deployer@project-44a57735-8615-4beb-a49.iam.gserviceaccount.com",
  repository: process.env.GITHUB_REPOSITORY ?? "libafathimasyed/wif-external-ci",
};

export const providerResourceName =
  `projects/${projectConfig.projectNumber}/locations/global/workloadIdentityPools/${projectConfig.poolId}/providers/${projectConfig.providerId}`;

export const isDemoMode = (process.env.SECURITY_DEMO_MODE ?? "true") === "true";
