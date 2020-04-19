package org.junit;

public class ComparisonCompactor {
    private static final String ELLIPSIS = "...";
    private static final String DELTA_START = "[";
    private static final String DELTA_END = "]";

    private int fContextLength;
    private String fExpected;
    private String fActual;
    private int fPrefix;
    private int fSuffix;

    public ComparisonCompactor(final int fContextLength, final String fExpected, final String fActual) {
        this.fContextLength = fContextLength;
        this.fExpected = fExpected;
        this.fActual = fActual;
    }

    public String compact(final String message) {
        if (this.fExpected == null || this.fActual == null || areStringEqual()) {
            return Assert.format(message, this.fExpected, this.fActual);
        }

        this.findCommonPrefix();
        this.findCommonSuffix();
        final String expected = this.compactString(this.fExpected);
        final String actual = this.compactString(this.fActual);
        return Assert.format(message, expected, actual);
    }

    private String compactString(final String source) {
        String result = DELTA_START +
                source.substring(this.fPrefix, source.length() - this.fSuffix + 1) +
                DELTA_END;

        if (0 < this.fPrefix) {
            result = this.computeCommonPrefix() + result;
        }

        if (0 < this.fSuffix) {
            result = result + this.computeCommonSuffix();
        }

        return result;
    }

    private void findCommonPrefix() {
        this.fPrefix = 0;
        final int end = Math.min(this.fExpected.length(), this.fActual.length());
        for (; this.fPrefix < end; this.fPrefix++) {

            if (this.fExpected.charAt(this.fPrefix) != this.fActual.charAt(this.fPrefix)) {
                break;
            }
        }
    }

    private void findCommonSuffix() {
        int expectedSuffix = this.fExpected.length() - 1;
        int actualSuffix = this.fActual.length() - 1;

        for (;
             (this.fPrefix <= actualSuffix) && (this.fPrefix <= expectedSuffix);
             actualSuffix--, expectedSuffix--) {

            if (this.fExpected.charAt(expectedSuffix) != this.fActual.charAt(actualSuffix)) {
                break;
            }
        }

        this.fSuffix = this.fExpected.length() - expectedSuffix;
    }

    private String computeCommonPrefix() {
        return (this.fContextLength < this.fPrefix ? ELLIPSIS : "") +
                this.fExpected.substring(Math.max(0, this.fPrefix - this.fContextLength), this.fPrefix);
    }

    private String computeCommonSuffix() {
        final int end = Math.min(this.fExpected.length() - this.fSuffix + 1 + this.fContextLength,
                this.fExpected.length());
        return this.fExpected.substring(this.fExpected.length() - this.fSuffix + 1, end) +
                (this.fExpected.length() - this.fSuffix + 1 < this.fExpected.length() -
                        this.fContextLength ? ELLIPSIS : "");
    }

    private boolean areStringEqual() {
        return this.fExpected.equals(this.fActual);
    }
}
