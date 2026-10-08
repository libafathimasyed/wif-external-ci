import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.deployment.count();
  if (count === 0) {
    await prisma.deployment.createMany({
      data: [
        { appName: "SecureDeploy Dashboard", environment: "production", status: "success", branch: "main", commitSha: "a81c3e7", commitMessage: "Initial dashboard release", triggeredBy: "seed-demo" },
        { appName: "SecureDeploy Dashboard", environment: "staging", status: "success", branch: "main", commitSha: "b0c2d91", commitMessage: "Add deployment history", triggeredBy: "seed-demo" },
        { appName: "SecureDeploy Dashboard", environment: "staging", status: "failed", branch: "feature/wif-check", commitSha: "c4f78ab", commitMessage: "Example failed security check", triggeredBy: "seed-demo" }
      ]
    });
  }

  const eventCount = await prisma.securityEvent.count();
  if (eventCount === 0) {
    await prisma.securityEvent.createMany({
      data: [
        { severity: "success", category: "Identity", title: "Repository-scoped principal configured", description: "IAM binding targets libafathimasyed/wif-external-ci. Confirm provider conditions before production use.", status: "reviewed", source: "seed-demo" },
        { severity: "info", category: "Credentials", title: "No service-account key required", description: "The intended workflow uses GitHub OIDC and Workload Identity Federation; runtime success must be confirmed in Actions logs.", status: "observed", source: "seed-demo" },
        { severity: "warning", category: "Deployment", title: "Server deployment uses a separate trust path", description: "SSH deployment to the Linux host is separate from Google Cloud WIF authentication.", status: "needs-review", source: "seed-demo" }
      ]
    });
  }
}

main().finally(() => prisma.$disconnect());
