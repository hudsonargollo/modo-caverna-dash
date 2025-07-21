import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'var(--color-border)',
				input: 'var(--color-input)',
				ring: 'var(--color-ring)',
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				primary: {
					DEFAULT: 'var(--color-primary)',
					foreground: 'var(--color-primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--color-secondary)',
					foreground: 'var(--color-secondary-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--color-destructive)',
					foreground: 'var(--color-destructive-foreground)'
				},
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					foreground: 'var(--color-accent-foreground)'
				},
				popover: {
					DEFAULT: 'var(--color-popover)',
					foreground: 'var(--color-popover-foreground)'
				},
				card: {
					DEFAULT: 'var(--color-card)',
					foreground: 'var(--color-card-foreground)'
				},
				sidebar: {
					DEFAULT: 'var(--color-sidebar)',
					foreground: 'var(--color-sidebar-foreground)',
					primary: 'var(--color-sidebar-primary)',
					'primary-foreground': 'var(--color-sidebar-primary-foreground)',
					accent: 'var(--color-sidebar-accent)',
					'accent-foreground': 'var(--color-sidebar-accent-foreground)',
					border: 'var(--color-sidebar-border)',
					ring: 'var(--color-sidebar-ring)'
				},
				chart: {
					'1': 'var(--color-chart-1)',
					'2': 'var(--color-chart-2)',
					'3': 'var(--color-chart-3)',
					'4': 'var(--color-chart-4)',
					'5': 'var(--color-chart-5)'
				}
			},
			fontFamily: {
				sans: ['var(--font-sans)'],
				serif: ['var(--font-serif)'],
				mono: ['var(--font-mono)']
			},
			boxShadow: {
				'2xs': 'var(--shadow-2xs)',
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				DEFAULT: 'var(--shadow)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
