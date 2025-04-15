'use client';

import { useEffect } from 'react';

export function ThemeTransitionHelper() {
	useEffect(() => {
		// Add smooth transition when theme changes
		const handleThemeChange = () => {
			document.documentElement.setAttribute(
				'data-theme-transitioning',
				'true'
			);

			setTimeout(() => {
				document.documentElement.removeAttribute(
					'data-theme-transitioning'
				);
			}, 1000);
		};

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleThemeChange);

		// Apply theme border effect when theme toggle is clicked
		const themeBorder = document.querySelector('[data-theme-border]');
		const themeToggles = document.querySelectorAll('[data-theme-toggle]');

		themeToggles.forEach((toggle) => {
			toggle.addEventListener('click', () => {
				if (themeBorder) {
					themeBorder.setAttribute(
						'data-theme-transitioning',
						'true'
					);

					setTimeout(() => {
						themeBorder.removeAttribute('data-theme-transitioning');
					}, 1000);
				}
			});
		});

		return () => {
			mediaQuery.removeEventListener('change', handleThemeChange);
		};
	}, []);

	return null;
}
