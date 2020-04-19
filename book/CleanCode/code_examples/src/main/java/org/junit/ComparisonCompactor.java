package org.junit;

public class ComparisonCompactor {
    private static final String ELLIPSIS = "...";
    private static final String DELTA_START = "[";
    private static final String DELTA_END = "]";

    private int contextLength;
    private String expected;
    private String actual;
    private int prefix;
    private int suffix;

    public ComparisonCompactor(final int contextLength, final String expected, final String actual) {
        this.contextLength = contextLength;
        this.expected = expected;
        this.actual = actual;
    }

    public String compact(final String message) {
        if (this.shouldNotCompact()) {
            return Assert.format(message, this.expected, this.actual);
        }

        this.findCommonPrefix();
        this.findCommonSuffix();
        final String compactExpected = this.compactString(this.expected);
        final String compactActual = this.compactString(this.actual);
        return Assert.format(message, compactExpected, compactActual);
    }

    private boolean shouldNotCompact() {
        return this.expected == null || this.actual == null || this.areStringEqual();
    }

    private String compactString(final String source) {
        String result = DELTA_START +
                source.substring(this.prefix, source.length() - this.suffix + 1) +
                DELTA_END;

        if (0 < this.prefix) {
            result = this.computeCommonPrefix() + result;
        }

        if (0 < this.suffix) {
            result = result + this.computeCommonSuffix();
        }

        return result;
    }

    private void findCommonPrefix() {
        this.prefix = 0;
        final int end = Math.min(this.expected.length(), this.actual.length());
        for (; this.prefix < end; this.prefix++) {

            if (this.expected.charAt(this.prefix) != this.actual.charAt(this.prefix)) {
                break;
            }
        }
    }

    private void findCommonSuffix() {
        int expectedSuffix = this.expected.length() - 1;
        int actualSuffix = this.actual.length() - 1;

        for (;
             (this.prefix <= actualSuffix) && (this.prefix <= expectedSuffix);
             actualSuffix--, expectedSuffix--) {

            if (this.expected.charAt(expectedSuffix) != this.actual.charAt(actualSuffix)) {
                break;
            }
        }

        this.suffix = this.expected.length() - expectedSuffix;
    }

    private String computeCommonPrefix() {
        return (this.contextLength < this.prefix ? ELLIPSIS : "") +
                this.expected.substring(Math.max(0, this.prefix - this.contextLength), this.prefix);
    }

    private String computeCommonSuffix() {
        final int end = Math.min(this.expected.length() - this.suffix + 1 + this.contextLength,
                this.expected.length());
        return this.expected.substring(this.expected.length() - this.suffix + 1, end) +
                (this.expected.length() - this.suffix + 1 < this.expected.length() -
                        this.contextLength ? ELLIPSIS : "");
    }

    private boolean areStringEqual() {
        return this.expected.equals(this.actual);
    }
}
