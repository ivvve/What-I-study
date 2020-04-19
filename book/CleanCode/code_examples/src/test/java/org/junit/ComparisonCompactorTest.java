package org.junit;

import static org.assertj.core.api.Assertions.assertThat;

public class ComparisonCompactorTest {
    @Test
    public void testMessage() {
        final String failureMessage = new ComparisonCompactor(0, "b", "c").compact("a");
        assertThat(failureMessage).isEqualTo("a expected:<[b]> but was:<[c]>");
    }

    @Test
    public void testStartSame() {
        final String failureMessage = new ComparisonCompactor(1, "ba", "bc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<b[a]> but was:<b[c]>");
    }

    @Test
    public void testEndSame() {
        final String failureMessage = new ComparisonCompactor(1, "ab", "cb").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<[a]b> but was:<[c]b>");
    }

    @Test
    @Ignore("If String values are equal, failure message shows class info too in Junit 4")
    public void testSame() {
        final String failureMessage = new ComparisonCompactor(1, "ab", "ab").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<ab> but was:<ab>");
    }

    @Test
    public void testNoContextStartAndEndSame() {
        final String failureMessage = new ComparisonCompactor(0, "abc", "adc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<...[b]...> but was:<...[d]...>");
    }

    @Test
    public void testStartAndEndContext() {
        final String failureMessage = new ComparisonCompactor(1, "abc", "adc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<a[b]c> but was:<a[d]c>");
    }

    @Test
    public void testStartAndEndContextWithEllipses() {
        final String failureMessage = new ComparisonCompactor(1, "abcde", "abfde").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<...b[c]d...> but was:<...b[f]d...>");
    }

    @Test
    public void testComparisonErrorStartSameComplete() {
        final String failureMessage = new ComparisonCompactor(2, "ab", "abc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<ab[]> but was:<ab[c]>");
    }

    @Test
    public void testComparisonErrorEndSameComplete() {
        final String failureMessage = new ComparisonCompactor(0, "bc", "abc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<[]...> but was:<[a]...>");
    }

    @Test
    public void testComparisonErrorEndSameCompleteContext() {
        final String failureMessage = new ComparisonCompactor(2, "bc", "abc").compact(null);
        assertThat(failureMessage).isEqualTo("expected:<[]bc> but was:<[a]bc>");
    }
}
