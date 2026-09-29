import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DatePicker } from '../components/DatePicker';

describe('DatePicker Accessibility', () => {
  it('renders correct ARIA roles for grid, rows, and cells', () => {
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
      />
    );

    // Grid container exists
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();

    // Column headers for weekdays
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders.length).toBe(7);

    // Date cells have gridcell role
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBe(42);
  });

  it('provides descriptive aria-label and aria-selected states', () => {
    const selectedDate = new Date(2026, 8, 15);

    render(
      <DatePicker
        mode="single"
        value={selectedDate}
        defaultViewDate={selectedDate}
      />
    );

    const selectedBtn = screen.getByRole('button', {
      name: /Tuesday, September 15, 2026, Selected/i,
    });
    expect(selectedBtn).toBeInTheDocument();
    expect(selectedBtn).toHaveAttribute('aria-selected', 'true');
  });

  it('marks disabled dates with aria-disabled="true"', () => {
    const defaultView = new Date(2026, 8, 1);
    const disabledDate = (d: Date) => d.getDate() === 20;

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        disabledDate={disabledDate}
      />
    );

    const disabledBtn = screen.getByRole('button', {
      name: /Sunday, September 20, 2026, Disabled/i,
    });
    expect(disabledBtn).toHaveAttribute('aria-disabled', 'true');
    expect(disabledBtn).toBeDisabled();
  });
});
