import { createContext, useContext } from 'react';
export type Screen = 'landing' | 'login' | 'onboarding' | 'dashboard' | 'leads' | 'detail' | 'pipeline' | 'inbox' | 'tasks' | 'calendar' | 'automations' | 'builder' | 'assistant' | 'insights' | 'analytics' | 'reports' | 'integrations' | 'team' | 'settings' | 'billing' | 'system' | 'notifications';
export type Go = (s: Screen, param?: string) => void;
export const Nav = createContext<{ go: Go; param: string; openLead: () => void; openTask: () => void }>({ go: () => {}, param: '', openLead: () => {}, openTask: () => {} });
export const useGo = () => useContext(Nav).go;
export const useParam = () => useContext(Nav).param;
export const useModals = () => { const c = useContext(Nav); return { openLead: c.openLead, openTask: c.openTask }; };
export const SCREENS: Screen[] = ['landing', 'login', 'onboarding', 'dashboard', 'leads', 'detail', 'pipeline', 'inbox', 'tasks', 'calendar', 'automations', 'builder', 'assistant', 'insights', 'analytics', 'reports', 'integrations', 'team', 'settings', 'billing', 'system', 'notifications'];
