import { fetchUserData } from '../githubService';
import axios from 'axios';

// Mock axios for testing
jest.mock('axios');
const mockedAxios = axios;

describe('GitHub Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchUserData calls correct API endpoint', async () => {
    const mockUserData = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://github.com/avatar.jpg',
      html_url: 'https://github.com/testuser'
    };

    mockedAxios.get.mockResolvedValue({ data: mockUserData });

    const result = await fetchUserData('testuser');

    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/users/testuser');
    expect(result).toEqual(mockUserData);
  });

  test('fetchUserData handles API errors correctly', async () => {
    mockedAxios.get.mockRejectedValue(new Error('User not found'));

    await expect(fetchUserData('nonexistentuser')).rejects.toThrow('User not found');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/users/nonexistentuser');
  });
});