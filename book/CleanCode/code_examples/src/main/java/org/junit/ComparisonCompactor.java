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

    public ComparisonCompactor(final int contextLength, final String expected, final String actual) {
        this.contextLength = contextLength;
        this.expected = expected;
        this.actual = actual;
    }

    public String formatCompactedComparison(final String message) {
        String compactExpected = this.expected;
        String compactActual = this.actual;

        if (this.shouldBeCompacted()) {
            this.findCommonPrefixAndSuffix();
            compactExpected = this.compact(this.expected);
            compactActual = this.compact(this.actual);
        }

        return Assert.format(message, compactExpected, compactActual);
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

    private boolean shouldBeCompacted() {
        return this.expected != null &&
                this.actual != null &&
                !this.expected.equals(this.actual);
    }

    private String compact(final String source) {
        return new StringBuilder()
                .append(this.startingEllipsis())
                .append(this.startingContext())
                .append(DELTA_START)
                .append(this.delta(source))
                .append(DELTA_END)
                .append(this.endingContext())
                .append(this.endingEllipsis())
                .toString();
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

    private String startingEllipsis() {
        return (this.contextLength < this.prefixLength) ? ELLIPSIS : "";
    }

    private String startingContext() {
        final int contextStart = Math.max(0, this.prefixLength - this.contextLength);
        final int contextEnd = this.prefixLength;
        return this.expected.substring(contextStart, contextEnd);
    }

    private String delta(final String source) {
        final int deltaStart = this.prefixLength;
        final int deltaEnd = source.length() - this.suffixLength;
        return source.substring(deltaStart, deltaEnd);
    }

    private String endingContext() {
        final int contextStart = this.expected.length() - this.suffixLength;
        final int contextEnd = Math.min(contextStart + this.contextLength, this.expected.length());
        return this.expected.substring(contextStart, contextEnd);
    }

    private String endingEllipsis() {
        return (this.contextLength < this.suffixLength) ? ELLIPSIS : "";
    }
}
