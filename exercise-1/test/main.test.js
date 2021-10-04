const userData = require('../public/main');
const unmockedFetch = global.fetch

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
})

afterAll(() => {
    global.fetch = unmockedFetch
})


describe('user data fetch api ', () => {
    test('works', async () => {
        const json = await userData()
        expect(Array.isArray(json)).toEqual(true)
        expect(json.length).toEqual(0)
    })
})





