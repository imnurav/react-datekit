import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../components/DatePicker';

describe('DatePicker Presets', () => {
  it('renders configured built-in presets and triggers range selection', () => {
    const handleChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        presets={['today', 'last7Days', 'thisMonth']}
        onChange={handleChange}
      />
    );

    expect(screen.getByRole('button', { name: /^Today$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Last 7 Days$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^This Month$/i })).toBeInTheDocument();

    // Click 'Today' preset
    fireEvent.click(screen.getByRole('button', { name: /^Today$/i }));
    expect(handleChange).toHaveBeenCalledTimes(1);

    const [start, end] = handleChange.mock.calls[0][0];
    const now = new Date();
    expect(start.getDate()).toBe(now.getDate());
    expect(end.getDate()).toBe(now.getDate());
  });

  it('supports custom presets with dynamically computed values', () => {
    const handleChange = vi.fn();
    const customStart = new Date(2026, 3, 1);
    const customEnd = new Date(2027, 2, 31);

    const customPreset = {
      label: 'Financial Year',
      value: () => [customStart, customEnd] as [Date, Date],
    };

    render(
      <DatePicker
        mode="range"
        presets={['today', customPreset]}
        onChange={handleChange}
      />
    );

    const fyBtn = screen.getByRole('button', { name: /^Financial Year$/i });
    expect(fyBtn).toBeInTheDocument();

    fireEvent.click(fyBtn);
    expect(handleChange).toHaveBeenCalledWith([customStart, customEnd]);
  });
});
