package serialdate;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class SpreadsheetDateFactory extends DayDateFactory {
    @Override
    public DayDate _makeDate(final int ordinal) {
        return new SpreadsheetDate(ordinal);
    }

    @Override
    public DayDate _makeDate(final int day, final Month month, final int year) {
        return new SpreadsheetDate(day, month, year);
    }

    @Override
    public DayDate _makeDate(final int day, final int month, final int year) {
        return new SpreadsheetDate(day, month, year);
    }

    @Override
    public DayDate _makeDate(final Date date) {
        final GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);

        return new SpreadsheetDate(
                calendar.get(Calendar.DATE),
                Month.make(calendar.get(Calendar.MONDAY) + 1),
                calendar.get(Calendar.YEAR)
        );
    }

    @Override
    public int _getMinimumYear() {
        return SpreadsheetDate.MINIMUM_YEAR_SUPPORTED;
    }

    @Override
    public int _getMaximumYear() {
        return SpreadsheetDate.MAXIMUM_YEAR_SUPPORTED;
    }
}
