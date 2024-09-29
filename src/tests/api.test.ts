import axios from 'axios';
import { signIn, signUp, fetchUsers } from "../services/api";

jest.mock('axios');

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signIn should fetch token from the API', async () => {
    const email = 'eve.holt@reqres.in';
    const password = 'password123';
    const mockResponse = { token: 'QpwL5tke4Pnpja7X4' };

    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await signIn(email, password);

    expect(axios.post).toHaveBeenCalledWith('https://reqres.in/api/login', { email, password });
    expect(result).toEqual(mockResponse);
  });

  test('signUp should return data from the API', async () => {
    const email = 'eve.holt@reqres.in';
    const password = 'pistol';
    const mockResponse = { id: 4, token: 'QpwL5tke4Pnpja7X4' };

    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await signUp(email, password);

    expect(axios.post).toHaveBeenCalledWith('https://reqres.in/api/register', { email, password });
    expect(result).toEqual(mockResponse);
  });

  test('fetchUsers should return paginated users', async () => {
    const page = 1;
    const mockResponse = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [{ id: 1, email: 'george.bluth@reqres.in' }],
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await fetchUsers(page);

    expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/users', { params: { page } });
    expect(result).toEqual(mockResponse);
  });

  test('signIn should throw an error on failed request', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';

    (axios.post as jest.Mock).mockRejectedValue({
      response: { status: 400, data: { error: 'Invalid credentials' } },
    });

    await expect(signIn(email, password)).rejects.toThrow('Request failed with status code 400');
  });
});
