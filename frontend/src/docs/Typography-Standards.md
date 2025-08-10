# Typography Standards Documentation

## Overview
This document outlines the standardized typography system used across the Tokspace website, ensuring consistent visual hierarchy and optimal readability across all devices.

## Heading Styles

### H1 - Main Page Titles
**Usage**: Primary page headings, hero sections
**Classes**: `text-5xl font-bold md:text-6xl lg:text-7xl`****
**Responsive Sizing**:
- Mobile: `text-5xl` (48px)
- Tablet: `md:text-6xl` (60px) 
- Desktop: `lg:text-7xl` (72px)

**Examples**:
- Hero section titles
- Main page headings
- Primary call-to-action titles

### H2 - Section Headings
**Usage**: Major section titles, secondary headings
**Classes**: `text-4xl font-bold md:text-5xl lg:text-6xl`
**Responsive Sizing**:
- Mobile: `text-4xl` (36px)
- Tablet: `md:text-5xl` (48px)
- Desktop: `lg:text-6xl` (60px)

**Examples**:
- Section titles in components
- Feature headings
- Content block titles

### H3 - Subsection Headings
**Usage**: Component titles, card headings, feature titles
**Classes**: `text-2xl font-bold md:text-3xl lg:text-4xl`
**Responsive Sizing**:
- Mobile: `text-2xl` (24px)
- Tablet: `md:text-3xl` (30px)
- Desktop: `lg:text-4xl` (36px)

**Examples**:
- Card titles
- Feature names
- Step titles in processes
- Contact information headings

## Paragraph Styles

### Body Text (Standard)
**Usage**: Main content paragraphs, descriptions, general text
**Classes**: `text-base md:text-lg lg:text-xl`
**Responsive Sizing**:
- Mobile: `text-base` (16px)
- Tablet: `md:text-lg` (18px)
- Desktop: `lg:text-xl` (20px)

**Examples**:
- Component descriptions
- Feature explanations
- General content paragraphs
- Form descriptions

### Subtitle Text (Following H1)
**Usage**: Paragraphs immediately following H1 headings
**Classes**: `text-lg md:text-xl lg:text-2xl`
**Responsive Sizing**:
- Mobile: `text-lg` (18px)
- Tablet: `md:text-xl` (20px)
- Desktop: `lg:text-2xl` (24px)

**Examples**:
- Hero section subtitles
- Main page descriptions
- Primary content introductions

### Small Text
**Usage**: Secondary information, metadata, fine print
**Classes**: `text-sm` or `text-xs`
**Sizing**:
- `text-sm`: 14px
- `text-xs`: 12px

**Examples**:
- Review counts
- Shipping information
- Copyright notices
- Form helper text

### Special Cases

#### Price Display
**Classes**: `text-2xl font-bold md:text-3xl lg:text-4xl`
**Usage**: Product pricing, important numerical values

#### Labels and Tags
**Classes**: `font-semibold` (with appropriate text size)
**Usage**: Form labels, category tags, section identifiers

## Implementation Guidelines

### Consistency Rules
1. **Always use responsive classes**: Include mobile, tablet, and desktop sizing
2. **Follow the hierarchy**: H1 > H2 > H3 > Body > Small
3. **Maintain contrast**: Ensure sufficient contrast ratios for accessibility
4. **Use semantic HTML**: Match visual hierarchy with semantic structure

### Responsive Breakpoints
- **Mobile**: Default (no prefix) - up to 768px
- **Tablet**: `md:` prefix - 768px and up
- **Desktop**: `lg:` prefix - 1024px and up

### Font Weights
- **Headings**: `font-bold` (700)
- **Labels**: `font-semibold` (600)
- **Body text**: Default weight (400)

## Component-Specific Applications

### Header Component
- H1: `text-5xl font-bold md:text-6xl lg:text-7xl`
- Subtitle: `text-base md:text-lg lg:text-xl`

### Contact Us Component
- H2: `text-4xl font-bold md:text-5xl lg:text-6xl`
- H3: `text-2xl font-bold md:text-3xl lg:text-4xl`
- Body: `text-base md:text-lg lg:text-xl`

### Creativity Component
- H1: `text-5xl font-bold md:text-6xl lg:text-7xl`
- H2: `text-4xl font-bold md:text-5xl lg:text-6xl`
- H3: `text-2xl font-bold md:text-3xl lg:text-4xl`
- Subtitle: `text-lg md:text-xl lg:text-2xl`
- Body: `text-base md:text-lg lg:text-xl`

### Our Mission Component
- H1: `text-5xl font-bold md:text-6xl lg:text-7xl`
- H2: `text-2xl font-bold lg:text-2xl lg:font-bold`
- H3: `text-2xl font-bold md:text-3xl lg:text-4xl`
- Subtitle: `text-lg md:text-xl lg:text-2xl`
- Body: `text-base md:text-lg lg:text-xl`
- Numbers: `text-xl font-bold md:text-2xl`

### Steppers Component
- H2: `text-4xl font-bold md:text-5xl lg:text-6xl`
- H3: `text-2xl font-bold md:text-3xl lg:text-4xl`
- Body: `text-base md:text-lg lg:text-xl`

### Product Components
- H2: `text-4xl font-bold md:text-5xl lg:text-6xl`
- Price: `text-2xl font-bold md:text-3xl lg:text-4xl`
- Body: `text-base md:text-lg lg:text-xl`
- Reviews: `text-sm`
- Fine print: `text-xs`

### Footer Component
- H1: `text-5xl font-bold md:text-6xl lg:text-7xl`
- Body: `text-lg md:text-xl lg:text-2xl`
- Copyright: `text-black` (default size)

## Accessibility Considerations

### Color Contrast
- Ensure minimum 4.5:1 contrast ratio for normal text
- Ensure minimum 3:1 contrast ratio for large text (18px+ or 14px+ bold)

### Font Size Minimums
- Never use text smaller than 14px (`text-sm`) for body content
- Reserve `text-xs` (12px) only for fine print and metadata

### Responsive Design
- Always provide appropriate sizing for mobile devices
- Ensure text remains readable at all breakpoints
- Test on various screen sizes and devices

## Maintenance

### When Adding New Components
1. Follow the established hierarchy patterns
2. Use the standardized classes documented above
3. Ensure responsive behavior across all breakpoints
4. Update this documentation if new patterns are introduced

### Code Review Checklist
- [ ] All headings use appropriate semantic HTML (h1, h2, h3)
- [ ] All text includes responsive sizing classes
- [ ] Font weights are consistent with guidelines
- [ ] No custom font sizes outside the established system
- [ ] Accessibility contrast requirements are met

---

*Last updated: December 2024*
*Version: 1.0*