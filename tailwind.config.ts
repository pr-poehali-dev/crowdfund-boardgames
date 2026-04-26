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
			fontFamily: {
				'russo': ['Russo One', 'sans-serif'],
				'rubik': ['Rubik', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				neon: {
					cyan: '#00F5FF',
					purple: '#BF00FF',
					pink: '#FF006E',
					green: '#39FF14',
					yellow: '#FFE600',
				},
				game: {
					dark: '#0A0A14',
					darker: '#06060F',
					card: '#111126',
					border: '#1E1E3F',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 5px #00F5FF, 0 0 20px #00F5FF40' },
					'50%': { boxShadow: '0 0 15px #00F5FF, 0 0 40px #00F5FF60, 0 0 80px #00F5FF20' },
				},
				'scan': {
					from: { transform: 'translateY(-100%)' },
					to: { transform: 'translateY(100vh)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'progress-fill': {
					from: { width: '0%' },
					to: { width: 'var(--progress-width)' }
				},
				'counter': {
					from: { opacity: '0', transform: 'scale(0.8)' },
					to: { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'glitch': 'glitch 0.3s ease-in-out',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'scan': 'scan 4s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'counter': 'counter 0.5s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
