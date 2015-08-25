'use strict';

jest.dontMock('../format.js');
jest.dontMock('../string.js');
jest.dontMock('numeral');

describe('Format Util', function(){

	var Format;

	beforeEach(function(){
		Format = require('../format.js');
		require('../string.js');
	});

	it('should format with or w/o a format string - format', function(){
		var fn = Format.format;
		expect(fn(12345.3, '0.0')).toBe('12345.3');
		expect(fn(12345.3345, '0.00')).toBe('12345.33');
		expect(fn(1234567.8)).toBe('1.2m');
		expect(fn(123456.7)).toBe('123.5k');
		expect(fn(12345.67)).toBe('12.3k');
		expect(fn(1234.567)).toBe('1,234.57');
		expect(fn(123.4567)).toBe('123.46');
	});

	it('should unformat - unformat', function(){
		var fn = Format.unformat;
		expect(fn('HELLO')).toBe(0);
		expect(fn('2D array')).toBe(2);
		expect(fn('2M')).toBe(2000000);
		expect(fn('2.45k')).toBe(2450);
		expect(fn('12,534')).toBe(12534);
		expect(fn(12534)).toBe(12534);
	});

	it('should format percentage - formatPercentage', function(){
		var fn = Format.formatPercentage;
		expect(fn()).toBe('0%');
		expect(fn(123)).toBe('123%');
		expect(fn(123.45)).toBe('123.45%');
		expect(fn(123.4567)).toBe('123.46%');
		expect(fn('123.4567')).toBe('123.46%');
	});

	it('should format count - formatCount', function(){
		var fn = Format.formatCount;
		expect(fn()).toBe('0');
		expect(fn(123)).toBe('123');
		expect(fn(123.45)).toBe('123');
		expect(fn('12345.67')).toBe('12.3K');
		expect(fn(12000.67)).toBe('12.0K');
		expect(fn(123456789)).toBe('123.5M');
	});

	it('should format currency - formatCurrency', function(){
		var fn = Format.formatCurrency;
		expect(fn()).toBe('$0.00');
		expect(fn('1')).toBe('$1.00');
		expect(fn('£12')).toBe('£12.00');
		expect(fn('£&12')).toBe('£0.00');
		expect(fn(123)).toBe('$123.00');
		expect(fn(123.4)).toBe('$123.40');
		expect(fn(123.45)).toBe('$123.45');
		expect(fn(1234567)).toBe('$1.23M');
	});

	it('should format min max price - formatPrice', function(){
		var fn = Format.formatPrice;
		expect(fn()).toBe('-');
		expect(fn(123)).toBe('$123.00');
		expect(fn('', 456)).toBe('$456.00');
		expect(fn(123, 456)).toBe('$123.00 - $456.00');
	});
});
