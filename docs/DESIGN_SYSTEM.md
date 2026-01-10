# DND MNL — Design System & Brand Mechanism

## 1. Core Philosophy: "The Vault"

**"Secure Your Step."**
The DND MNL aesthetic is built around the concept of a high-security vault. It is industrial, heavy, and exclusive. The design is not soft or welcoming in a traditional sense; it is imposing, confident, and premium.

### The "Block & Bolt" Mechanism
Inspired by the bold, bulky nature of the DND MNL logo, the interface rejects rounded softness in favor of structural integrity.
*   **Structure**: Elements are treated as physical blocks. Corners are tight (slightly rounded `rounded-sm` or sharp `rounded-none`) to convey solidity.
*   **Containment**: Information is often compartmentalized in bordered boxes, reminiscent of safety deposit boxes or shipping containers.
*   **Weight**: We use heavy font weights and high-contrast borders to give UI elements "physicality."

---

## 2. Visual Language

### A. Typography
The typography contrasts massive, industrial headlines with clean, utilitarian data points.

*   **Primary Display (`Fjalla One`)**: Used for all major headings, prices, and impactful statements. 
    *   *Mechanism*: It is tall, condensed, and bold—mimicking the verticality of barcode bars or shipping crate stencils.
    *   *Usage*: Uppercase, `tracking-wide` or `tracking-widest`.
*   **Secondary Body (`Nunito Sans`)**: Used for descriptions, inputs, and UI text.
    *   *Mechanism*: Highly legible but geometric. It balances the aggression of the display font.
    *   *Usage*: Often small (`text-xs` or `text-sm`), `uppercase`, `tracking-widest` for "technical spec" labels.

### B. Color Palette: "Midnight Gold"
A dark, monochromatic base punctuated by a single, sharp accent color.

*   **Void Black (`bg-black` / `#000000`)**: The canvas. Infinite depth.
*   **Vault Steel (`border-white/10`)**: The framework. Subtle, semi-transparent white borders used to define structure without overwhelming the content.
*   **Molten Gold (`text-primary` / `#EAA300`)**: The prize. Used sparingly for calls-to-action (CTAs), prices, and active states. It represents the "value" inside the vault.

### C. Shapes & Geometry
*   **The "Block" Theme**: As requested, UI components mirror the blocky nature of the logo.
    *   **Buttons**: Rectangular, defined borders, often full-width or substantial height (`h-12`, `h-14`).
    *   **Cards**: Enclosed in borders (`border border-white/10`). No floating shadows; structure is defined by lines.
    *   **Images**: Hard edges or minimal rounding. Often treated with a "glitch" or "hover" transform rather than a soft fade.

---

## 3. UI Component Mechanism

### The "Secure" Button
Buttons should feel like distinct mechanical triggers.
*   **Style**: Solid fill (`bg-primary`) with sharp contrast text (`text-black`), or outlined (`border-white`) with uppercase text.
*   **Interaction**: Hover effects shouldn't just change color; they should feel "active" (invert colors, slight scale).

### Product Cards (The "Crate")
Each product is presented as a contained asset.
*   **Layout**: Image on top (preview), details below (manifest).
*   **Typography**: Brand names are small and technical (`text-xs uppercase`), product names are bold (`font-display`).
*   **Action**: "View" or "Secure" buttons are prominent.

### Navigation (The "Control Panel")
*   **Desktop**: A floating or transparent command bar. Links have active state indicators (underlines or glow).
*   **Mobile**: A full-screen overlay (The "Shutter"). When opened, it takes over the screen completely, like a blast door closing. 

---

## 4. Interaction Design (UX)
*   **Direct Access**: The user flow is minimized. "Buy Now" bypasses the cart to lock in the purchase immediately (Pre-order logic).
*   **Visual Feedback**:
    *   *Hover*: Elements glow or borders light up (`hover:border-primary`).
    *   *Scroll*: The header solidifies like a shield locking into place.
*   **Animation**: Transitions are "snappy" (`duration-300`, `ease-out`). Elements slide or fade in with purpose, not just drift.

---

## 5. Mobile Considerations
*   **Verticality**: Content is stacked in clear, distinct blocks to prevent clutter.
*   **Thumb Zone**: Key actions (Add to Cart, Search) are placed in easy-to-reach zones. The mobile menu places actions at the bottom.
*   **Scale**: Typography remains massive (`text-5xl+`) even on mobile to retain the brand's loudness.

---

**Summary for Developers/Designers:**
> "Build it like you are building a safe, not a pillow. Use lines, grids, and bold type. If it feels soft, it's wrong. If it feels like a control panel for a vault, it's right."
