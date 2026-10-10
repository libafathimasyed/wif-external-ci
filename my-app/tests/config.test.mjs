import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("workflow requests OIDC token permission and avoids JSON key auth", () => {
  const workflow = fs.readFileSync(".github/workflows/wif-auth-test.yml", "utf8");
  assert.match(workflow, /id-token:\s*write/);
  assert.match(workflow, /google-github-actions\/auth/);
  assert.doesNotMatch(workflow, /credentials_json\s*:/);
  assert.doesNotMatch(workflow, /BEGIN PRIVATE KEY/);
});

test("WIF workflow uses expected provider and service account", () => {
  const workflow = fs.readFileSync(".github/workflows/wif-auth-test.yml", "utf8");
  assert.match(workflow, /projects\/158792669647\/locations\/global\/workloadIdentityPools\/github-pool\/providers\/github-provider/);
  assert.match(workflow, /github-actions-deployer@project-44a57735-8615-4beb-a49\.iam\.gserviceaccount\.com/);
});

test("deploy workflow separates SSH deployment from Google WIF", () => {
  const workflow = fs.readFileSync(".github/workflows/deploy.yml", "utf8");
  assert.match(workflow, /SSH_HOST/);
  assert.match(workflow, /SSH_PRIVATE_KEY/);
  assert.match(workflow, /WIF/);
});
