export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  timestamp: Date
}

export interface KnowledgeSource {
  id: string
  name: string
  icon: string
  items: {
    id: string
    name: string
  }[]
}

export const knowledgeSources: KnowledgeSource[] = [
  {
    id: "dims",
    name: "DIMS",
    icon: "⚙️",
    items: [
      { id: 'dims-overview', name: 'Overview' },
      { id: 'dims-installation', name: 'Installation' },
      { id: 'dims-commands', name: 'Commands' },
      { id: 'dims-order-types', name: 'Order Types' },
      { id: 'dims-status-codes', name: 'Status Codes' },
      { id: 'dims-electronic-hold', name: 'Electronic Hold' },
      { id: 'dims-kill-user', name: 'Kill User' },
      { id: 'dims-change-order-status', name: 'Change Order Status' },
      { id: 'dims-account-profile', name: 'Account Profile' },
      { id: 'dims-update-via-codes', name: 'Update VIA Codes' },
      { id: 'dims-remove-environment-sku', name: 'Remove Environment SKU' },
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    icon: "💼",
    items: [
      { id: 'sf-overview', name: 'Overview' },
      { id: 'sf-initial-setup', name: 'Initial Setup' },
      { id: 'sf-change-owner-queue', name: 'Change Owner Queue' },
      { id: 'sf-change-multiple-owner', name: 'Change Multiple Owner' },
      { id: 'sf-b2b-user-group', name: 'B2B User Group' },
      { id: 'sf-user-rights', name: 'User Rights' },
      { id: 'sf-remove-user', name: 'Remove User' },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: "🛒",
    items: [
      { id: 'mp-overview', name: 'Overview' },
      { id: 'mp-saml', name: 'SAML Authentication' },
    ],
  },
  {
    id: "pat",
    name: "PAT",
    icon: "🔧",
    items: [
      { id: 'pat-overview', name: 'Overview' },
      { id: 'pat-create-price-rule', name: 'Create Price Rule' },
      { id: 'pat-remove-sku', name: 'Remove SKU' },
      { id: 'pat-update-skus', name: 'Update SKUs' },
      { id: 'pat-add-valid-sales', name: 'Add Valid Sales' },
      { id: 'pat-new-user', name: 'New User' },
    ],
  },
  {
    id: "reference",
    name: "Reference",
    icon: "📚",
    items: [
      { id: 'ref-glossary', name: 'Glossary' },
      { id: 'ref-contacts', name: 'Contacts' },
      { id: 'ref-access-requests', name: 'Access Requests' },
      { id: 'ref-cheatsheet', name: 'Cheatsheet' },
    ],
  },
]

export const suggestionCards = [
  {
    id: "1",
    text: "How do I do a Kill User in DIMS?",
    icon: "🖥️",
  },
  {
    id: "2",
    text: "How do I change a case owner in Salesforce?",
    icon: "💼",
  },
  {
    id: "3",
    text: "What is SAML authentication?",
    icon: "🔐",
  },
  {
    id: "4",
    text: "How do I create a price rule in CPT?",
    icon: "🔧",
  },
]

// Mock response for the Kill User question
export const mockKillUserResponse = `## Kill User in DIMS

The **Kill User** function is used to terminate a user session in DIMS when they are locked out or experiencing issues with their active session.

### Steps to Perform a Kill User

1. **Access the DIMS Admin Panel**
   - Navigate to \`Admin > User Management > Active Sessions\`

2. **Locate the User**
   - Search for the user by their username or employee ID
   - You can also filter by "Locked Sessions" to find users who are stuck

3. **Execute the Kill Command**
   - Select the user session
   - Click the **"Kill Session"** button
   - Confirm the action when prompted

### Important Notes

- Always verify the user's identity before killing their session
- The user will need to log in again after the session is terminated
- If the issue persists, check for any **Electronic Holds** on the account

### Ticket Template

\`\`\`
Subject: DIMS Session Kill Request
User: [Employee ID]
Reason: [Locked session / Unable to access system]
Action Taken: Session terminated via Admin Panel
Status: Resolved
\`\`\`

### Related Commands

| Command | Description |
|---------|-------------|
| \`KILLUSER\` | Terminates active session |
| \`CHKUSER\` | Checks user session status |
| \`RSTUSER\` | Resets user password |

> **Tip:** If you're seeing repeated lockouts, consider checking the user's Account Profile for any configuration issues.`
