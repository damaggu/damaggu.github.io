module.exports = {
    content: [
        "_site/**/*.html",
        "_site/**/*.js"
    ],
    css: [
        "_site/assets/css/*.css"
    ],
    output: "_site/assets/css/",
    skippedContentGlobs: [
        "_site/assets/**/*.html"
    ],
    safelist: {
        standard: [
            // Scroll-reveal animations (added by JS)
            "revealed",
            "stagger-visible",
            // Publication abstract/bibtex toggles (added by JS)
            "open",
        ],
        deep: [
            // Preserve all reveal-related selectors
            /reveal/,
            // Preserve all particle canvas styles
            /particle/,
            /hero-particle/,
            // Preserve publication hidden/open toggles
            /hidden/,
            // Preserve MDB ripple overrides
            /ripple/,
            /waves/,
            // Preserve stagger animation classes
            /stagger/,
            // Custom layout classes
            /about-bio/,
            /venue-abbr/,
            // Dark mode attribute selectors
            /data-theme/,
            // Footer styles
            /footer/,
            // Post/hero styles
            /post-title/,
            /post-header/,
            /font-weight-bold/,
        ],
        greedy: [
            // Catch any combined selectors with these classes
            /\.reveal/,
            /\.hidden/,
            /\.open/,
            /particle-canvas/,
            /about-bio/,
            /venue-abbr/,
        ]
    }
};
