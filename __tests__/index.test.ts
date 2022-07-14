import {JSDOM} from 'jsdom';
import {streakCounter} from '../src';
import {formattedDate} from '../src/utils';
import * as url from 'url';
import mock = jest.mock;

describe('streak counter', () => {
    let mockLocalStorage: Storage;

    beforeEach(() => {
        const mockJSDom = new JSDOM('', {url: 'https://localhost'});
        mockLocalStorage = mockJSDom.window.localStorage;
    });

    afterEach(() => {
        mockLocalStorage.clear();
    });

    it('should return a streak object with currentCount, startDate and lastLoginDate', () => {
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        expect(streak.hasOwnProperty('currentCount')).toBe(true);
        expect(streak.hasOwnProperty('startDate')).toBe(true);
        expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
    });

    it('should return a streak starting at 1 and keep track of lastLoginDate', () => {
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        const dateFormatted = formattedDate(date);

        expect(streak.currentCount).toBe(1);
        expect(streak.lastLoginDate).toBe(dateFormatted);
    });

    it('should store the streak in localStorage', function () {
        const date = new Date();
        const key = 'streak';
        streakCounter(mockLocalStorage, date);

        const streakAsString = mockLocalStorage.getItem(key);
        expect(streakAsString).not.toBeNull();
    });
});

describe('with a pre-populated streak', () => {
    let mockLocalStorage: Storage;

    beforeEach(() => {
        const mockJSDom = new JSDOM('', {url: 'https://localhost'});
        mockLocalStorage = mockJSDom.window.localStorage;

        const date = new Date('1/1/2022');

        const streak = {
            currentCount: 1,
            startDate: formattedDate(date),
            lastLoginDate: formattedDate(date)
        };

        mockLocalStorage.setItem('streak', JSON.stringify(streak));
    });

    afterEach(() => {
        mockLocalStorage.clear();
    })

    it('should return the streak from localStorage', function () {
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        expect(streak.startDate).toBe('1/1/2022');
    });
});