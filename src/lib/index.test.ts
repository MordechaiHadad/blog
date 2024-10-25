import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from './index';

describe('calculateReadingTime', () => {
	it('should return 1 minute for a text with 200 words', () => {
		const text = 'word '.repeat(200).trim();
		const readingTime = calculateReadingTime(text);
		expect(readingTime).toBe(1);
	});

	it('should return 2 minutes for a text with 400 words', () => {
		const text = 'word '.repeat(400).trim();
		const readingTime = calculateReadingTime(text);
		expect(readingTime).toBe(2);
	});
});
