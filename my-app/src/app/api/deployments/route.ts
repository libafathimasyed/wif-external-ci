import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createDeployment = z.object({
  appName: z.string().min(1).max(120),
  environment: z.enum(["development", "staging", "production"]).default("staging"),
  status: z.enum(["queued", "success", "failed"]).default("queued"),
  branch: z.string().min(1).max(120).default("main"),
  commitSha: z.string().max(80).optional(),
  commitMessage: z.string().max(500).optional(),
  workflowRunUrl: z.string().url().optional(),
  triggeredBy: z.string().max(120).optional()
});

export async function GET() {
  try {
    const deployments = await prisma.deployment.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json({ data: deployments });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  
  if (!process.env.DASHBOARD_API_TOKEN || token !== process.env.DASHBOARD_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing DASHBOARD_API_TOKEN." }, { status: 401 });
  }
  try {
    const body = createDeployment.parse(await request.json());
    const deployment = await prisma.deployment.create({ data: body });
    return NextResponse.json({ data: deployment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? error.issues : "Invalid request" }, { status: 400 });
  }
}
