import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../components/DatePicker';

describe('DatePicker Full Integration Flows', () => {
  it('switches between days, months, and years views smoothly', () => {
    const handleMonthChange = vi.fn();
    const defaultView = new Date(2026, 8, 15);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        onMonthChange={handleMonthChange}
      />
    );

    // Initial view shows September in header
    const monthHeaderBtn = screen.getByRole('button', { name: /select month, current is september/i });
    expect(monthHeaderBtn).toBeInTheDocument();

    // Click Month button in header to open MonthPicker grid
    fireEvent.click(monthHeaderBtn);

    // Verify MonthPicker grid is displayed (12 months)
    const monthGrid = screen.getByRole('grid', { name: /choose month/i });
    expect(monthGrid).toBeInTheDocument();

    // Click 'Dec'
    const decBtn = screen.getByRole('button', { name: /December/i });
    fireEvent.click(decBtn);

    // Month picker closes and calendar returns to days view displaying December
    expect(
      screen.getByRole('button', { name: /select month, current is december/i })
    ).toBeInTheDocument();
    expect(handleMonthChange).toHaveBeenCalled();
  });

  it('interacts with TimePicker in datetime mode', () => {
    const handleChange = vi.fn();
    const defaultDate = new Date(2026, 8, 15, 10, 30, 0);

    render(
      <DatePicker
        mode="datetime"
        value={defaultDate}
        timeFormat="24"
        minuteStep={15}
        onChange={handleChange}
      />
    );

    // Verify time picker header displays initial time
    const timeRegion = screen.getByRole('region', { name: /time selection/i });
    expect(timeRegion).toBeInTheDocument();
    expect(screen.getByText(/10:30/i)).toBeInTheDocument();

    // Select hour 14 (2 PM)
    const hour14Btn = screen.getByRole('button', { name: /Hour: 14/i });
    fireEvent.click(hour14Btn);

    expect(handleChange).toHaveBeenCalled();
    const updatedDate = handleChange.mock.calls[0][0];
    expect(updatedDate.getHours()).toBe(14);
  });

  it('renders dual months in multi-month range mode', () => {
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="range"
        numberOfMonths={2}
        defaultViewDate={defaultView}
      />
    );

    // Should render September and October side-by-side
    expect(screen.getByRole('button', { name: /select month, current is september/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /select month, current is october/i })).toBeInTheDocument();

    // 2 grid tables
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBe(2);
  });

  it('supports custom date cell badges and renderDate', () => {
    const defaultView = new Date(2026, 8, 1);

    render(
      <DatePicker
        mode="single"
        defaultViewDate={defaultView}
        renderDate={(date) => (
          <span data-testid={`custom-${date.getDate()}`}>
            {date.getDate()}★
          </span>
        )}
      />
    );

    expect(screen.getByTestId('custom-15')).toHaveTextContent('15★');
  });
});
