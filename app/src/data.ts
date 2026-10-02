export const temp = (s: number): [string, string] => s >= 85 ? ['High Intent', 'violet'] : s >= 70 ? ['Hot', 'red'] : s >= 45 ? ['Warm', 'amber'] : ['Cold', 'blue'];
export const stageTone = (s: string) => ({ New: 'slate', Contacted: 'blue', Qualified: 'navy', Meeting: 'violet', Proposal: 'amber', Won: 'emerald', Lost: 'red' } as Record<string, string>)[s] ?? 'slate';
export const srcIcon = (s: string) => ({ Website: 'globe', Facebook: 'facebook', Instagram: 'instagram', 'Google Ads': 'search', WhatsApp: 'message-circle', Referral: 'handshake' } as Record<string, string>)[s] ?? 'circle';

export const funnel = [['New', 1000], ['Contacted', 620], ['Qualified', 310], ['Meeting', 140], ['Proposal', 65], ['Won', 24]] as [string, number][];
export const funnelColors = ['#0F4C81', '#165C99', '#1E6FB8', '#1E88E5', '#4FA0EA', '#16A34A'];
export const sources = [['Website', 'globe', 312, '18.2%'], ['Google Ads', 'search', 264, '15.6%'], ['Referral', 'handshake', 96, '21.4%'], ['WhatsApp', 'message-circle', 148, '11.8%'], ['Facebook', 'facebook', 121, '7.4%'], ['Instagram', 'instagram', 59, '6.1%']] as [string, string, number, string][];
export const followups = [['John Smith', 'ABC Construction', 'Proposal follow-up', 87, '10:00 AM'], ['Ahmed Khan', 'Brightsmile Dental', 'Send pricing', 78, '11:30 AM'], ['Sarah Lee', 'Northwind Realty', 'Discovery call', 64, '2:00 PM'], ['Priya Nair', 'Lumen Yoga Studio', 'Check in', 52, 'Overdue'], ['Marco Rossi', 'Rossi Auto Body', 'Intro message', 41, '4:30 PM']] as [string, string, string, number, string][];

export type Lead = { name: string; company: string; source: string; score: number; stage: string; rep: string; last: string; next: string };
export const leads: Lead[] = ([
  ['John Smith', 'ABC Construction', 'Facebook', 87, 'Qualified', 'Sarah Mitchell', '2h ago', 'Tomorrow 10:00 AM'],
  ['Ahmed Khan', 'Brightsmile Dental', 'Website', 78, 'Proposal', 'Sarah Mitchell', '35m ago', 'Today 11:30 AM'],
  ['Emily Carter', 'Carter & Co. Law', 'Google Ads', 91, 'Meeting', 'Daniel Park', '1h ago', 'Today 3:00 PM'],
  ['Sarah Lee', 'Northwind Realty', 'Referral', 64, 'Contacted', 'Maya Johnson', '5h ago', 'Today 2:00 PM'],
  ['Priya Nair', 'Lumen Yoga Studio', 'Instagram', 52, 'Contacted', 'Daniel Park', '1d ago', 'Overdue'],
  ['Marco Rossi', 'Rossi Auto Body', 'WhatsApp', 41, 'New', 'Unassigned', '12m ago', 'Today 4:30 PM'],
  ['Grace Okafor', 'Okafor Logistics', 'Website', 73, 'Qualified', 'Maya Johnson', '3h ago', 'Fri 9:00 AM'],
  ['Tom Becker', 'Becker Bakery', 'Facebook', 28, 'New', 'Unassigned', '6h ago', '—'],
  ['Lina Haddad', 'Haddad Interiors', 'Google Ads', 82, 'Proposal', 'Sarah Mitchell', '1d ago', 'Thu 1:00 PM'],
  ['Kevin Walsh', 'Walsh Fitness', 'Instagram', 36, 'Lost', 'Daniel Park', '4d ago', '—'],
] as [string, string, string, number, string, string, string, string][]).map(([name, company, source, score, stage, rep, last, next]) => ({ name, company, source, score, stage, rep, last, next }));
export const leadEmail = (l: Lead) => l.name.split(' ')[0].toLowerCase() + '@' + l.company.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12) + '.com';

export const pipeline: [string, string, [string, string, number, number, string, string, string][]][] = [
  ['NEW', '#94A3B8', [['Marco Rossi', 'Rossi Auto Body', 3200, 41, 'Daniel Park', '12m ago', 'Today'], ['Tom Becker', 'Becker Bakery', 1800, 28, 'Maya Johnson', '6h ago', 'Thu'], ['Hana Sato', 'Sato Ceramics', 2400, 55, 'Sarah Mitchell', '1d ago', 'Fri']]],
  ['CONTACTED', '#1E88E5', [['Sarah Lee', 'Northwind Realty', 6500, 64, 'Maya Johnson', '5h ago', 'Today'], ['Priya Nair', 'Lumen Yoga Studio', 2900, 52, 'Daniel Park', '1d ago', 'Overdue']]],
  ['QUALIFIED', '#0F4C81', [['John Smith', 'ABC Construction', 9800, 87, 'Sarah Mitchell', '2h ago', 'Tomorrow'], ['Grace Okafor', 'Okafor Logistics', 7400, 73, 'Maya Johnson', '3h ago', 'Fri']]],
  ['MEETING', '#5B4FD6', [['Emily Carter', 'Carter & Co. Law', 12000, 91, 'Daniel Park', '1h ago', 'Today'], ['Noah Fischer', 'Fischer Dental', 5600, 69, 'Sarah Mitchell', '2d ago', 'Mon']]],
  ['PROPOSAL', '#D97706', [['Ahmed Khan', 'Brightsmile Dental', 8500, 78, 'Sarah Mitchell', '35m ago', 'Today'], ['Lina Haddad', 'Haddad Interiors', 11200, 82, 'Sarah Mitchell', '1d ago', 'Thu']]],
  ['NEGOTIATION', '#0E7490', [['Oliver Grant', 'Grant Roofing', 14500, 84, 'Daniel Park', '4h ago', 'Wed']]],
  ['WON', '#16A34A', [['Chloe Dupont', 'Dupont Florals', 4200, 90, 'Maya Johnson', 'Yesterday', '—'], ['Ryan Cole', 'Cole HVAC', 9100, 88, 'Daniel Park', '2d ago', '—']]],
  ['LOST', '#DC2626', [['Kevin Walsh', 'Walsh Fitness', 3000, 36, 'Daniel Park', '4d ago', '—']]],
];

export const team = ([['Sarah Mitchell', 'Owner', 64, 92, 'Active', 'online'], ['Daniel Park', 'Admin', 58, 84, 'Active', 'online'], ['Maya Johnson', 'Manager', 51, 88, 'Active', 'away'], ['Leo Martins', 'Sales Agent', 38, 46, 'Active', 'offline'], ['Aisha Rahman', 'Sales Agent', 37, 71, 'Active', 'online'], ['Ben Torres', 'Sales Agent', 0, 0, 'Invited', 'offline']] as [string, string, number, number, string, 'online' | 'away' | 'offline'][]);
export const roles = [['Owner', 'Full access, billing, and workspace deletion.'], ['Admin', 'Manage team, integrations, and automations.'], ['Manager', 'See all leads and reports; assign leads.'], ['Sales Agent', 'Work assigned leads, inbox, and tasks.']];

export const integrations: { name: string; items: [string, string, string, string, string, string, boolean][] }[] = [
  { name: 'Lead Sources', items: [['Facebook Lead Ads', 'Lead source', 'facebook', '#1877F2', '#EEF4FE', 'Sync lead form submissions in real time, with campaign and ad set attribution.', true], ['Instagram', 'Lead source', 'instagram', '#C026D3', '#FBF0FD', 'Capture DMs and lead forms from your business profile.', false], ['Website', 'Lead source', 'globe', '#0F4C81', '#EEF5FD', 'Embed a form or chat widget, or forward from any form builder.', true], ['Google Ads', 'Lead source', 'search', '#EA4335', '#FEF1F0', 'Import lead form extensions and track cost per qualified lead.', true]] },
  { name: 'Communication', items: [['WhatsApp', 'Messaging', 'message-circle', '#16A34A', '#F0FDF4', 'Two-way WhatsApp Business messaging with templates and auto-replies.', true], ['Gmail', 'Email', 'mail', '#EA4335', '#FEF1F0', 'Send and log emails from your Google Workspace inbox.', false], ['Outlook', 'Email', 'mail', '#0F6CBD', '#EEF5FD', 'Send and log emails from Microsoft 365.', false]] },
  { name: 'Productivity', items: [['Google Calendar', 'Scheduling', 'calendar', '#1E88E5', '#EEF5FD', 'Two-way sync for meetings and follow-ups. Booking links included.', true], ['Zoom', 'Video', 'video', '#2D8CFF', '#EEF5FD', 'Auto-create Zoom links when a meeting is booked.', false], ['Slack', 'Notifications', 'slack', '#4A154B', '#F6EFF6', 'Post hot-lead alerts and daily digests to any channel.', false]] },
];

export const KIND: Record<string, [string, string]> = { WHEN: ['#0F4C81', '#E3EFFB'], WAIT: ['#64748B', '#F1F5F9'], IF: ['#B45309', '#FEF3C7'], THEN: ['#15803D', '#DCFCE7'], AI: ['#5B4FD6', '#ECEBFD'] };
export const flowSteps = [['WHEN', 'Lead becomes Qualified', 'user-check', 'Any source'], ['WAIT', '24 hours', 'hourglass', 'Business hours only'], ['IF', 'No response', 'git-branch', "Lead hasn't replied on any channel"], ['THEN', 'Send WhatsApp Message', 'message-circle', 'Template: Qualified check-in'], ['WAIT', '2 days', 'hourglass', ''], ['THEN', 'Create Sales Task', 'clipboard-check', 'Assign to lead owner · High priority']] as [string, string, string, string][];
export const autos = [
  ['Instant AI reply to new leads', "Reply within 60 seconds on the lead's channel, then score and assign.", [['WHEN', 'user-plus'], ['AI', 'sparkles'], ['THEN', 'user-round-check']], '1,042 runs', 'Avg reply 41s', true],
  ['Round-robin assignment', 'Distribute website and Google Ads leads evenly across sales agents.', [['WHEN', 'globe'], ['THEN', 'shuffle']], '486 runs', '6 agents', true],
  ['Re-engage cold leads', 'After 14 days of silence, send a check-in email with a case study.', [['WHEN', 'snowflake'], ['WAIT', 'hourglass'], ['THEN', 'mail']], '128 runs', '9% revived', true],
  ['Meeting reminder', 'Send a WhatsApp reminder 2 hours before any booked meeting.', [['WHEN', 'calendar'], ['THEN', 'message-circle']], '94 runs', '−31% no-shows', true],
  ["Hot lead alert", "Notify the owner in Slack when a lead's score crosses 85.", [['WHEN', 'flame'], ['THEN', 'bell']], '57 runs', 'Paused', false],
] as [string, string, [string, string][], string, string, boolean][];
export const palette = [
  { name: 'TRIGGERS', k: 'WHEN', items: [['New Lead', 'user-plus'], ['Lead Qualified', 'user-check'], ['Stage Changed', 'arrow-right-left'], ['Form Submitted', 'file-input'], ['No Response', 'message-circle-off']] },
  { name: 'ACTIONS', k: 'THEN', items: [['Send Email', 'mail'], ['Send WhatsApp', 'message-circle'], ['Assign Lead', 'user-round-check'], ['Create Task', 'clipboard-check'], ['Change Stage', 'arrow-right-left'], ['Add Tag', 'tag'], ['Generate AI Reply', 'sparkles', 'AI'], ['Notify Team', 'bell']] },
  { name: 'LOGIC', k: 'WAIT', items: [['Wait', 'hourglass'], ['If / else', 'git-branch', 'IF']] },
] as { name: string; k: string; items: [string, string, string?][] }[];

export const taskGroups = [
  ['Today', [['Follow up with Priya on Instagram ads', 'Priya Nair · Lumen Yoga Studio', 'Daniel Park', 'Medium', 'Overdue'], ['Call John', 'John Smith · ABC Construction', 'Sarah Mitchell', 'High', '10:00 AM', 0, 1], ['Send proposal to Ahmed', 'Ahmed Khan · Brightsmile Dental', 'Sarah Mitchell', 'High', '11:30 AM', 0, 1], ['Follow up with Sarah', 'Sarah Lee · Northwind Realty', 'Maya Johnson', 'Medium', '2:00 PM'], ['Confirm kickoff date', 'Chloe Dupont · Dupont Florals', 'Maya Johnson', 'Low', '9:00 AM', 1]]],
  ['Tomorrow', [['Discovery call prep', 'Emily Carter · Carter & Co. Law', 'Daniel Park', 'High', '9:30 AM', 0, 1], ['Send case studies', 'Grace Okafor · Okafor Logistics', 'Maya Johnson', 'Low', '1:00 PM']]],
  ['This Week', [['Revise proposal v2', 'Lina Haddad · Haddad Interiors', 'Sarah Mitchell', 'Medium', 'Thu'], ['Contract review', 'Oliver Grant · Grant Roofing', 'Daniel Park', 'High', 'Fri']]],
] as [string, (string | number)[][]][];

export const CAL: Record<string, [string, string, string]> = { Meeting: ['#5B4FD6', '#F4F3FF', 'video'], 'Follow-up': ['#1E88E5', '#EEF5FD', 'repeat'], Task: ['#D97706', '#FEF7EA', 'circle-check'], Call: ['#16A34A', '#F0FDF4', 'phone'] };
export const calEvents = [[0, 'Call John Smith', 'Call', 10, .5], [0, 'Proposal: Brightsmile', 'Task', 11.5, .75], [0, 'Follow up Sarah Lee', 'Follow-up', 14, .5], [1, 'Discovery — Carter & Co.', 'Meeting', 9.5, 1], [1, 'Team pipeline review', 'Meeting', 13, 1], [1, 'Okafor case studies', 'Task', 15, .5], [2, 'Grant Roofing negotiation', 'Call', 11, .75], [2, 'Demo — Fischer Dental', 'Meeting', 14, 1.25], [3, 'Haddad proposal v2', 'Task', 10, 1], [3, 'Re-engage cold leads', 'Follow-up', 15.5, .5], [4, 'Grant contract review', 'Meeting', 9, 1], [4, 'Weekly forecast', 'Task', 16, .5]] as [number, string, string, number, number][];

export const chIcon: Record<string, [string, string]> = { WhatsApp: ['message-circle', '#16A34A'], Instagram: ['instagram', '#C026D3'], Facebook: ['facebook', '#1E88E5'], Email: ['mail', '#0F4C81'], Website: ['globe', '#475569'] };
export const convos = [['Ahmed Khan', 'WhatsApp', 'Can you send the pricing breakdown today?', '2m', 1, 1], ['Emily Carter', 'Email', 'Re: Discovery call — Thursday works for us', '18m', 1], ['Priya Nair', 'Instagram', 'Do you also handle Instagram ads?', '1h', 1], ['Marco Rossi', 'WhatsApp', 'Hi, saw your ad. How much for a site?', '1h'], ['Website visitor', 'Website', 'Looking for an SEO audit for 3 locations', '3h'], ['Grace Okafor', 'Email', 'Thanks, sharing with our ops team', '5h'], ['Tom Becker', 'Facebook', 'Is the $1,500 package still available?', '1d']] as [string, string, string, string, number?, number?][];
export const thread = [['in', 'Hi! We need a new website for Brightsmile Dental. Online booking is a must.', '9:41 AM'], ['ai', 'Thanks Ahmed! Online booking is something we build often. How many pages are you thinking, and do you have a booking system already?', '9:41 AM · AI auto-reply'], ['in', 'Around 6 pages. We use Dentrix for scheduling.', '9:58 AM'], ['out', "Perfect — we've integrated Dentrix before. I'll put a proposal together for you today.", '10:12 AM · Sarah'], ['in', 'Can you send the pricing breakdown today?', '10:40 AM']] as [string, string, string][];

export const plans = [['Starter', '$49', '', ['3 seats', '500 leads / month', 'Inbox & pipeline', 'Basic automations']], ['Growth', '$149', 'CURRENT', ['10 seats', '2,500 leads / month', 'AI scoring & replies', 'Unlimited automations']], ['Scale', '$399', '', ['Unlimited seats', 'Unlimited leads', 'Advanced analytics', 'SSO & audit log']]] as [string, string, string, string[]][];
