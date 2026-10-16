import { fireEvent, render, waitFor } from '@testing-library/react-native';
jest.mock('../src/lib/session', () => ({ authenticate: jest.fn(), saveSession: jest.fn() }));
import { authenticate } from '../src/lib/session';
import { AuthScreen } from '../src/components/auth';

describe('authentication screen', () => {
  it('rejects invalid credentials before a network request', () => { const screen = render(<AuthScreen onSession={jest.fn()} />); fireEvent.press(screen.getByText('Entrar')); expect(authenticate).not.toHaveBeenCalled(); });
  it('submits normalized e-mail credentials', async () => { const onSession = jest.fn(); (authenticate as jest.Mock).mockResolvedValue({ accessToken: 'a', refreshToken: 'r', expiresAt: 1, user: { id: 'u', email: 'a@b.com' } }); const screen = render(<AuthScreen onSession={onSession} />); fireEvent.changeText(screen.getByLabelText('E-mail'), ' A@B.COM '); fireEvent.changeText(screen.getByLabelText('Senha'), 'abcdefgh'); fireEvent.press(screen.getByText('Entrar')); await waitFor(() => expect(authenticate).toHaveBeenCalledWith('a@b.com', 'abcdefgh', 'login')); expect(onSession).toHaveBeenCalled(); });
});
