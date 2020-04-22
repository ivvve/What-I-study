package serialdate;

import java.util.Date;

public abstract class DayDateFactory {
    private static DayDateFactory factory = new SpreadsheetDateFactory();

    public static void setInstance(DayDateFactory factory) {
        DayDateFactory.factory = factory;
    }

    protected abstract DayDate _makeDate(int ordinal);
    protected abstract DayDate _makeDate(int day, Month month, int year);
    protected abstract DayDate _makeDate(int day, int month, int year);
    protected abstract DayDate _makeDate(Date date);
    protected abstract int _getMinimumYear();
    protected abstract int _getMaximumYear();

    public static DayDate makeDate(int ordinal) {
        return factory._makeDate(ordinal);
    }

    public DayDate makeDate(int day, Month month, int year) {
        return factory._makeDate(day, month, year);
    }

    public DayDate makeDate(int day, int month, int year) {
        return factory._makeDate(day, month, year);
    }

    public DayDate makeDate(Date date) {
        return factory._makeDate(date);
    }

    public int getMinimumYear() {
        return factory._getMinimumYear();
    }

    public int getMaximumYear() {
        return factory._getMaximumYear();
    }
}
