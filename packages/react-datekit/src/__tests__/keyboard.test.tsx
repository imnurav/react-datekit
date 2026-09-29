import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../components/DatePicker';

describe('DatePicker Keyboard Navigation', () => {
  it('navigates days with arrow keys and selects with Enter', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 15);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    const root = screen.getByRole('application');

    // Press ArrowRight (move from Sep 15 to Sep 16)
    fireEvent.keyDown(root, { key: 'ArrowRight' });

    // Press Enter to select
    fireEvent.keyDown(root, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selected = handleChange.mock.calls[0][0];
    expect(selected.getDate()).toBe(16);
  });

  it('navigates weeks with ArrowUp and ArrowDown', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 15);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    const root = screen.getByRole('application');

    // Press ArrowDown (move from Sep 15 to Sep 22)
    fireEvent.keyDown(root, { key: 'ArrowDown' });

    // Press Enter to select
    fireEvent.keyDown(root, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selected = handleChange.mock.calls[0][0];
    expect(selected.getDate()).toBe(22);
  });
});
