# Keyboard Navigation Test Plan

## Test Cases for Accessibility

### 1. Tab Order Verification
- [ ] Tab through all form elements in logical order
- [ ] Shift+Tab moves backwards through elements
- [ ] Focus visible on all interactive elements

### 2. Form Fields
- [ ] All inputs have proper `id` and `htmlFor` associations
- [ ] Required attribute present on all required fields
- [ ] Error messages have `role="alert"`
- [ ] Password toggle accessible via keyboard (Space/Enter)

### 3. Interactive Elements
- [ ] Checkbox has proper focus ring
- [ ] Button focus styles work correctly
- [ ] Links have focus indicators

### 4. Screen Reader Support
- [ ] Password toggle aria-label changes between "表示" and "非表示"
- [ ] Error messages announced immediately
- [ ] Form labels properly associated

### 5. Visual Focus Indicators
- [ ] All focusable elements have visible focus rings
- [ ] Focus rings don't break layout
- [ ] High contrast focus indicators

## Implementation Status
✅ Label htmlFor ties to input id
✅ aria-live="assertive" via role="alert" on error containers
✅ Password toggle aria-label changes between 表示/非表示
✅ Checkbox focus ring style via CSS
✅ Required attribute on all form fields
✅ Enhanced focus-visible styles for better keyboard navigation

