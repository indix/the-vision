'use strict';

jest.dontMock('../string.js');

describe('String Util', function(){
	beforeEach(function(){
    require('../string.js');
	});

	it('should convert to proper case - toProperCase', function(){
		expect('Hello'.toProperCase()).toBe('Hello');
		expect('hElLo'.toProperCase()).toBe('Hello');
		expect('hElLo world'.toProperCase()).toBe('Hello World');
	});

	it('should truncate a word and add ellipses - trunc', function(){
		expect('Hello'.trunc(3)).toBe('He&hellip;');
		expect('Hello'.trunc(7)).toBe('Hello');
		expect('Hello World'.trunc(8,true)).toBe('Hello&hellip;');
	});

	it('should capitalize first letter - capitalize', function(){
		expect('hEllo'.capitalize()).toBe('HEllo');
		expect('hello world'.capitalize()).toBe('Hello world');
	});

	it('should capitalize the entire line - capitalizeLine', function(){
		expect('hello world'.capitalizeLine()).toBe('Hello World');
		expect('HElLo wOrld, and something'.capitalizeLine()).toBe('HElLo WOrld, And Something');
	});

	it('should have array splice - splice', function(){
		expect('helloworld'.splice(5, 0, ' ')).toBe('hello world');
		expect('madam'.splice(3, 2, ' man')).toBe('mad man');
	});
});
