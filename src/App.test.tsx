import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

test('My app works as expected', async () => {
  const user = userEvent.setup();
  const app = render(<App />);

  const testareaFrom = app.getByPlaceholderText('Introducir texto');

  await user.type(testareaFrom, 'Hola mundo');
  const result = app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 });

  expect(result).toBeTruthy();
});
