import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../components/DatePicker';

describe('DatePicker Selection Modes', () => {
  it('selects a single date when clicked in single mode', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    // Click on September 15, 2026
    const dayBtn = screen.getByRole('button', { name: /Tuesday, September 15, 2026/i });
    fireEvent.click(dayBtn);

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selectedDate = handleChange.mock.calls[0][0];
    expect(selectedDate.getFullYear()).toBe(2026);
    expect(selectedDate.getMonth()).toBe(8);
    expect(selectedDate.getDate()).toBe(15);
  });

  it('selects a date range across two clicks', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="range"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    // First click: Sep 10
    const startBtn = screen.getByRole('button', { name: /Thursday, September 10, 2026/i });
    fireEvent.click(startBtn);

    // Second click: Sep 20
    const endBtn = screen.getByRole('button', { name: /Sunday, September 20, 2026/i });
    fireEvent.click(endBtn);

    expect(handleChange).toHaveBeenCalledTimes(1);
    const [start, end] = handleChange.mock.calls[0][0];
    expect(start.getDate()).toBe(10);
    expect(end.getDate()).toBe(20);
  });

  it('handles reverse range selection by automatically swapping start and end', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="range"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    // Click 1: Sep 20
    const btn20 = screen.getByRole('button', { name: /Sunday, September 20, 2026/i });
    fireEvent.click(btn20);

    // Click 2: Sep 10 (earlier than Sep 20)
    const btn10 = screen.getByRole('button', { name: /Thursday, September 10, 2026/i });
    fireEvent.click(btn10);

    expect(handleChange).toHaveBeenCalledTimes(1);
    const [start, end] = handleChange.mock.calls[0][0];
    // Start should be Sep 10, End should be Sep 20
    expect(start.getDate()).toBe(10);
    expect(end.getDate()).toBe(20);
  });

  it('selects and deselects dates in multiple mode', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="multiple"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    const btn1 = screen.getByRole('button', { name: /Tuesday, September 1, 2026/i });
    const btn2 = screen.getByRole('button', { name: /Wednesday, September 2, 2026/i });

    // Click date 1
    fireEvent.click(btn1);
    expect(handleChange).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Date)]));

    // Click date 2
    fireEvent.click(btn2);
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.any(Date), expect.any(Date)])
    );
  });

  it('prevents selection on disabled dates', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);
    const disabledDate = (d: Date) => d.getDate() === 15;

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        disabledDate={disabledDate}
        onChange={handleChange}
      />
    );

    const btn15 = screen.getByRole('button', { name: /September 15, 2026/i });
    expect(btn15).toBeDisabled();

    fireEvent.click(btn15);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('resets selection when allowClear is enabled and clicked', () => {
    const handleChange = vi.fn();
    const selectedDate = new Date(2026, 8, 15);

    render(
      <DatePicker
        mode="single"
        value={selectedDate}
        allowClear
        onChange={handleChange}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /clear selection/i });
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('disables future dates when disableFutureDates is set', () => {
    const handleChange = vi.fn();
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={today}
        disableFutureDates
        onChange={handleChange}
      />
    );

    const monthName = tomorrow.toLocaleDateString('en-US', { month: 'long' });
    const tomorrowBtn = screen.queryByRole('button', {
      name: new RegExp(`${monthName}\\s+${tomorrow.getDate()},?\\s+${tomorrow.getFullYear()}`, 'i'),
    });

    if (tomorrowBtn) {
      expect(tomorrowBtn).toBeDisabled();
      fireEvent.click(tomorrowBtn);
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  it('renders as an input trigger when inline={false} or placeholder is set, and opens popover calendar on click', () => {
    const handleChange = vi.fn();
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        inline={false}
        placeholder="Pick appointment date"
        defaultViewDate={defaultView}
        onChange={handleChange}
      />
    );

    // Initial state: combobox trigger visible
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText('Pick appointment date')).toBeInTheDocument();

    // Calendar grid is not mounted initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click trigger to open popover
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click day 15 inside the popover
    const dayBtn = screen.getByRole('button', { name: /Tuesday, September 15, 2026/i });
    fireEvent.click(dayBtn);

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selectedDate = handleChange.mock.calls[0][0];
    expect(selectedDate.getDate()).toBe(15);
  });
});
