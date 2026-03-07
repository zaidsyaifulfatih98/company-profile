import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import Backendless from '../lib/backendless';

type AuthUser = {
	objectId?: string;
	email?: string;
	name?: string;
};

type AuthState = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			loading: false,
			error: null,

			login: async (email, password) => {
				try {
					set({ loading: true, error: null });

					const loggedInUser = await Backendless.UserService.login(email, password, true);

					set({
						user: loggedInUser as AuthUser,
						isAuthenticated: true,
						loading: false,
						error: null,
					});
				} catch (err: unknown) {
					const message = err instanceof Error ? err.message : 'Login failed';
					set({
						user: null,
						isAuthenticated: false,
						loading: false,
						error: message,
					});
				}
			},

			logout: async () => {
				try {
					await Backendless.UserService.logout();
				} catch {
					// keep silent so local auth state is always cleared
				} finally {
					set({
						user: null,
						isAuthenticated: false,
						loading: false,
						error: null,
					});
				}
			},

			clearError: () => set({ error: null }),
		}),
		{
			name: 'company-auth-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
