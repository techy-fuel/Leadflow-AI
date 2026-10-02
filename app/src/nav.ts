import { createContext, useContext } from 'react';
export type Screen = 'landing' | 'login' | 'onboarding' | 'dashboard' | 'leads' | 'detail' | 'pipeline' | 'inbox' | 'tasks' | 'calendar' | 'automations' | 'builder' | 'assistant' | 'insights' | 'analytics' | 'reports' | 'integrations' | 'team' | 'settings' | 'billing';
export const Nav = createContext<(s: Screen) => void>(() => {});
export const useGo = () => useContext(Nav);
export const SCREENS: Screen[] = ['landing', 'login', 'onboarding', 'dashboard', 'leads', 'detail', 'pipeline', 'inbox', 'tasks', 'calendar', 'automations', 'builder', 'assistant', 'insights', 'analytics', 'reports', 'integrations', 'team', 'settings', 'billing'];
