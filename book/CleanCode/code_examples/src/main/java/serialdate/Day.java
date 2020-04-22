package serialdate;

import java.util.Calendar;

public enum Day {
    MONDAY(Calendar.MONDAY),
    TUESDAY(Calendar.TUESDAY),
    WEDNESDAY(Calendar.WEDNESDAY),
    THURSDAY(Calendar.THURSDAY),
    FRIDAY(Calendar.FRIDAY),
    SATURDAY(Calendar.SATURDAY),
    SUNDAY(Calendar.SUNDAY);

    private final int index;

    Day(final int index) {
        this.index = index;
    }

    public int getIndex() {
        return index;
    }

    // TODO 기존 DayDate의 기능을 대체하기 위해 추가함
    public static boolean isValidWeekdayCode(final int code) {
        for (final Day day : Day.values()) {

            if (day.index == code) {
                return true;
            }
        }

        return false;
    }
}
