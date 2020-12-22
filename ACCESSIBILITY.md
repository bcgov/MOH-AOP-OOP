# Accessibility

This applications aims to meet or exceed the [World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20/).

## Tested Assistive Technologies

The following technologies have been test with this application, chosen because of their popularity and coverage using data from http://webaim.org/projects/screenreadersurvey6/:

1. NVDA Firefox (evergreen) on Windows 10 
2. VoiceOver on Mac OS (should get iOS coverage)

## General Advice

1. Use native HTML5 elements/attributes where possible, e.g., `<header><nav><label><input required>`
2. Do not just code it, test it yourself with a screen reader!
3. Establish your patterns early during development, less effort up-front than retro fitting later.

## Implementation Patterns

### Tab Indexing

1. Assign tabindex to "0" for controls that needs to be included in tab index.
2. Assign tabindex to "-1" for controls that needs to be excluded from tab index.

### Dynamically Displayed Content

Screen readers need to be notified when new content/forms are dynamically displayed:

1. For errors, announce revealed content with `role="alert" aria-live="assertive"`
2. If revealing new for element use  `role="dialogue"`
3. If you have multiple errors, wrap a `<div role="alert" aria-live="assertive">` around all the messages
