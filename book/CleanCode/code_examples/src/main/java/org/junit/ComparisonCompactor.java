package org.junit;

public class ComparisonCompactor {
    private static final String ELLIPSIS = "...";
    private static final String DELTA_START = "[";
    private static final String DELTA_END = "]";

    private int contextLength;
    private String expected;
    private String actual;
    private int prefixIndex;
    private int suffixIndex;
    private String compactExpected;
    private String compactActual;

    public ComparisonCompactor(final int contextLength, final String expected, final String actual) {
        this.contextLength = contextLength;
        this.expected = expected;
        this.actual = actual;
    }

    public String formatCompactedComparison(final String message) {
        if (this.canBeCompacted()) {
            compactExpectedAndActual();
            return Assert.format(message, this.compactExpected, this.compactActual);
        } else {
            return Assert.format(message, this.expected, this.actual);
        }
    }

    private void compactExpectedAndActual() {
        findCommonPrefixAndSuffix();
        this.compactExpected = this.compactString(this.expected);
        this.compactActual = this.compactString(this.actual);
    }

    private void findCommonPrefixAndSuffix() {
        this.findCommonPrefix();

        int expectedSuffix = this.expected.length() - 1;
        int actualSuffix = this.actual.length() - 1;

        for (;
             (this.prefixIndex <= actualSuffix) && (this.prefixIndex <= expectedSuffix);
             actualSuffix--, expectedSuffix--) {

            if (this.expected.charAt(expectedSuffix) != this.actual.charAt(actualSuffix)) {
                break;
            }
        }

        this.suffixIndex = this.expected.length() - expectedSuffix;
    }

    private boolean canBeCompacted() {
        return this.expected != null && this.actual != null && !this.areStringEqual();
    }

    private String compactString(final String source) {
        String result = DELTA_START +
                source.substring(this.prefixIndex, source.length() - this.suffixIndex + 1) +
                DELTA_END;

        if (0 < this.prefixIndex) {
            result = this.computeCommonPrefix() + result;
        }

        if (0 < this.suffixIndex) {
            result = result + this.computeCommonSuffix();
        }

        return result;
    }

    private void findCommonPrefix() {
        this.prefixIndex = 0;
        final int end = Math.min(this.expected.length(), this.actual.length());

        for (; this.prefixIndex < end; this.prefixIndex++) {

            if (this.expected.charAt(this.prefixIndex) != this.actual.charAt(this.prefixIndex)) {
                break;
            }
        }
    }

    private String computeCommonPrefix() {
        return (this.contextLength < this.prefixIndex ? ELLIPSIS : "") +
                this.expected.substring(Math.max(0, this.prefixIndex - this.contextLength), this.prefixIndex);
    }

    private String computeCommonSuffix() {
        final int end = Math.min(this.expected.length() - this.suffixIndex + 1 + this.contextLength,
                this.expected.length());
        return this.expected.substring(this.expected.length() - this.suffixIndex + 1, end) +
                (this.expected.length() - this.suffixIndex + 1 < this.expected.length() -
                        this.contextLength ? ELLIPSIS : "");
    }

    private boolean areStringEqual() {
        return this.expected.equals(this.actual);
    }
}
