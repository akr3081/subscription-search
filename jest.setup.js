process.env.MOCK_API_CALLS = 'true';
globalThis.alert = jest.fn();
Date.now = jest.fn(() => new Date('2024-05-07T15:00:07Z').getTime());
