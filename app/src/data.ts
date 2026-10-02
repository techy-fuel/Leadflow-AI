export const temp = (s: number | null): [string, string] => s == null ? ['Unscored', 'slate'] : s >= 85 ? ['High Intent', 'violet'] : s >= 70 ? ['Hot', 'red'] : s >= 45 ? ['Warm', 'amber'] : ['Cold', 'blue'];
export const stageTone = (s: string) => ({ New: 'slate', Contacted: 'blue', Qualified: 'navy', Meeting: 'violet', Proposal: 'amber', Won: 'emerald', Lost: 'red' } as Record<string, string>)[s] ?? 'slate';
export const srcIcon = (s: string) => ({ Website: 'globe', Facebook: 'facebook', Instagram: 'instagram', 'Google Ads': 'search', WhatsApp: 'message-circle', Referral: 'handshake' } as Record<string, string>)[s] ?? 'circle';

export const funnelColors = ['#0F4C81', '#165C99', '#1E6FB8', '#1E88E5', '#4FA0EA', '#16A34A'];
export const integrations: { name: string; items: [string, string, string, string, string, string, boolean][] }[] = [
  { name: 'Lead Sources', items: [['Facebook Lead Ads', 'Lead source', 'facebook', '#1877F2', '#EEF4FE', 'Sync lead form submissions in real time, with campaign and ad set attribution.', true], ['Instagram', 'Lead source', 'instagram', '#C026D3', '#FBF0FD', 'Capture DMs and lead forms from your business profile.', false], ['Website', 'Lead source', 'globe', '#0F4C81', '#EEF5FD', 'Embed a form or chat widget, or forward from any form builder.', true], ['Google Ads', 'Lead source', 'search', '#EA4335', '#FEF1F0', 'Import lead form extensions and track cost per qualified lead.', true]] },
  { name: 'Communication', items: [['WhatsApp', 'Messaging', 'message-circle', '#16A34A', '#F0FDF4', 'Two-way WhatsApp Business messaging with templates and auto-replies.', true], ['Gmail', 'Email', 'mail', '#EA4335', '#FEF1F0', 'Send and log emails from your Google Workspace inbox.', false], ['Outlook', 'Email', 'mail', '#0F6CBD', '#EEF5FD', 'Send and log emails from Microsoft 365.', false]] },
  { name: 'Productivity', items: [['Google Calendar', 'Scheduling', 'calendar', '#1E88E5', '#EEF5FD', 'Two-way sync for meetings and follow-ups. Booking links included.', true], ['Zoom', 'Video', 'video', '#2D8CFF', '#EEF5FD', 'Auto-create Zoom links when a meeting is booked.', false], ['Slack', 'Notifications', 'slack', '#4A154B', '#F6EFF6', 'Post hot-lead alerts and daily digests to any channel.', false]] },
];

export const KIND: Record<string, [string, string]> = { WHEN: ['#0F4C81', '#E3EFFB'], WAIT: ['#64748B', '#F1F5F9'], IF: ['#B45309', '#FEF3C7'], THEN: ['#15803D', '#DCFCE7'], AI: ['#5B4FD6', '#ECEBFD'] };
export const palette = [
  { name: 'TRIGGERS', k: 'WHEN', items: [['New Lead', 'user-plus'], ['Lead Qualified', 'user-check'], ['Stage Changed', 'arrow-right-left'], ['Form Submitted', 'file-input'], ['No Response', 'message-circle-off']] },
  { name: 'ACTIONS', k: 'THEN', items: [['Send Email', 'mail'], ['Send WhatsApp', 'message-circle'], ['Assign Lead', 'user-round-check'], ['Create Task', 'clipboard-check'], ['Change Stage', 'arrow-right-left'], ['Add Tag', 'tag'], ['Generate AI Reply', 'sparkles', 'AI'], ['Notify Team', 'bell']] },
  { name: 'LOGIC', k: 'WAIT', items: [['Wait', 'hourglass'], ['If / else', 'git-branch', 'IF']] },
] as { name: string; k: string; items: [string, string, string?][] }[];

export const CAL: Record<string, [string, string, string]> = { Meeting: ['#5B4FD6', '#F4F3FF', 'video'], 'Follow-up': ['#1E88E5', '#EEF5FD', 'repeat'], Task: ['#D97706', '#FEF7EA', 'circle-check'], Call: ['#16A34A', '#F0FDF4', 'phone'] };
export const chIcon: Record<string, [string, string]> = { WhatsApp: ['message-circle', '#16A34A'], Instagram: ['instagram', '#C026D3'], Facebook: ['facebook', '#1E88E5'], Email: ['mail', '#0F4C81'], Website: ['globe', '#475569'] };
export const plans = [['Starter', '$49', '', ['3 seats', '500 leads / month', 'Inbox & pipeline', 'Basic automations']], ['Growth', '$149', 'CURRENT', ['10 seats', '2,500 leads / month', 'AI scoring & replies', 'Unlimited automations']], ['Scale', '$399', '', ['Unlimited seats', 'Unlimited leads', 'Advanced analytics', 'SSO & audit log']]] as [string, string, string, string[]][];

export const funnelStages = ['New', 'Contacted', 'Qualified', 'Meeting', 'Proposal', 'Won'];
export const roles = [['Owner', 'Full access, billing, and workspace deletion.'], ['Admin', 'Manage team, integrations, and automations.'], ['Manager', 'See all leads and reports; assign leads.'], ['Sales Agent', 'Work assigned leads, inbox, and tasks.']];
export const stageColor: Record<string, string> = { New: '#94A3B8', Contacted: '#1E88E5', Qualified: '#0F4C81', Meeting: '#5B4FD6', Proposal: '#D97706', Negotiation: '#0E7490', Won: '#16A34A', Lost: '#DC2626' };
