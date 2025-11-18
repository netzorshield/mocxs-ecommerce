# Hero Slider Guide

## 🎨 Premium Full-Width Hero Slider

A modern, automatic hero slider similar to Jockey India's homepage banners.

## ✨ Features

- ✅ **Full-width** - Spans entire viewport width
- ✅ **Automatic sliding** - Changes every 6 seconds
- ✅ **Pause on hover** - Stops when you hover over it
- ✅ **Smooth animations** - Fade and scale transitions
- ✅ **Navigation arrows** - Appear on hover
- ✅ **Dot indicators** - Show current slide
- ✅ **Progress bar** - Visual indicator at bottom
- ✅ **Slide counter** - Shows current slide number
- ✅ **Responsive** - Adapts to all screen sizes
- ✅ **Premium design** - Modern, elegant styling

## 📐 Responsive Heights

- Mobile: 600px
- Tablet: 700px
- Desktop: 800px

## 🎯 Customization

### Change Slide Speed

In `page.tsx`:
```tsx
<HeroSlider 
  slides={heroSlides} 
  autoSlideInterval={6000}  // Change this (milliseconds)
/>
```

### Add More Slides

Edit `heroSlides` array in `page.tsx`:
```tsx
const heroSlides = [
  {
    id: '1',
    image: 'your-image-url.jpg',
    subtitle: 'Optional Subtitle',
    title: 'Main Title',
    description: 'Description text',
    buttonText: 'Button Text',
    buttonLink: '/shop',
    overlay: 'gradient', // 'dark', 'light', or 'gradient'
  },
  // Add more slides...
];
```

### Hide Navigation/Dots

```tsx
<HeroSlider 
  slides={heroSlides} 
  showNavigation={false}  // Hide arrows
  showDots={false}        // Hide dots
/>
```

## 🖼️ Image Requirements

- **Recommended size:** 1920x1080px (Full HD)
- **Format:** JPG or PNG
- **Quality:** High resolution for best results
- **Aspect ratio:** 16:9 works best

## 🎨 Overlay Options

- **gradient** - Dark gradient overlay (default)
- **dark** - Solid dark overlay
- **light** - Light overlay

## 📱 Mobile Optimization

- Text sizes adjust automatically
- Buttons remain accessible
- Touch-friendly navigation
- Optimized image loading

---

**The hero slider is now live on your homepage!** 🎉












