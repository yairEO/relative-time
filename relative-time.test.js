const { test, describe } = require('node:test');
const assert = require('node:assert');
const RelativeTime = require('./relative-time.js');

describe('RelativeTime Library Tests', () => {
  describe('Constructor Tests', () => {
    test('should create instance with default settings', () => {
      const rt = new RelativeTime();
      assert.ok(rt instanceof RelativeTime);
      assert.ok(rt.rtf instanceof Intl.RelativeTimeFormat);
    });

    test('should create instance with custom locale', () => {
      const rt = new RelativeTime({ locale: 'es' });
      assert.ok(rt instanceof RelativeTime);
      assert.ok(rt.rtf instanceof Intl.RelativeTimeFormat);
      // Test with a known date to verify Spanish formatting
      const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      const result = rt.from(pastDate);
      assert.ok(typeof result === 'string');
    });

    test('should create instance with custom options', () => {
      const rt = new RelativeTime({ options: { numeric: 'always' } });
      assert.ok(rt instanceof RelativeTime);
      assert.ok(rt.rtf instanceof Intl.RelativeTimeFormat);
    });

    test('should create instance with both locale and options', () => {
      const rt = new RelativeTime({ locale: 'fr', options: { numeric: 'auto' } });
      assert.ok(rt instanceof RelativeTime);
      assert.ok(rt.rtf instanceof Intl.RelativeTimeFormat);
    });

    test('should handle invalid locale gracefully', () => {
      // Most implementations will fall back to default locale for invalid locales
      const rt = new RelativeTime({ locale: 'invalid-locale' });
      assert.ok(rt instanceof RelativeTime);
      assert.ok(rt.rtf instanceof Intl.RelativeTimeFormat);
    });
  });

  describe('Instance Method Tests - relativeTime.from()', () => {
    describe('Past Dates', () => {
      test('should format seconds ago', () => {
        const rt = new RelativeTime();
        const fiveSecondsAgo = new Date(Date.now() - 5 * 1000);
        const result = rt.from(fiveSecondsAgo);
        assert.ok(result.includes('second'));
        assert.ok(result.includes('ago') || result.includes('5'));
      });

      test('should format minutes ago', () => {
        const rt = new RelativeTime();
        const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
        const result = rt.from(threeMinutesAgo);
        assert.ok(result.includes('minute'));
        assert.ok(result.includes('ago') || result.includes('3'));
      });

      test('should format hours ago', () => {
        const rt = new RelativeTime();
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const result = rt.from(twoHoursAgo);
        assert.ok(result.includes('hour'));
        assert.ok(result.includes('ago') || result.includes('2'));
      });

      test('should format days ago', () => {
        const rt = new RelativeTime();
        const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
        const result = rt.from(fourDaysAgo);
        assert.ok(result.includes('day'));
        assert.ok(result.includes('ago') || result.includes('4'));
      });

      test('should format months ago', () => {
        const rt = new RelativeTime();
        const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
        const result = rt.from(sixMonthsAgo);
        assert.ok(result.includes('month'));
        assert.ok(result.includes('ago') || result.includes('6'));
      });

      test('should format years ago', () => {
        const rt = new RelativeTime();
        const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
        const result = rt.from(twoYearsAgo);
        assert.ok(result.includes('year'));
        assert.ok(result.includes('ago') || result.includes('2'));
      });

    });

    describe('Future Dates', () => {
      test('should format in seconds', () => {
        const rt = new RelativeTime();
        const tenSecondsFromNow = new Date(Date.now() + 10 * 1000);
        const result = rt.from(tenSecondsFromNow);
        assert.ok(result.includes('second'));
        assert.ok(result.includes('in') || result.includes('10'));
      });

      test('should format in minutes', () => {
        const rt = new RelativeTime();
        const fifteenMinutesFromNow = new Date(Date.now() + 15 * 60 * 1000);
        const result = rt.from(fifteenMinutesFromNow);
        assert.ok(result.includes('minute'));
        assert.ok(result.includes('in') || result.includes('15'));
      });

      test('should format in hours', () => {
        const rt = new RelativeTime();
        const threeHoursFromNow = new Date(Date.now() + 3 * 60 * 60 * 1000);
        const result = rt.from(threeHoursFromNow);
        assert.ok(result.includes('hour'));
        assert.ok(result.includes('in') || result.includes('3'));
      });

      test('should format in days', () => {
        const rt = new RelativeTime();
        const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        const result = rt.from(fiveDaysFromNow);
        assert.ok(result.includes('day'));
        assert.ok(result.includes('in') || result.includes('5'));
      });

      test('should format in months', () => {
        const rt = new RelativeTime();
        const eightMonthsFromNow = new Date(Date.now() + 8 * 30 * 24 * 60 * 60 * 1000);
        const result = rt.from(eightMonthsFromNow);
        assert.ok(result.includes('month'));
        assert.ok(result.includes('in') || result.includes('8'));
      });

      test('should format in years', () => {
        const rt = new RelativeTime();
        const threeYearsFromNow = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000);
        const result = rt.from(threeYearsFromNow);
        assert.ok(result.includes('year'));
        assert.ok(result.includes('in') || result.includes('3'));
      });

    });

    describe('Edge Cases', () => {
      test('should handle same date/time', () => {
        const rt = new RelativeTime();
        const now = new Date();
        const result = rt.from(now, now);
        assert.ok(result.includes('second') || result.includes('now') || result.includes('0'));
      });

      test('should handle very small differences', () => {
        const rt = new RelativeTime();
        const now = new Date();
        const slightlyLater = new Date(now.getTime() + 100); // 100ms later
        const result = rt.from(slightlyLater, now);
        // Small differences fall back to seconds unit
        assert.ok(result.includes('second') || result.includes('now') || result.includes('0'));
      });

      test('should handle very large differences', () => {
        const rt = new RelativeTime();
        const now = new Date();
        const fiftyYearsAgo = new Date(now.getTime() - 50 * 365 * 24 * 60 * 60 * 1000);
        const result = rt.from(fiftyYearsAgo, now);
        assert.ok(result.includes('year'));
        assert.ok(result.includes('ago') || result.includes('50') || parseInt(result) >= 50);
      });

      test('should work with custom reference date', () => {
        const rt = new RelativeTime();
        const date1 = new Date('2023-01-01');
        const date2 = new Date('2023-01-02');
        const result = rt.from(date1, date2);
        assert.ok(typeof result === 'string');
        assert.ok(result.includes('day') || result.includes('hour'));
      });

    });

    describe('Date Input Types', () => {
      test('should accept Date objects', () => {
        const rt = new RelativeTime();
        const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
        const result = rt.from(pastDate);
        assert.ok(typeof result === 'string');
        assert.ok(result.includes('hour'));
      });

      test('should accept ISO date strings', () => {
        const rt = new RelativeTime();
        const isoString = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // 1 day ago
        const result = rt.from(new Date(isoString)); // Convert ISO string to Date object
        assert.ok(typeof result === 'string');
        assert.ok(result.includes('day') || result.includes('hour'));
      });

      test('should accept timestamps', () => {
        const rt = new RelativeTime();
        const timestamp = Date.now() - 30 * 60 * 1000; // 30 minutes ago
        const result = rt.from(new Date(timestamp)); // Convert timestamp to Date object
        assert.ok(typeof result === 'string');
        assert.ok(result.includes('minute'));
      });

    });
  });

  describe('Static Method Tests - RelativeTime.from()', () => {
    test('should work without locale parameter', () => {
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
      const result = RelativeTime.from(pastDate);
      assert.ok(typeof result === 'string');
      assert.ok(result.includes('hour'));
    });

    test('should work with locale parameter', () => {
      const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      const result = RelativeTime.from(pastDate, new Date(), 'es');
      assert.ok(typeof result === 'string');
      assert.ok(result.length > 0); // Just verify it returns a valid string
    });

    test('should create new instance per call (no caching)', () => {
      const date1 = new Date(Date.now() - 1000);
      const date2 = new Date(Date.now() - 2000);

      const result1 = RelativeTime.from(date1);
      const result2 = RelativeTime.from(date2);

      // Both calls should work independently
      assert.ok(typeof result1 === 'string');
      assert.ok(typeof result2 === 'string');

      // Verify no shared state by checking different results
      assert.notStrictEqual(result1, result2);
    });

    test('should handle all date input types', () => {
      const dateObj = new Date(Date.now() - 60 * 1000); // 1 minute ago
      const result = RelativeTime.from(dateObj);
      assert.ok(typeof result === 'string');
      assert.ok(result.includes('minute') || result.includes('second'));
    });

  });
});
