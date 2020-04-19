package org.junit;

public class ComparisonCompactor {
    private static final String ELLIPSIS = "...";
    private static final String DELTA_START = "[";
    private static final String DELTA_END = "]";

    private int contextLength;
    private String expected;
    private String actual;
    private int prefixLength;
    private int suffixLength;
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

        this.suffixLength = 0;

        for (; !this.suffixOverlapsPrefix(this.suffixLength); this.suffixLength++) {
            if (this.charFromEnd(this.expected, this.suffixLength) != this.charFromEnd(this.actual, this.suffixLength)) {
                break;
            }
        }
    }

    private boolean suffixOverlapsPrefix(final int suffixLength) {
        return (this.actual.length() - suffixLength <= this.prefixLength) ||
                (this.expected.length() - suffixLength <= this.prefixLength);
    }

    private char charFromEnd(final String s, int i) {
        return s.charAt(s.length() - (i + 1));
    }

    private boolean canBeCompacted() {
        return this.expected != null && this.actual != null && !this.areStringEqual();
    }

    private String compactString(final String source) {
        return this.computeCommonPrefix() +
                DELTA_START +
                source.substring(this.prefixLength, source.length() - this.suffixLength) +
                DELTA_END +
                this.computeCommonSuffix();
    }

    private void findCommonPrefix() {
        this.prefixLength = 0;
        final int end = Math.min(this.expected.length(), this.actual.length());

        for (; this.prefixLength < end; this.prefixLength++) {

            if (this.expected.charAt(this.prefixLength) != this.actual.charAt(this.prefixLength)) {
                break;
            }
        }
    }

    private String computeCommonPrefix() {
        return (this.contextLength < this.prefixLength ? ELLIPSIS : "") +
                this.expected.substring(Math.max(0, this.prefixLength - this.contextLength), this.prefixLength);
    }

    private String computeCommonSuffix() {
        final int end = Math.min(this.expected.length() - this.suffixLength + this.contextLength,
                this.expected.length());
        return this.expected.substring(this.expected.length() - this.suffixLength, end) +
                (this.expected.length() - this.suffixLength < this.expected.length() -
                        this.contextLength ? ELLIPSIS : "");
    }

    private boolean areStringEqual() {
        return this.expected.equals(this.actual);
    }
}
