'use strict';

jest.dontMock('../url.js');

describe('URL Util', function(){

	var Url;

	beforeEach(function(){
		Url = require('../url.js');
	});

	it('should give parameters from an url - getParametersFromUrl', function(){
    var fn = Url.getParametersFromUrl;
		expect(fn()).toEqual({});
		expect(fn('protocol://domain.com/some/path?referrer=%2F')).toEqual({referrer: '%2F'});
		expect(fn('foo=bar&bar=car&car=foo')).toEqual({foo: 'bar', bar: 'car', car: 'foo'});
		expect(fn('foo=bar&foo=car&foo=far&car=foo')).toEqual({foo: ['bar', 'car', 'far'], car: 'foo'});
		expect(fn('foo=bar&foo=car&far=bar', oldVal => oldVal)).toEqual({foo: 'bar', far: 'bar'});
		expect(fn('foo={"bar": "car", "far": "car"}')).toEqual({foo: {bar: 'car', far: 'car'}});
		expect(fn('foo=bar&caz=&=bad')).toEqual({foo: 'bar', caz: ''});
	});

	it('should get root from url - getRootFromUrl', function(){
		var fn = Url.getRootFromUrl;
		expect(fn('protocol://domain.com/some/path?referrer=%2F')).toBe('protocol://domain.com/some/path');
		expect(fn('protocol://domain.com/some/path')).toBe('protocol://domain.com/some/path');
	});

	it('should get parameters by name - getParameterByName', function(){
		var fn = Url.getParameterByName;
		expect(fn('foo=bar', 'foo')).toBe('bar');
		expect(fn('foo=b+a+r', 'foo')).toBe('b a r');
		expect(fn('foo=bar', 'bar')).toBe(null);
		expect(fn('foo=bar')).toBe('');
	});

	it('should get context as url parameters - getContextAsUrlParams', function(){
		var fn = Url.getContextAsUrlParams;
		expect(fn({})).toBe('');
		expect(fn({foo: 'bar'})).toBe('foo=bar');
		expect(fn({foo: undefined})).toBe('');
		expect(fn({foo: 'bar', bar: 'car', car: 21.45})).toBe('foo=bar&bar=car&car=21.45');
		expect(fn({foo: ['bar', 'car'], car: 50})).toBe('foo%5B%5D=bar&foo%5B%5D=car&car=50');
		expect(fn({foo: {bar: 'car', far: [23, '45']}, car: true})).toBe('foo={"bar":"car","far":[23,"45"]}&car=true');
	});
});
