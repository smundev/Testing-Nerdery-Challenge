import { bool } from 'joi';
import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';

import users from './utils/users';
import { url } from 'inspector';

describe('isInteger', () => {
  let result = false;

  test('Test with valid parameter', () => {
    result = isInteger(5);
    expect(result).toBeTruthy();
  });

  test('Test with invalid parameter', () => {
    result = isInteger(5.4);
    expect(result).toBeFalsy();
  });

  test('Test with invalid parameter', () => {
    result = isInteger('t');
    expect(result).toBeFalsy();
  });
});

describe('toLowerCase', () => {
  let result;
  let str;
  test('Test with uppercase string', () => {
    str = 'TRAIN';
    result = toLowerCase(str);
    expect(result).toBe('train');
  });

  test('Test with lowercase string', () => {
    str = 'bike';
    result = toLowerCase(str);
    expect(result).toBe('bike');
  });

  test('Test with string number', () => {
    let newStr;
    result = toLowerCase(newStr);
    expect(result).toBe('Please provide a string');
  });
});

describe('removeDuplicatesFromArray', () => {
  test('Single item array', () => {
    const arr = [1];
    const res = removeDuplicatesFromArray(arr);
    expect(res).toEqual(arr);
  });

  test('Numbers array with no duplicated', () => {
    const arr = [1, 4, 7, 60];
    const res = removeDuplicatesFromArray(arr);
    expect(res).toEqual(arr);
  });

  test('Numbers array with duplicated', () => {
    const arr = [1, 4, 7, 60, 60];
    const res = removeDuplicatesFromArray(arr);
    expect(res).toEqual(arr.slice(0, -1));
  });

  test('Strings array with no duplicated', () => {
    const arr = ['first', 'second', 'third'];
    const res = removeDuplicatesFromArray(arr);
    expect(res).toEqual(arr);
  });

  test('Strings array with duplicated', () => {
    const arr = ['first', 'second', 'first'];
    const res = removeDuplicatesFromArray(arr);
    expect(res).toEqual(arr.slice(0, -1));
  });

  test('Invalid array throws an error', () => {
    let arr;
    expect(() => {
      removeDuplicatesFromArray(arr);
    }).toThrow(new Error('please provide an array of numbers or strings'));
  });
});

describe('createRandomProduct', () => {
  let userEmail;

  test('Returns a valid random product object', () => {
    userEmail = users.find((e) => e.role === 'creator');
    const prod = createRandomProduct(userEmail.email);
    expect(prod).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(String),
      tags: expect.arrayContaining([expect.any(String), expect.any(String)]),
    });
  });

  test('Invalid role throws an error', () => {
    userEmail = users.find((e) => e.role !== 'creator');
    expect(() => {
      createRandomProduct(userEmail.email);
    }).toThrow(new Error('You are not allowed to create products'));
  });
});

describe('createProduct', () => {
  test('Create a valid product', () => {
    const validProd = {
      name: 'best5prod',
      description: 'desc',
      price: 14,
      tags: ['test'],
    };
    const prod = createProduct(validProd);
    expect(prod).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      tags: expect.arrayContaining([expect.any(String), expect.any(String)]),
    });
  });

  test('Invalid product parameter', () => {
    let invalidProd = {
      name: 'a',
      description: 'a',
      price: 14,
      tags: [],
    };
    expect(() => {
      createProduct(invalidProd);
    }).toThrow();
  });
});

describe('getStarWarsPlanet', () => {
  it('Endpoint works', async () => {
    const res = await getStarWarsPlanets();
    expect(Array.isArray(res.results)).toBe(true);
  });

  it('Returns correct data structure', async () => {
    const res = await getStarWarsPlanets();
    const responseStructure = {
      climate: expect.any(String),
      created: expect.any(String),
      diameter: expect.any(String),
      edited: expect.any(String),
      films: expect.any(Array),
      gravity: expect.any(String),
      name: expect.any(String),
      orbital_period: expect.any(String),
      population: expect.any(String),
      residents: expect.any(Array),
      rotation_period: expect.any(String),
      surface_water: expect.any(String),
      terrain: expect.any(String),
      url: expect.any(String),
    };

    res.results.forEach((item) => {
      expect(item).toEqual(responseStructure);
    });
  });
});
