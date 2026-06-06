# Patricia Chatbot — Setup & Deployment Guide

## 🎯 Overview

Patricia is now powered by **Amazon Bedrock (Claude 3.5 Sonnet)** with RAG (Retrieval-Augmented Generation) for intelligent, natural language responses. The system maintains backward compatibility with TF-IDF template fallback when LLM is disabled.

**Key Features:**
- ✅ Amazon Bedrock Claude 3.5 Sonnet integration
- ✅ Multi-turn conversation memory (ephemeral, last 5 turns)
- ✅ RAG-based responses grounded in CompuCom PAT documentation
- ✅ Graceful fallback to TF-IDF when API is unavailable
- ✅ Token usage logging and cost monitoring
- ✅ "New Chat" button to reset conversation context

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **AWS Account** with Bedrock access
2. **IAM User** with programmatic access
3. **Bedrock Model Access** for Claude models (request in AWS Console)
4. **Node.js 18+** and **npm** installed locally (for development)
5. **Git** for version control

---

## 🔧 Local Development Setup

### Step 1: Install Dependencies

Since npm is not in your current PATH, you'll need to either:

**Option A: Install Node.js**
```bash
# Download from https://nodejs.org/ and add to PATH
# Then run:
npm install
```

**Option B: Deploy directly to Vercel** (recommended if npm unavailable)
```bash
# Dependencies will auto-install during Vercel build
git add .
git commit -m "feat: Add Bedrock Claude integration"
git push origin main
```

### Step 2: Get AWS Credentials

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Navigate to **Users** → Select or create a user
3. Go to **Security credentials** tab
4. Click **Create access key**
5. Choose **"Application running outside AWS"**
6. Copy both:
   - Access Key ID
   - Secret Access Key (shown only once!)

### Step 3: Enable Bedrock Model Access

1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock/)
2. Navigate to **Model access** (left sidebar)
3. Click **Manage model access**
4. Enable:
   - ✅ Claude 3.5 Sonnet
   - ✅ Claude 3 Haiku (optional, for cost savings)
5. Click **Request model access**
6. Wait for approval (usually instant for Claude 3.5 Sonnet)

### Step 4: Configure Environment Variables

```bash
# Copy template to create your local config
cp .env.local.template .env.local

# Edit .env.local with your credentials
# Use nano, vim, or any text editor
nano .env.local
```

**Minimum required variables:**
```bash
USE_LLM=true
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...  # Your access key
AWS_SECRET_ACCESS_KEY=xyz... # Your secret key
```

### Step 5: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and test:

1. **Basic Q&A**: "What is DIMS?"
2. **Follow-up**: "How do I install it?"
3. **Process question**: "How do I do a Kill User?"
4. **Unknown topic**: "What is quantum physics?" (should say not in knowledge base)
5. **New Chat**: Click "New Chat" button — context should reset

### Step 6: Check Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-06-05T10:30:00.000Z",
  "llm": {
    "enabled": true,
    "bedrock_configured": true,
    "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "region": "us-east-1"
  },
  "vault": {
    "notes_count": 31
  }
}
```

---

## 🚀 Vercel Deployment

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "feat: Add Amazon Bedrock Claude integration with conversation memory"
git push origin main
```

### Step 2: Configure Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **patricia-chatbot**
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable Name | Value | Environment |
|---|---|---|
| `USE_LLM` | `true` | Production, Preview, Development |
| `AWS_REGION` | `us-east-1` | Production, Preview, Development |
| `AWS_ACCESS_KEY_ID` | `AKIA...` (your key) | Production, Preview, Development |
| `AWS_SECRET_ACCESS_KEY` | `xyz...` (your secret) | Production, Preview, Development |

**Optional:**
| Variable Name | Value | Notes |
|---|---|---|
| `BEDROCK_MODEL_ID` | `anthropic.claude-3-5-sonnet-20241022-v2:0` | Override default model |

### Step 3: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click **•••** menu on latest deployment
3. Click **Redeploy**
4. Wait ~60 seconds for build to complete

### Step 4: Verify Production Deployment

Visit your live URL (e.g., `https://patricia-chatbot.vercel.app`)

Test same scenarios as local:
- Basic Q&A
- Follow-up questions
- New Chat button
- Health check: `https://your-url.vercel.app/api/health`

---

## 📊 Monitoring & Cost Management

### View Logs

**Vercel Logs:**
1. Dashboard → Your Project → Logs
2. Filter by `[Bedrock]` to see token usage

**AWS CloudWatch:**
1. [CloudWatch Console](https://console.aws.amazon.com/cloudwatch/)
2. Navigate to **Log groups** → `/aws/bedrock/modelinvocations`
3. View invocation logs, latency, errors

### Token Usage Tracking

Every API call logs:
```
[Bedrock] Query tokens - Input: 3245, Output: 412
[Bedrock] Estimated cost: $0.0159
```

**Cost Formula:**
- Input: (tokens / 1,000,000) × $3
- Output: (tokens / 1,000,000) × $15

### Set Budget Alerts

1. [AWS Budgets Console](https://console.aws.amazon.com/billing/home#/budgets)
2. Create budget → **Cost budget**
3. Set threshold (e.g., $50/month)
4. Add email alert at 80% threshold

### Optimize Costs

**Reduce chunk count** (saves ~$0.003/query):
```typescript
// In app/api/chat/route.ts
const results = searchVault(message, 5) // Changed from 8
```

**Use Haiku for simple questions** (saves 75%):
```bash
# In .env.local
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
```

**Limit conversation history** (saves input tokens):
```typescript
// In app/page.tsx
conversationHistory: updatedHistory.slice(-6) // Last 3 turns instead of 5
```

---

## 🧪 Testing Guide

### Manual Test Cases

| Test | Input | Expected Behavior |
|---|---|---|
| **Basic Q&A** | "What is DIMS?" | Returns definition from vault with source |
| **Follow-up** | "How do I install it?" | References previous context |
| **Process** | "How do I do a Kill User?" | Shows numbered steps clearly |
| **Unknown** | "What is machine learning?" | Says "not in knowledge base" |
| **New Chat** | Click "New Chat" button | Clears history, next question is independent |
| **Fallback** | Remove AWS credentials, restart | Falls back to TF-IDF templates |

### Health Check Tests

```bash
# Test with LLM enabled
curl https://your-url.vercel.app/api/health

# Test with LLM disabled
# Set USE_LLM=false in Vercel, redeploy, then:
curl https://your-url.vercel.app/api/health
# Should show: "llm": { "enabled": false }
```

### Load Testing (Optional)

```bash
# Install artillery
npm install -g artillery

# Create test-load.yml:
cat > test-load.yml <<EOF
config:
  target: 'https://your-url.vercel.app'
  phases:
    - duration: 60
      arrivalRate: 5
scenarios:
  - flow:
      - post:
          url: '/api/chat'
          json:
            message: 'What is DIMS?'
EOF

# Run test
artillery run test-load.yml
```

---

## 🔒 Security Best Practices

### Credential Management

✅ **DO:**
- Store credentials in Vercel environment variables
- Use IAM roles with minimum permissions
- Rotate access keys every 90 days
- Enable MFA on AWS account

❌ **DON'T:**
- Commit `.env.local` to git (already in `.gitignore`)
- Share secret keys via Slack/email
- Use root account credentials
- Hard-code keys in source code

### IAM Policy (Minimum Permissions)

Create a custom policy for Patricia:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockInvokeModel",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-*",
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-*"
      ]
    }
  ]
}
```

Attach this policy to your IAM user instead of using `AdministratorAccess`.

### Rate Limiting (Future Enhancement)

To prevent abuse, consider adding:

```typescript
// lib/rate-limiter.ts (not implemented yet)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
})
```

---

## 🐛 Troubleshooting

### Issue: "AWS credentials not configured"

**Symptom:** Health check shows `bedrock_configured: false`

**Solution:**
1. Verify environment variables are set in Vercel
2. Check spelling: `AWS_ACCESS_KEY_ID` (not `AWS_ACCESS_KEY`)
3. Ensure variables are enabled for "Production" environment
4. Redeploy after adding variables

### Issue: "ThrottlingException"

**Symptom:** Logs show `[Bedrock] API rate limit exceeded`

**Solution:**
1. Bedrock has default quota: 400 TPM (tokens per minute) for Claude 3.5 Sonnet
2. Request quota increase: [Service Quotas Console](https://console.aws.amazon.com/servicequotas/)
3. Temporarily switch to Haiku (higher quota)

### Issue: "AccessDeniedException"

**Symptom:** API returns 403 error

**Solution:**
1. Check Model Access in Bedrock Console
2. Verify IAM policy allows `bedrock:InvokeModel`
3. Ensure region matches: `us-east-1` in both env and policy
4. Wait 5-10 minutes after enabling model access

### Issue: Responses are still using TF-IDF templates

**Symptom:** Answers are rigid, no conversation memory

**Solution:**
1. Check health endpoint: `/api/health`
2. Verify `USE_LLM=true` in environment variables
3. Check Vercel logs for `[Patricia] Using Bedrock` message
4. If seeing `[Patricia] Bedrock failed`, check error details

### Issue: Conversation context not working

**Symptom:** Follow-up questions don't reference previous messages

**Solution:**
1. Check browser console for errors
2. Verify `conversationHistory` is being sent in request payload
3. Click "New Chat" to reset state
4. Hard refresh browser (Ctrl+Shift+R)

---

## 📈 Cost Estimation

### Pricing

**Claude 3.5 Sonnet:**
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens

**Typical Query:**
- User question: ~20 tokens
- RAG context (8 chunks): ~3,000 tokens
- Claude response: ~400 tokens
- **Cost per query: ~$0.01**

### Monthly Projections

| Usage Level | Queries/Day | Monthly Cost |
|---|---|---|
| Light (team of 5) | 50 | $15 |
| Medium (team of 20) | 200 | $60 |
| Heavy (team of 50) | 500 | $150 |
| Very Heavy (100+) | 1,000 | $300 |

### Break-Even Analysis

Compared to engineer time:
- 1 question saves ~5 minutes of searching docs
- Engineer cost: ~$50/hour = $4.17 per 5 minutes
- **Patricia saves $4.17 per query, costs $0.01** → **417x ROI**

---

## 🔄 Rollback Plan

If you need to revert to TF-IDF-only mode:

### Quick Disable (No Code Changes)

```bash
# In Vercel Environment Variables, set:
USE_LLM=false

# Then redeploy
```

System will automatically fall back to template answers.

### Full Removal (Optional)

```bash
# 1. Remove Bedrock client
rm lib/bedrock-client.ts

# 2. Restore chat route
git show HEAD~1:app/api/chat/route.ts > app/api/chat/route.ts

# 3. Restore page state
git show HEAD~1:app/page.tsx > app/page.tsx

# 4. Remove dependency
npm uninstall @aws-sdk/client-bedrock-runtime

# 5. Commit and deploy
git add .
git commit -m "revert: Remove Bedrock integration"
git push origin main
```

---

## 📞 Support

**For AWS/Bedrock Issues:**
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [AWS Support Center](https://console.aws.amazon.com/support/)

**For Next.js/Vercel Issues:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

**For Patricia-Specific Issues:**
- Check logs in Vercel Dashboard
- Review [AI-AGENT-CONTEXT.md](data/vault/AI-AGENT-CONTEXT.md)
- Test health endpoint: `/api/health`

---

## ✅ Implementation Checklist

Before going live:

- [ ] AWS credentials created and configured
- [ ] Bedrock model access approved
- [ ] Environment variables set in Vercel
- [ ] Health check returns `status: "ok"`
- [ ] Local testing passed all 6 scenarios
- [ ] Production deployment successful
- [ ] Budget alerts configured in AWS
- [ ] Team notified of new features
- [ ] Documentation updated (if needed)

---

**Implementation Date:** June 5, 2026  
**Version:** v2.0 (LLM-powered)  
**Maintained by:** PAT Team Lead  
